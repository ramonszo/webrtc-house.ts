import { ShrughouseAdapterProps, ShrughouseAdapterPeersData } from "./adapters";

import {
  ShrughouseProps,
  ShrughouseRoomComponent,
  ShrughouseUtilsComponent,
  ShrughouseStorageComponent,
  ShrughouseUserComponent,
} from "./components";

import {
  ShrughouseMediaStream,
  ShrughouseRoomMember,
  ShrughouseRoom,
  ShrughouseUser,
  ShrughouseWebSocket,
  ShrughouseWebSocketEvent,
  ShrughouseWebSocketId,
  ShrughouseWebSocketMessage,
  ShrughouseEvent,
  ShrughouseEvents,
  ShrughouseOptions,
} from "./objects";

export type ShrughouseData = {
  user: ShrughouseUser;
  room: ShrughouseRoom;
  streams: {
    id: string;
    stream: ShrughouseMediaStream;
  }[];
};

export type Shrughouse = {
  uid: string;
  room: {
    set: (values: Partial<ShrughouseData["room"]>) => void;
    start: () => void;
  };
  user: {
    set: (values: Partial<ShrughouseData["user"]>) => void;
  };
  components: {
    Panel: JSX;
  };
  events: ShrughouseEvents;
  on: (eventName: keyof ShrughouseEvents, callback: () => void) => void;
};

export {
  ShrughouseEvent,
  ShrughouseEvents,
  ShrughouseOptions,
  ShrughouseAdapterProps,
  ShrughouseAdapterPeersData,
  ShrughouseProps,
  ShrughouseRoomComponent,
  ShrughouseUtilsComponent,
  ShrughouseStorageComponent,
  ShrughouseUserComponent,
  ShrughouseMediaStream,
  ShrughouseRoomMember,
  ShrughouseRoom,
  ShrughouseUser,
  ShrughouseWebSocket,
  ShrughouseWebSocketEvent,
  ShrughouseWebSocketId,
  ShrughouseWebSocketMessage,
};
