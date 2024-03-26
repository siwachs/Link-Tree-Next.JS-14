import type { MongoClient } from "mongodb";

declare global {
  namespace globalThis {
    var _mongoClientPromise: Promise<MongoClient>;
  }
}

interface ToggleOption {
  id: string;
  name: string;
  value: string;
  icon: any;
  iconClassName?: string;
  fixedWidth?: boolean;
  label: string;
}
