import { ShrughouseRoomComponent } from "./components";

export type ShrughouseAdapterProps = ShrughouseProps & {
  room: ShrughouseRoomComponent;
};

export type ShrughouseAdapterActions = "mute";

export type ShrughouseAdapterPeersData = {
  peers: {
    [keyname: string]: SimplePeer.Instance;
  };
  localStream: undefined | ShrughouseMediaStream;
  constraints: MediaStreamConstraints;
};
