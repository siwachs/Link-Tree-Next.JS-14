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

interface PageObject {
  _id: string;
  uri: string;
  owner: string;
  displayName: string;
  location: string;
  bio: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  __v: number;
}
