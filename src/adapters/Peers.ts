import SimplePeer from "simple-peer";

import {
  ShrughouseData,
  ShrughouseAdapterPeersData,
  ShrughouseMediaStream,
  ShrughouseWebSocket,
  ShrughouseWebSocketEvent,
  ShrughouseWebSocketId,
  ShrughouseWebSocketMessage,
  ShrughouseAdapterProps,
  ShrughouseRoomMember,
} from "../types";

import Utils from "../lib/Utils";

export default function AdapterPeers({
  options,
  data,
  events,
  room,
}: ShrughouseAdapterProps): {
  init: () => void;
} {
  const utils = Utils({ options, data, events });

  const p2pData: ShrughouseAdapterPeersData = {
    peers: {},
    localStream: undefined,
    constraints: {
      audio: true,
      video: {
        width: {
          max: 300,
        },
        height: {
          max: 300,
        },
        facingMode: {
          ideal: "user",
        },
      },
    },
  };

  const p2p = {
    initMediaSender(callback: () => void): void {
      navigator.mediaDevices
        .getUserMedia(p2pData.constraints)
        .then((stream) => {
          utils.updateData((newData: ShrughouseData) => {
            newData.user.stream = stream;

            utils.dispatchEvent("user", {
              type: "update",
              detail: newData.user,
            });

            return newData;
          });

          p2pData.localStream = stream;

          callback();
        })
        .catch((e) => {
          utils.dispatchEvent("error", {
            message: `getUserMedia error: ${e.name}`,
          });
        });
    },

    initMediaReceiver(socket: ShrughouseWebSocket): void {
      socket.addEventListener("message", (event: ShrughouseWebSocketEvent) => {
        const eventData = JSON.parse(event.data) as ShrughouseWebSocketMessage;

        if (eventData.media === "initReceive") {
          p2p.add(socket, eventData.socketId, false);

          socket.send(
            JSON.stringify({
              media: "initSend",
              socketId: eventData.socketId,
            })
          );
        } else if (eventData.media === "initSend") {
          p2p.add(socket, eventData.socketId, true);
        } else if (eventData.media === "remove") {
          p2p.remove(eventData.socketId);
        } else if (eventData.media === "signal") {
          p2pData.peers[eventData.socketId].signal(eventData.signal);
        }
      });

      socket.addEventListener("close", () => {
        Object.keys(p2pData.peers).forEach((socketId) => {
          p2p.remove(socketId);
        });
      });
    },

    initSocket(): void {
      const ws = new WebSocket(
        (location.protocol === "https:" ? "wss" : "ws") +
          "://" +
          options.api +
          "/api/room/" +
          data.room.name +
          "/websocket"
      );

      let rejoined = false;
      const startTime = Date.now();

      const rejoin = async () => {
        if (!rejoined) {
          rejoined = true;

          data.room.members.forEach((memberData: ShrughouseRoomMember) => {
            room.removeMember({
              id: memberData.id,
            });
          });

          const timeSinceLastJoin = Date.now() - startTime;
          if (timeSinceLastJoin < 10000) {
            await new Promise((resolve) =>
              setTimeout(resolve, 10000 - timeSinceLastJoin)
            );
          }

          p2p.initSocket();
        }
      };

      ws.addEventListener("open", () => {
        ws.send(JSON.stringify({ name: data.user.name }));
      });

      ws.addEventListener("message", (event: ShrughouseWebSocketEvent) => {
        const eventData = JSON.parse(event.data);

        if (eventData.error) {
          utils.dispatchEvent("error", { message: eventData.error });
        } else if (eventData.joined) {
          room.addMember({
            id: eventData.socketId,
          });
        } else if (eventData.quit) {
          room.removeMember({
            id: eventData.socketId,
          });
        } else if (eventData.ready) {
          // All pre-join messages have been delivered.
        }
      });

      ws.addEventListener("close", (event) => {
        utils.dispatchEvent("error", { message: event.reason });

        rejoin();
      });

      ws.addEventListener("error", (event) => {
        utils.dispatchEvent("error", {
          message: "Websocket error",
          data: event,
        });

        rejoin();
      });

      p2p.initMediaReceiver(ws);
    },

    remove(socketId: ShrughouseWebSocketId): void {
      utils.updateData((newData: ShrughouseData, oldData: ShrughouseData) => {
        let currentStream;

        newData.streams = oldData.streams.filter((oldStream) => {
          const result = oldStream.id !== socketId;

          if (!result) {
            currentStream = oldStream;
          }

          return result;
        });

        utils.dispatchEvent("media", {
          type: "remove",
          detail: currentStream,
        });

        return newData;
      });

      if (p2pData.peers[socketId]) {
        p2pData.peers[socketId].destroy();
        delete p2pData.peers[socketId];
      }
    },

    add(
      socket: ShrughouseWebSocket,
      socketId: ShrughouseWebSocketId,
      initiator: boolean
    ): void {
      p2pData.peers[socketId] = new SimplePeer({
        initiator: initiator,
        stream: p2pData.localStream,
        config: options,
      });

      p2pData.peers[socketId].on(
        "signal",
        (eventData: SimplePeer.SignalData) => {
          socket.send(
            JSON.stringify({
              media: "signal",
              signal: eventData,
              socketId: socketId,
            })
          );
        }
      );

      p2pData.peers[socketId].on("stream", (stream: ShrughouseMediaStream) => {
        utils.updateData((newData: ShrughouseData) => {
          const currentStream = {
            id: socketId,
            streamType: "video",
            stream,
          };

          newData.streams.push(currentStream);

          utils.dispatchEvent("media", {
            type: "add",
            detail: currentStream,
          });

          return newData;
        });
      });
    },

    get(id: ShrughouseWebSocketId): SimplePeer.Instance {
      return p2pData.peers[id];
    },

    all(): ShrughouseAdapterPeersData["peers"] {
      return p2pData.peers;
    },

    switchMedia(): void {
      if (p2pData.constraints.video.facingMode.ideal === "user") {
        p2pData.constraints.video.facingMode.ideal = "environment";
      } else {
        p2pData.constraints.video.facingMode.ideal = "user";
      }

      if (p2pData.localStream) {
        const tracks = p2pData.localStream.getTracks();

        tracks.forEach(function (track: MediaStreamTrack) {
          track.stop();
        });

        utils.updateData((newData: ShrughouseData) => {
          newData.user.stream = undefined;

          utils.dispatchEvent("user", {
            type: "update",
            detail: newData.user,
          });

          return newData;
        });
      }

      navigator.mediaDevices
        .getUserMedia(p2pData.constraints)
        .then((stream) => {
          Object.keys(p2pData.peers).forEach(
            (socketId: ShrughouseWebSocketId) => {
              for (const index in p2pData.peers[
                socketId
              ].streams[0].getTracks()) {
                for (const index2 in stream.getTracks()) {
                  if (
                    p2pData.peers[socketId].streams[0].getTracks()[index]
                      .kind === stream.getTracks()[index2].kind
                  ) {
                    p2pData.peers[socketId].replaceTrack(
                      p2pData.peers[socketId].streams[0].getTracks()[index],
                      stream.getTracks()[index2],
                      p2pData.peers[socketId].streams[0]
                    );
                    break;
                  }
                }
              }
            }
          );

          p2pData.localStream = stream;
          utils.updateData((newData: ShrughouseData) => {
            newData.user.stream = stream;

            utils.dispatchEvent("user", {
              type: "update",
              detail: newData.user,
            });

            return newData;
          });
        });
    },

    removeLocalStream(): void {
      if (p2pData.localStream) {
        const tracks = p2pData.localStream.getTracks();

        tracks.forEach(function (track: MediaStreamTrack) {
          track.stop();
        });

        utils.updateData((newData: ShrughouseData) => {
          newData.user.stream = undefined;

          utils.dispatchEvent("user", {
            type: "update",
            detail: newData.user,
          });

          return newData;
        });
      }

      for (const socketId in p2pData.peers) {
        p2p.remove(socketId);
      }
    },

    init(): void {
      p2p.initMediaSender(() => {
        p2p.initSocket();
      });
    },
  };

  return {
    init: p2p.init,
  };
}
