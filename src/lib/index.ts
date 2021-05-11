import { Shrughouse, ShrughouseData, ShrughouseEvents } from "../types";

import ShrughouseOptions from "./Options";

import User from "./User";
import Room from "./Room";
import Utils from "./Utils";

import Modal from "../components/Modal";

function Shrughouse(
  customOptions: Partial<typeof ShrughouseOptions> = {}
): Shrughouse {
  const options = { ...ShrughouseOptions, ...customOptions };

  const data: ShrughouseData = {
    user: {
      name: undefined,
      stream: undefined,
    },
    room: {
      name: undefined,
      members: [],
    },
    streams: [],
  };

  const events: ShrughouseEvents = {
    data: [],
    user: [],
    room: [],
    "room:member": [],
    media: [],
    error: [],
  };

  const utils = Utils({ options, data, events });
  const room = Room({ options, data, events });
  const user = User({ options, data, events });

  return {
    uid: utils.getUuid(),
    user: {
      set: user.set,
    },
    room: {
      set: room.set,
      start: room.start,
    },
    components: {
      Modal,
    },
    events: events,
    on: utils.addEventListener,
  };
}

if (typeof window !== "undefined") {
  (window as any).Shrughouse = Shrughouse;
}

export default Shrughouse;

export { Shrughouse, Modal };
