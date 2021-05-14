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
  ShrughouseSocketId,
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
  };
  user: {
    set: (values: Partial<ShrughouseData["user"]>) => void;
  };
  components: {
    Panel: JSX;
    Container: JSX;
    Footer: JSX;
    Header: JSX;
    Listener: JSX;
    Form: JSX;
    Room: JSX;
    RoomActions: JSX;
    Speaker: JSX;
  };
  events: ShrughouseEvents;
  on: (eventName: keyof ShrughouseEvents, callback: () => void) => void;
  init: (callback: () => void) => void;
  action: (action: ShrughouseAdapterActions) => void;
  disconnect: () => void;
};

export {
  ShrughouseEvent,
  ShrughouseEvents,
  ShrughouseOptions,
  ShrughouseAdapterProps,
  ShrughouseAdapterPeersData,
  ShrughouseAdapterActions,
  ShrughouseProps,
  ShrughouseRoomComponent,
  ShrughouseUtilsComponent,
  ShrughouseStorageComponent,
  ShrughouseUserComponent,
  ShrughouseMediaStream,
  ShrughouseRoomMember,
  ShrughouseRoom,
  ShrughouseUser,
  ShrughouseSocketId,
};
