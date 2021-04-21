import SimplePeer from 'simple-peer';
import Modal from '../components/Modal';
import {
  Shrughouse,
  ShrughouseData,
  ShrughouseEvents,
  ShrughouseMediaData,
  ShrughouseOptions,
  ShrughouseRoomMember,
  ShrughouseStream,
  ShrughouseWebSocket,
  ShrughouseWebSocketEvent,
  ShrughouseWebSocketId,
  ShrughouseWebSocketMessage
} from './index.d';

function Shrughouse (options: ShrughouseOptions = {}): Shrughouse {
  let data: ShrughouseData = {
    user: {
      name: undefined,
      stream: undefined
    },
    room: {
      name: undefined,
      members: []
    },
    streams: []
  };

  const events: ShrughouseEvents = {
    data: [],
    'room:member': [],
    'user:update': [],
    'media:action': []
  };

  const mediaData: ShrughouseMediaData = {
    peers: {},
    localStream: undefined,
    constraints: {
      audio: true,
      video: {
        width: {
          max: 300
        },
        height: {
          max: 300
        },
        facingMode: {
          ideal: 'user'
        }
      }
    }
  };

  const configuration = {
    hostname: 'chat-beta.r-corp.workers.dev',
    iceServers: [
      {
        urls: 'stun:stun.l.google.com:19302'
      },
      {
        url: 'turn:192.158.29.39:3478?transport=udp',
        credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
        username: '28224511:1379330808'
      }
    ],
    ...options
  };

  const utils = {
    addEventListener (event: keyof typeof events, callback: () => void) {
      events[event].push(callback);
    },

    updateData (callback: (data: ShrughouseData, oldData: ShrughouseData) => ShrughouseData) {
      const oldData = { ...data };

      data = callback(data, oldData);

      if (options.state) {
        options.state(data, oldData);
      }
    }
  };

  const media = {
    initMediaSender (callback: () => void) {
      navigator.mediaDevices
        .getUserMedia(mediaData.constraints)
        .then((stream) => {
          utils.updateData((newData) => {
            newData.user.stream = stream;

            return newData;
          });

          mediaData.localStream = stream;

          callback();
        })
        .catch((e) => {
          alert(`getusermedia error ${e.name}`);

          console.log('error', e);
        });
    },

    initMediaReceiver (socket: ShrughouseWebSocket) {
      socket.addEventListener('message', (event: ShrughouseWebSocketEvent) => {
        const eventData = JSON.parse(event.data) as ShrughouseWebSocketMessage;

        if (eventData.media === 'initReceive') {
          console.log('INIT RECEIVE ' + eventData.socketId);
          media.addPeer(socket, eventData.socketId, false);

          socket.send(
            JSON.stringify({
              media: 'initSend',
              socketId: eventData.socketId
            })
          );
        } else if (eventData.media === 'initSend') {
          console.log('INIT SEND ' + eventData.socketId);
          media.addPeer(socket, eventData.socketId, true);
        } else if (eventData.media === 'removePeer') {
          console.log('REMOVE PEER ' + eventData.socketId);
          media.removePeer(eventData.socketId);
        } else if (eventData.media === 'signal') {
          mediaData.peers[eventData.socketId].signal(eventData.signal);
        }
      });

      socket.addEventListener('close', () => {
        console.log('GOT DISCONNECTED');

        Object.keys(mediaData.peers).forEach((socketId) => {
          media.removePeer(socketId);
        });
      });
    },

    removePeer (socketId: ShrughouseWebSocketId) {
      utils.updateData((newData, oldData) => {
        newData.streams = oldData.streams.filter(
          (oldStream) => oldStream.id !== socketId
        );

        return newData;
      });

      if (mediaData.peers[socketId]) {
        mediaData.peers[socketId].destroy();
        delete mediaData.peers[socketId];
      }
    },

    addPeer (socket: ShrughouseWebSocket, socketId: ShrughouseWebSocketId, initiator: boolean) {
      mediaData.peers[socketId] = new SimplePeer({
        initiator: initiator,
        stream: mediaData.localStream,
        config: configuration
      });

      mediaData.peers[socketId].on('signal', (eventData: SimplePeer.SignalData) => {
        socket.send(
          JSON.stringify({
            media: 'signal',
            signal: eventData,
            socketId: socketId
          })
        );
      });

      mediaData.peers[socketId].on('stream', (stream: ShrughouseStream) => {
        utils.updateData((newData) => {
          newData.streams.push({
            id: socketId,
            stream
          });

          return newData;
        });
      });
    },

    getPeer (id: ShrughouseWebSocketId) {
      return mediaData.peers[id];
    },

    getPeers () {
      return mediaData.peers;
    },

    switchMedia () {
      if (mediaData.constraints.video.facingMode.ideal === 'user') {
        mediaData.constraints.video.facingMode.ideal = 'environment';
      } else {
        mediaData.constraints.video.facingMode.ideal = 'user';
      }

      if (mediaData.localStream) {
        const tracks = mediaData.localStream.getTracks();

        tracks.forEach(function (track: MediaStreamTrack) {
          track.stop();
        });

        utils.updateData((newData) => {
          newData.user.stream = undefined;

          return newData;
        });
      }

      navigator.mediaDevices.getUserMedia(mediaData.constraints).then((stream) => {
        Object.keys(mediaData.peers).forEach((socketId: ShrughouseWebSocketId) => {
          for (const index in mediaData.peers[socketId].streams[0].getTracks()) {
            for (const index2 in stream.getTracks()) {
              if (
                mediaData.peers[socketId].streams[0].getTracks()[index].kind ===
                stream.getTracks()[index2].kind
              ) {
                mediaData.peers[socketId].replaceTrack(
                  mediaData.peers[socketId].streams[0].getTracks()[index],
                  stream.getTracks()[index2],
                  mediaData.peers[socketId].streams[0]
                );
                break;
              }
            }
          }
        });

        mediaData.localStream = stream;
        utils.updateData((newData) => {
          newData.user.stream = stream;

          return newData;
        });
      });
    },

    removeLocalStream () {
      if (mediaData.localStream) {
        const tracks = mediaData.localStream.getTracks();

        tracks.forEach(function (track: MediaStreamTrack) {
          track.stop();
        });

        utils.updateData((newData) => {
          newData.user.stream = undefined;

          return newData;
        });
      }

      for (const socketId in mediaData.peers) {
        media.removePeer(socketId);
      }
    }
  };

  const user = {
    set (values: Partial<ShrughouseData['user']>) {
      utils.updateData((newData) => {
        newData.user = values as ShrughouseData['user'];

        return newData;
      });
    }
  };

  const room = {
    set (values: Partial<ShrughouseData['room']>) {
      if (values.name) {
        values.name = values.name
          .replace(/[^a-zA-Z0-9_-]/g, '')
          .replace(/_/g, '-')
          .toLowerCase();

        if (values.name.length > 32 && !values.name.match(/^[0-9a-f]{64}$/)) {
          console.warn('ERROR', 'Invalid room name.');
          return;
        }
      }

      utils.updateData((newData, oldData) => {
        newData.room = {
          ...oldData.room,
          ...values
        };

        return newData;
      });
    },

    addMember (member: ShrughouseRoomMember) {
      utils.updateData((newData, oldData) => {
        newData.room.members = oldData.room.members.filter(
          (oldMember) => oldMember.id !== member.id
        );

        newData.room.members.push(member);

        return newData;
      });
    },

    removeMember (member: ShrughouseRoomMember) {
      utils.updateData((newData, oldData) => {
        newData.room.members = oldData.room.members.filter(
          (oldMember) => oldMember.id !== member.id
        );

        return newData;
      });
    },

    start () {
      media.initMediaSender(() => {
        room.join();
      });
    },

    join () {
      const ws = new WebSocket(
        'wss://' +
          configuration.hostname +
          '/api/room/' +
          data.room.name +
          '/websocket'
      );

      let rejoined = false;
      const startTime = Date.now();

      const rejoin = async () => {
        if (!rejoined) {
          rejoined = true;

          data.room.members.forEach((memberData) => {
            room.removeMember({
              id: memberData.id
            });
          });

          const timeSinceLastJoin = Date.now() - startTime;
          if (timeSinceLastJoin < 10000) {
            await new Promise((resolve) =>
              setTimeout(resolve, 10000 - timeSinceLastJoin)
            );
          }

          // OK, reconnect now!
          room.join();
        }
      };

      ws.addEventListener('open', () => {
        ws.send(JSON.stringify({ name: data.user.name }));
      });

      ws.addEventListener('message', (event: ShrughouseWebSocketEvent) => {
        const eventData = JSON.parse(event.data);

        if (eventData.error) {
          console.log('error', eventData.error);
        } else if (eventData.joined) {
          room.addMember({
            id: eventData.socketId
          });
        } else if (eventData.quit) {
          room.removeMember({
            id: eventData.socketId
          });
        } else if (eventData.ready) {
          // All pre-join messages have been delivered.
        }
      });

      ws.addEventListener('close', (event) => {
        console.log(
          'WebSocket closed, reconnecting:',
          event.code,
          event.reason
        );
        rejoin();
      });

      ws.addEventListener('error', (event) => {
        console.log('WebSocket error, reconnecting:', event);
        rejoin();
      });

      media.initMediaReceiver(ws);
    }
  };

  return {
    user: {
      set: user.set
    },
    room: {
      set: room.set,
      start: room.start
    },
    components: {
      Modal
    },
    events: events,
    on: utils.addEventListener
  };
}

if (typeof window !== 'undefined') {
  (window as any).Shrughouse = Shrughouse;
}

export default Shrughouse;

export {
  Modal
};
