import { RTChouseData, RTChouseProps } from "../types";
import { RTChouseUserComponent } from "../types/components";

import Utils from "./Utils";

export default function User({
  options,
  data,
  events,
}: RTChouseProps): RTChouseUserComponent {
  const utils = Utils({ options, data, events });

  const user = {
    set(values: Partial<RTChouseData["user"]>) {
      utils.updateData((newData: RTChouseData) => {
        newData.user = values as RTChouseData["user"];

        utils.dispatchEvent("user", {
          type: "update",
          detail: newData.user,
        });

        return newData;
      });
    },
  };

  return user;
}
