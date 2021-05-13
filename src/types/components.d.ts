export type ShrughouseProps = {
  data: ShrughouseData;
  options: ShrughouseOptions;
  events: ShrughouseEvents;
};

export type ShrughouseRoomComponent = {
  set(values: Partial<ShrughouseData["room"]>): void;
  addMember(member: ShrughouseRoomMember): void;
  removeMember(member: ShrughouseRoomMember): void;
};

export type ShrughouseUtilsComponent = {
  addEventListener(
    eventName: keyof ShrughouseEvents,
    callback: (event: ShrughouseEvents[keyof ShrughouseEvents]) => void
  );
  dispatchEvent(eventName: keyof ShrughouseEvents, details: unknown): void;
  updateData(
    callback: (data: ShrughouseData, oldData: ShrughouseData) => ShrughouseData
  ): void;
  uuidv4(): string;
  getUuid(): string;
};

export type ShrughouseStorageComponent = {
  get(name: string): string | null;
  set(name: string, value: string): void;
};

export type ShrughouseUserComponent = {
  set(values: Partial<ShrughouseData["user"]>): void;
};
