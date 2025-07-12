import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable inside .env.local');
}

declare global {
  // Cache for mongoose connection & promise
  // eslint-disable-next-line no-var
  var mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Mongoose> | null;
  } | undefined;
}

if (!globalThis.mongoose) {
  globalThis.mongoose = { conn: null, promise: null };
}

const mongooseCache = globalThis.mongoose!;

export const connectDB = async (): Promise<mongoose.Connection> => {
  if (mongooseCache.conn) {
    return mongooseCache.conn;
  }

  if (!mongooseCache.promise) {
    mongooseCache.promise = mongoose.connect(MONGO_URI).then((mongooseInstance: mongoose.Mongoose) => {
      return mongooseInstance;
    });
  }

  const mongooseInstance = await mongooseCache.promise;
  mongooseCache.conn = mongooseInstance.connection;

  console.log(`MongoDB connected: ${mongooseCache.conn.host}`);

  return mongooseCache.conn;
};
