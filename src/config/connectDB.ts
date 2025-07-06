import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO_URI!;

if (!MONGODB_URI) {
    throw new Error('MONGO_URI is not defined in .env.local');
}

let isConnected = false;

export const connectDB = async () => {
    if (isConnected) {
        return;
    }

    try {
        const db = await mongoose.connect(MONGODB_URI, {
        dbName: 'yourDbNameHere',
        });

        isConnected = true;
        console.log(`MongoDB connected: ${db.connection.host}`);
    } catch (error: any) {
        console.error(`MongoDB connection error: ${error.message}`);
        process.exit(1);
    }
};
