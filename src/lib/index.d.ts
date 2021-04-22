export type ShrughouseMediaStream = MediaStream;

export type ShrughouseRoomMember = {
  id: string
};

export type ShrughouseRoom = {
  name: string | undefined,
  members: ShrughouseRoomMember[]
};

export type ShrughouseUser = {
  name: string | undefined,
  stream: ShrughouseMediaStream | undefined
};

export type ShrughouseData = {
  user: ShrughouseUser,
  room: ShrughouseRoom,
  streams: {
    id: string;
    stream: ShrughouseMediaStream
  }[]
};

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
  localStream: undefined | ShrughouseMediaStream,
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

export type ShrughouseEvent<EventData> = (eventData: {
  type?: 'update' | 'add' | 'remove';
  details: EventData;
}) => void;

export type ShrughouseEvents = {
  data: ShrughouseEvent<ShrughouseData>[];
  room: ShrughouseEvent<ShrughouseRoom>[];
  'room:member': ShrughouseEvent<ShrughouseRoomMember>[];
  user: ShrughouseEvent<ShrughouseUser>[];
  media: ShrughouseEvent<ShrughouseMediaStream>[];
  error: ShrughouseEvents<{ message: string }>[]
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
  },
  events: ShrughouseEvents;
  on: (eventName: keyof ShrughouseEvents, callback: () => void) => void;
};
