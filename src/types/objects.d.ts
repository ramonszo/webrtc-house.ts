export type ShrughouseMediaStream = MediaStream;

export type ShrughouseRoomMember = {
  id: string;
};

export type ShrughouseRoom = {
  name: string | undefined;
  members: ShrughouseRoomMember[];
};

export type ShrughouseUser = {
  name: string | undefined;
  stream: ShrughouseMediaStream | undefined;
};

export type ShrughouseWebSocket = Websocket;

export type ShrughouseWebSocketEvent = WebSocket.IMessageEvent;

export type ShrughouseWebSocketId = string;

export type ShrughouseWebSocketMessage = {
  socketId: ShrughouseWebSocketId;
  media?: string;
  signal?: SimplePeer.SignalData;
};

export type ShrughouseEvent<EventData> = (eventData: {
  type?: "update" | "add" | "remove";
  details: EventData;
}) => void;

export type ShrughouseEvents = {
  data: ShrughouseEvent<ShrughouseData>[];
  room: ShrughouseEvent<ShrughouseRoom>[];
  "room:member": ShrughouseEvent<ShrughouseRoomMember>[];
  user: ShrughouseEvent<ShrughouseUser>[];
  media: ShrughouseEvent<ShrughouseMediaStream>[];
  error: ShrughouseEvents<{ message: string }>[];
};

export type ShrughouseOptions = {
  storageName: string;
  api: string;
  mode: string;
  icePolicy: string;
  iceServers: (
    | {
        urls: string;
        url?: undefined;
        credential?: undefined;
        username?: undefined;
      }
    | {
        url: string;
        credential: string;
        username: string;
        urls?: undefined;
      }
  )[];
};
