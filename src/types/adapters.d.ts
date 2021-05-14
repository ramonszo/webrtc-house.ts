import { RTChouseRoomComponent } from "./components";

export type RTChouseAdapterProps = RTChouseProps & {
  room: RTChouseRoomComponent;
};

export type RTChouseAdapterActions = "mute";

export type RTChouseAdapterPeersData = {
  peers: {
    [keyname: string]: SimplePeer.Instance;
  };
  localStream: undefined | RTChouseMediaStream;
  constraints: MediaStreamConstraints;
};
