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
  bgType: "color" | "image";
  bgColor: string;
  bgImage: string;
  buttons: any;
  links: {
    _id: string;
    title: string;
    description: string;
    icon: string;
    link: string;
  }[];
  createdAt: Date | string;
  updatedAt: Date | string;
  __v: number;
}

interface PageLink {
  key?: string;
  _id?: string;
  title: string;
  description: string;
  icon: string;
  link: string;
}

interface LinkButton {
  key: string;
  label: string;
  icon: any;
  type: string;
  placeholder: string;
}

interface AnalyticAggregationObject {
  _id: string;
  count: number;
}

interface TransformedAggregationObject {
  date: string;
  views: number;
  clicks: number;
}
