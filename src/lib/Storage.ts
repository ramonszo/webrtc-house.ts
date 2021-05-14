import { RTChouseProps, RTChouseStorageComponent } from "../types";

export default function Storage({
  options,
}: RTChouseProps): RTChouseStorageComponent {
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
