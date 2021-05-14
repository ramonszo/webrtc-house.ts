import { RTChouseAdapterProps, RTChouseAdapterPeersData } from "./adapters";

import {
  RTChouseProps,
  RTChouseRoomComponent,
  RTChouseUtilsComponent,
  RTChouseStorageComponent,
  RTChouseUserComponent,
} from "./components";

import {
  RTChouseMediaStream,
  RTChouseRoomMember,
  RTChouseRoom,
  RTChouseUser,
  RTChouseSocketId,
  RTChouseEvent,
  RTChouseEvents,
  RTChouseOptions,
} from "./objects";

export type RTChouseData = {
  user: RTChouseUser;
  room: RTChouseRoom;
  streams: {
    id: string;
    stream: RTChouseMediaStream;
  }[];
};

export type RTChouse = {
  uid: string;
  room: {
    set: (values: Partial<RTChouseData["room"]>) => void;
  };
  user: {
    set: (values: Partial<RTChouseData["user"]>) => void;
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
  events: RTChouseEvents;
  on: (eventName: keyof RTChouseEvents, callback: () => void) => void;
  init: (callback: () => void) => void;
  action: (action: RTChouseAdapterActions) => void;
  disconnect: () => void;
};

export {
  RTChouseEvent,
  RTChouseEvents,
  RTChouseOptions,
  RTChouseAdapterProps,
  RTChouseAdapterPeersData,
  RTChouseAdapterActions,
  RTChouseProps,
  RTChouseRoomComponent,
  RTChouseUtilsComponent,
  RTChouseStorageComponent,
  RTChouseUserComponent,
  RTChouseMediaStream,
  RTChouseRoomMember,
  RTChouseRoom,
  RTChouseUser,
  RTChouseSocketId,
};
