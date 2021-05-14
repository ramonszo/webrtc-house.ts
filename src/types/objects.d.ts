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
  streamType?: "video" | "audio";
  stream: ShrughouseMediaStream | undefined;
};

export type ShrughouseSocketId = string;

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
  disconnect: ShrughouseEvent<ShrughouseUser>[];
  error: ShrughouseEvents<{ message: string }>[];
  action: ShrughouseEvents<{
    action: string;
    value: boolean | string | undefined;
  }>[];
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
