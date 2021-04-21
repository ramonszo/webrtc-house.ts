export type ShrughouseStream = MediaStream;

export type ShrughouseRoomMember = {
  id: string
};

export type ShrughouseData = {
  user: {
    name: string | undefined,
    stream: ShrughouseStream | undefined
  },
  room: {
    name: string | undefined,
    members: ShrughouseRoomMember[]
  },
  streams: {
    id: string;
    stream: ShrughouseStream
  }[]
};

export type ShrughouseOptions = {
  state?: (data: ShrughouseData, oldData: ShrughouseData) => void;
}

export type ShrughouseWebSocket = Websocket;

export type ShrughouseWebSocketEvent = WebSocket.IMessageEvent;

export type ShrughouseWebSocketId = string;

export type ShrughouseWebSocketMessage = {
  socketId: ShrughouseWebSocketId;
  media?: string
  signal?: SimplePeer.SignalData;
};

export type ShrughouseMediaData = {
  peers: {
    [keyname: string]: SimplePeer.Instance;
  },
  localStream: undefined | ShrughouseStream,
  constraints: {
    audio: boolean,
    video: {
      width: {
        max: number
      },
      height: {
        max: number
      },
      facingMode: {
        ideal: string
      }
    }
  }
};

export type Shrughouse = {
  room: {
    set: (values: Partial<ShrughouseData['room']>) => void;
    start: () => void;
  };
  user: {
    set: (values: Partial<ShrughouseData['user']>) => void;
  };
  components: {
    Modal: JSX
  }
};
