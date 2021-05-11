import { ShrughouseProps, ShrughouseStorageComponent } from "../types";

export default function Storage({
  options,
}: ShrughouseProps): ShrughouseStorageComponent {
  const storage = {
    get(name: string): string | null {
      return localStorage.getItem(options.storageName + ":" + name);
    },

    set(name: string, value: string): void {
      localStorage.setItem(options.storageName + ":" + name, value);
    },
  };

  return storage;
}
