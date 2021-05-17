import SimplePeer from "simple-peer";
import { io, Socket } from "socket.io-client";

import {
  RTChouse,
  RTChouseData,
  RTChouseAdapterPeersData,
  RTChouseMediaStream,
  RTChouseSocketId,
  RTChouseAdapterProps,
  RTChouseAdapterActions,
} from "../types";

import Utils from "../lib/Utils";

export default function AdapterPeers({
  options,
  data,
  events,
  room,
}: RTChouseAdapterProps): {
  init: RTChouse["init"];
  action: RTChouse["action"];
  disconnect: RTChouse["disconnect"];
} {
  const utils = Utils({ options, data, events });

  const p2pData: RTChouseAdapterPeersData = {
    peers: {},
    localStream: undefined,
    constraints: {
      audio: true,
      video: false,
    },
  };

  let apiSocket: Socket | undefined;

  const p2p = {
    initMedia(callback: () => void): void {
      navigator.mediaDevices
        .getUserMedia(p2pData.constraints)
        .then((stream) => {
          utils.updateData((newData: RTChouseData) => {
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

    initSocket(callback: () => void): void {
      const apiHost = options.api || location.hostname;
      apiSocket = io(
        (location.protocol === "https:" ? "wss" : "ws") + "://" + apiHost,
        { query: { room: data.room.name, user: data.user.name } }
      );

      apiSocket.on(
        "initReceive",
        (data: { socketId: string; user: string }) => {
          const { socketId, user } = data;

          p2p.add(socketId, false);

          room.addMember({
            id: data.socketId,
            name: user,
          });

          if (apiSocket) {
            apiSocket.emit("initSend", { socketId: socketId });
          }
        }
      );

      apiSocket.on("initSend", (data: { socketId: string; user: string }) => {
        const { socketId, user } = data;

        p2p.add(socketId, true);

        room.addMember({
          id: socketId,
          name: user,
        });
      });

      apiSocket.on(
        "action",
        (data: {
          socketId: string;
          action: RTChouseAdapterActions;
          value: boolean | string | undefined;
        }) => {
          const { socketId, action, value } = data;

          if (action === "mute") {
            room.updateMember({
              id: socketId,
              muted: !value,
            });
          }
        }
      );

      apiSocket.on("removePeer", (socketId: string) => {
        p2p.remove(socketId);

        room.removeMember({
          id: socketId,
        });
      });

      apiSocket.on("disconnect", () => {
        Object.keys(p2pData.peers).forEach((socketId: string) => {
          p2p.remove(socketId);
        });
      });

      apiSocket.on("signal", (data) => {
        p2pData.peers[data.socketId].signal(data.signal);
      });

      apiSocket.on("connect", () => {
        if (apiSocket) {
          room.addMember({
            id: apiSocket.id,
            name: data.user.name,
          });

          callback();
        }
      });
    },

    remove(socketId: RTChouseSocketId): void {
      utils.updateData((newData: RTChouseData, oldData: RTChouseData) => {
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

    add(socketId: RTChouseSocketId, initiator: boolean): void {
      p2pData.peers[socketId] = new SimplePeer({
        initiator: initiator,
        stream: p2pData.localStream,
        config: options,
      });

      p2pData.peers[socketId].on(
        "signal",
        (eventData: SimplePeer.SignalData) => {
          if (apiSocket) {
            apiSocket.emit("signal", {
              signal: eventData,
              socketId: socketId,
            });
          }
        }
      );

      p2pData.peers[socketId].on("stream", (stream: RTChouseMediaStream) => {
        utils.updateData((newData: RTChouseData) => {
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

    get(id: RTChouseSocketId): SimplePeer.Instance {
      return p2pData.peers[id];
    },

    all(): RTChouseAdapterPeersData["peers"] {
      return p2pData.peers;
    },

    action(action: RTChouseAdapterActions): void {
      let state: boolean | string | undefined;

      switch (action) {
        case "mute":
          (() => {
            const stream = p2pData.localStream;

            for (const index in stream.getAudioTracks()) {
              state = !stream.getAudioTracks()[index].enabled;
              stream.getAudioTracks()[index].enabled = state;
            }

            if (apiSocket) {
              room.updateMember({
                id: apiSocket.id,
                muted: !state,
              });
            }
          })();

          break;
      }

      if (apiSocket) {
        apiSocket.emit("action", {
          socketId: apiSocket.id,
          action,
          value: state,
        });
      }

      utils.dispatchEvent("action", {
        type: action,
        detail: {
          value: state,
        },
      });
    },

    disconnect(): void {
      if (p2pData.localStream) {
        const tracks = p2pData.localStream.getTracks();

        tracks.forEach(function (track: MediaStreamTrack) {
          track.stop();
        });

        utils.updateData((newData: RTChouseData) => {
          newData.user.stream = undefined;

          utils.dispatchEvent("user", {
            type: "update",
            detail: newData.user,
          });

          utils.dispatchEvent("disconnect", {
            detail: newData.user,
          });

          return newData;
        });
      }

      for (const socketId in p2pData.peers) {
        p2p.remove(socketId);
      }

      p2pData.localStream = undefined;
      p2pData.peers = {};

      if (apiSocket) {
        apiSocket.disconnect();
      }
    },

    init(callback: () => void): void {
      p2p.initMedia(() => {
        p2p.initSocket(callback);
      });
    },
  };

  return {
    init: p2p.init,
    action: p2p.action,
    disconnect: p2p.disconnect,
  };
}
