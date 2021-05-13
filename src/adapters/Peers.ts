import SimplePeer from "simple-peer";
import { io } from "socket.io-client";

import {
  ShrughouseData,
  ShrughouseAdapterPeersData,
  ShrughouseMediaStream,
  ShrughouseWebSocket,
  ShrughouseWebSocketId,
  ShrughouseAdapterProps,
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
      video: false,
    },
  };

  const p2p = {
    initMedia(callback: () => void): void {
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

    initSocket(): void {
      const ws = io(
        (location.protocol === "https:" ? "wss" : "ws") + "://" + options.api,
        { query: { room: data.room.name, user: data.user.name } }
      );

      ws.on("initReceive", (data: { socketId: string; user: string }) => {
        const { socketId, user } = data;

        p2p.add(ws, socketId, false);

        room.addMember({
          id: data.socketId,
          name: user,
        });

        ws.emit("initSend", { socketId: socketId });
      });

      ws.on("initSend", (data: { socketId: string; user: string }) => {
        const { socketId, user } = data;

        p2p.add(ws, socketId, true);

        room.addMember({
          id: socketId,
          name: user,
        });
      });

      ws.on("removePeer", (socketId: string) => {
        p2p.remove(socketId);

        room.removeMember({
          id: socketId,
        });
      });

      ws.on("disconnect", () => {
        Object.keys(p2pData.peers).forEach((socketId: string) => {
          p2p.remove(socketId);
        });
      });

      ws.on("signal", (data) => {
        p2pData.peers[data.socketId].signal(data.signal);
      });
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

        if (currentStream) {
          utils.dispatchEvent("media", {
            type: "remove",
            detail: currentStream,
          });
        }

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
          socket.emit("signal", {
            signal: eventData,
            socketId: socketId,
          });
        }
      );

      p2pData.peers[socketId].on("stream", (stream: ShrughouseMediaStream) => {
        utils.updateData((newData: ShrughouseData) => {
          const currentStream = {
            id: socketId,
            streamType: "audio",
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
            newData.user.streamType = "audio";
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
      p2p.initMedia(() => {
        p2p.initSocket();
      });
    },
  };

  return {
    init: p2p.init,
  };
}
