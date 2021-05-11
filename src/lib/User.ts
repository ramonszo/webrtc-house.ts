import { ShrughouseData, ShrughouseProps } from "../types";
import { ShrughouseUserComponent } from "../types/components";

import Utils from "./Utils";

export default function User({
  options,
  data,
  events,
}: ShrughouseProps): ShrughouseUserComponent {
  const utils = Utils({ options, data, events });

  const user = {
    set(values: Partial<ShrughouseData["user"]>) {
      utils.updateData((newData: ShrughouseData) => {
        newData.user = values as ShrughouseData["user"];

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
