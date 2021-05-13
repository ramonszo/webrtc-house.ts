import { ShrughouseRoomComponent } from "./components";

export type ShrughouseAdapterProps = ShrughouseProps & {
  room: ShrughouseRoomComponent;
};

export type ShrughouseAdapterPeersData = {
  peers: {
    [keyname: string]: SimplePeer.Instance;
  };
  localStream: undefined | ShrughouseMediaStream;
  constraints: MediaStreamConstraints;
};
