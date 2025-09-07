import mongoose from "mongoose";

const connection: { isConnected?: number } = {};

export async function connectToDatabase() {
  if (connection.isConnected) {
    console.log("Using existing database connection");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI!);

    connection.isConnected = db.connections[0].readyState;

    db.connection.on("connected", () => {
      console.log("Database connected successfully");
    });

    db.connection.on("error", (err) => {
      console.error(
        "Mongo db connection error. Please make sure mongo db is running:",
        err
      );
      console.log("Loaded MONGO_URI:", process.env.MONGO_URI);
    });
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
}
