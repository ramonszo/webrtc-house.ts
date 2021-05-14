import { RTChouse, RTChouseData, RTChouseEvents } from "../types";

import RTChouseOptions from "./Options";

import User from "./User";
import Room from "./Room";
import Utils from "./Utils";

import Panel from "../components/Panel";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Form from "../components/Form";
import Header from "../components/Header";
import Listener from "../components/Listener";
import RoomComponent from "../components/Room";
import RoomActions from "../components/RoomActions";
import Speaker from "../components/Speaker";

import PeersAdapter from "../adapters/Peers";

function RTChouse(
  customOptions: Partial<typeof RTChouseOptions> = {}
): RTChouse {
  const options = { ...RTChouseOptions, ...customOptions };

  const data: RTChouseData = {
    user: {
      name: undefined,
      stream: undefined,
      streamType: undefined,
    },
    room: {
      name: undefined,
      members: [],
    },
    streams: [],
  };

  const events: RTChouseEvents = {
    data: [],
    user: [],
    room: [],
    "room:member": [],
    action: [],
    disconnect: [],
    media: [],
    error: [],
  };

  const utils = Utils({ options, data, events });
  const room = Room({ options, data, events });
  const user = User({ options, data, events });

  const adapter = PeersAdapter({ options, data, events, room });

  return {
    uid: utils.getUuid(),
    user: {
      set: user.set,
    },
    room: {
      set: room.set,
    },
    components: {
      Panel,
      Container,
      Footer,
      Form,
      Header,
      Listener,
      Room: RoomComponent,
      RoomActions,
      Speaker,
    },
    events: events,
    on: utils.addEventListener,

    disconnect: adapter.disconnect,
    action: adapter.action,
    init: adapter.init,
  };
}

if (typeof window !== "undefined") {
  (window as any).RTChouse = RTChouse;
}

export default RTChouse;

export {
  RTChouse,
  Panel,
  Container,
  Footer,
  Form,
  Header,
  Listener,
  RoomComponent as Room,
  RoomActions,
  Speaker,
};
