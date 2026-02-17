// lib/dbConnect.ts
import mongoose from 'mongoose';

const connection = { isConnected: false };

export default async function dbConnect() {
  // Check if the connection is already established
  if (connection.isConnected) {
    return;
  }

  // Check for MONGO_URI
  if (!process.env.MONGO_URI) {
    throw new Error('MongoDB connection URI is missing. Please set MONGO_URI environment variable.');
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000, // Timeout after 5s
    });

    connection.isConnected = db.connections[0].readyState === 1;
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
}
