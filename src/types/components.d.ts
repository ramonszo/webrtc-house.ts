export type RTChouseProps = {
  data: RTChouseData;
  options: RTChouseOptions;
  events: RTChouseEvents;
};

export type RTChouseRoomComponent = {
  set(values: Partial<RTChouseData["room"]>): void;
  addMember(member: RTChouseRoomMember): void;
  removeMember(member: RTChouseRoomMember): void;
};

export type RTChouseUtilsComponent = {
  addEventListener(
    eventName: keyof RTChouseEvents,
    callback: (event: RTChouseEvents[keyof RTChouseEvents]) => void
  );
  dispatchEvent(eventName: keyof RTChouseEvents, details: unknown): void;
  updateData(
    callback: (data: RTChouseData, oldData: RTChouseData) => RTChouseData
  ): void;
  uuidv4(): string;
  getUuid(): string;
};

export type RTChouseStorageComponent = {
  get(name: string): string | null;
  set(name: string, value: string): void;
};

export type RTChouseUserComponent = {
  set(values: Partial<RTChouseData["user"]>): void;
};
