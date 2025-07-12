import mongoose from 'mongoose';

declare global {
  // This cache object only — not the entire mongoose module
  var mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Mongoose> | null;
  } | undefined;
}

export {};
