import {
  RTChouseData,
  RTChouseEvents,
  RTChouseProps,
  RTChouseUtilsComponent,
} from "../types";

import Storage from "./Storage";

export default function Utils({
  options,
  data,
  events,
}: RTChouseProps): RTChouseUtilsComponent {
  const storage = Storage({ options, data, events });

  const utils = {
    addEventListener(
      eventName: keyof RTChouseEvents,
      callback: (event: RTChouseEvents[keyof RTChouseEvents]) => void
    ): void {
      events[eventName].push(callback);
    },

    dispatchEvent(eventName: keyof RTChouseEvents, details: unknown): void {
      events[eventName].forEach((eventFunc: (details: unknown) => void) => {
        eventFunc(details);
      });
    },

    updateData(
      callback: (data: RTChouseData, oldData: RTChouseData) => RTChouseData
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
