import mongoose from "mongoose";

const uri = process.env.MONGODB_URI as string;
const options = {};

declare global {
  var _mongooseConnectionPromise: Promise<typeof mongoose> | null;
}

let connectionPromise: Promise<typeof mongoose> | null = null;

function connectToDatabase(): Promise<typeof mongoose> {
  if (!connectionPromise) {
    connectionPromise = mongoose.connect(uri, options);

    if (process.env.NODE_ENV === "development") {
      global._mongooseConnectionPromise = connectionPromise;
    }
  }

  return connectionPromise;
}

export default connectToDatabase;
