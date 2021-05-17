export type RTChouseMediaStream = MediaStream;

export type RTChouseRoomMember = {
  id: string;
};

export type RTChouseRoom = {
  name: string | undefined;
  members: RTChouseRoomMember[];
};

export type RTChouseUser = {
  name: string | undefined;
  streamType?: "video" | "audio";
  stream: RTChouseMediaStream | undefined;
};

export type RTChouseSocketId = string;

export type RTChouseEvent<EventData> = (eventData: {
  type?: "update" | "add" | "remove";
  details: EventData;
}) => void;

export type RTChouseEvents = {
  data: RTChouseEvent<RTChouseData>[];
  room: RTChouseEvent<RTChouseRoom>[];
  "room:member": RTChouseEvent<RTChouseRoomMember>[];
  user: RTChouseEvent<RTChouseUser>[];
  media: RTChouseEvent<RTChouseMediaStream>[];
  disconnect: RTChouseEvent<RTChouseUser>[];
  error: RTChouseEvents<{ message: string }>[];
  action: RTChouseEvents<{
    action: string;
    value: boolean | string | undefined;
  }>[];
};

export type RTChouseOptions = {
  storageName: string;
  api?: string;
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
