import {
  ShrughouseData,
  ShrughouseEvents,
  ShrughouseProps,
  ShrughouseUtilsComponent,
} from "../types";

import Storage from "./Storage";

export default function Utils({
  options,
  data,
  events,
}: ShrughouseProps): ShrughouseUtilsComponent {
  const storage = Storage({ options, data, events });

  const utils = {
    addEventListener(
      eventName: keyof ShrughouseEvents,
      callback: (event: ShrughouseEvents[keyof ShrughouseEvents]) => void
    ): void {
      events[eventName].push(callback);
    },

    dispatchEvent(eventName: keyof ShrughouseEvents, details: unknown): void {
      events[eventName].forEach((eventFunc: (details: unknown) => void) => {
        eventFunc(details);
      });
    },

    updateData(
      callback: (
        data: ShrughouseData,
        oldData: ShrughouseData
      ) => ShrughouseData
    ): void {
      const oldData = { ...data };

      data = callback(data, oldData);

      utils.dispatchEvent("data", { type: "update", detail: data });
    },

    uuidv4(): string {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          const r = (Math.random() * 16) | 0;
          const v = c === "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
    },

    getUuid(): string {
      let uid = storage.get("uid");

      if (!uid) {
        uid = utils.uuidv4();

        storage.set("uid", uid);
      }

      return uid;
    },
  };

  return utils;
}
