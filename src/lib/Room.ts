import {
  RTChouseProps,
  RTChouseData,
  RTChouseRoomMember,
  RTChouseRoomComponent,
} from "../types";

import Utils from "./Utils";

export default function Room({
  options,
  data,
  events,
}: RTChouseProps): RTChouseRoomComponent {
  const utils = Utils({ options, data, events });

  const room = {
    set(values: Partial<RTChouseData["room"]>) {
      if (values.name) {
        values.name = values.name
          .replace(/[^a-zA-Z0-9_-]/g, "")
          .replace(/_/g, "-")
          .toLowerCase();

        if (values.name.length > 32 && !values.name.match(/^[0-9a-f]{64}$/)) {
          utils.dispatchEvent("error", { message: "Invalid room name" });

          return;
        }
      }

      utils.updateData((newData: RTChouseData, oldData: RTChouseData) => {
        newData.room = {
          ...oldData.room,
          ...values,
        };

        utils.dispatchEvent("room", {
          type: "update",
          detail: newData.room,
        });

        return newData;
      });
    },

    updateMember(member: RTChouseRoomMember) {
      utils.updateData((newData: RTChouseData) => {
        newData.room.members.map((oldMember) => {
          if (oldMember.id === member.id) {
            return { oldMember, ...member };
          } else {
            return oldMember;
          }
        });

        utils.dispatchEvent("room:member", {
          type: "update",
          detail: member,
        });

        utils.dispatchEvent("room", {
          type: "update",
          detail: newData.room,
        });

        return newData;
      });
    },

    addMember(member: RTChouseRoomMember) {
      utils.updateData((newData: RTChouseData, oldData: RTChouseData) => {
        newData.room.members = oldData.room.members.filter(
          (oldMember) => oldMember.id !== member.id
        );

        newData.room.members.push(member);

        utils.dispatchEvent("room:member", {
          type: "add",
          detail: member,
        });

        utils.dispatchEvent("room", {
          type: "update",
          detail: newData.room,
        });

        return newData;
      });
    },

    removeMember(member: RTChouseRoomMember) {
      utils.updateData((newData: RTChouseData, oldData: RTChouseData) => {
        let currentMember;

        newData.room.members = oldData.room.members.filter((oldMember) => {
          const result = oldMember.id !== member.id;

          if (!result) {
            currentMember = oldMember;
          }

          return result;
        });

        utils.dispatchEvent("room:member", {
          type: "remove",
          detail: currentMember,
        });

        utils.dispatchEvent("room", {
          type: "update",
          detail: newData.room,
        });

        return newData;
      });
    },
  };

  return room;
}
