import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

type MongooseConnectionCache = {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
};

// Encapsulate the cache inside the module-level closure, instead of polluting the global
const cached: MongooseConnectionCache = {
  conn: null,
  promise: null,
};

async function dbConnect(): Promise<Mongoose> {
  // When already have an existing connection
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    if (!MONGODB_URI) {
      throw new Error("...");
    }

    cached.promise = mongoose
      .connect(MONGODB_URI)
      .then((mongoose) => {
        return mongoose;
      })
      .catch((error) => {
        // Clear the cached promise so that subsequent calls can try to connect again.
        cached.promise = null;

        // Log the error or send it to a monitoring service
        console.error("Failed to connect to the database:", error.message);

        // Re-throw the error to ensure calling code knows the connection failed
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    // Clear the cached promise in case of any error.
    cached.promise = null;
    throw e; // This error would be the one thrown from our .catch() above.
  }

  return cached.conn;
}

async function dbDisconnect(): Promise<void> {
  if (cached.conn) {
    try {
      await cached.conn.disconnect();
      cached.conn = null;
      cached.promise = null;
    } catch (error) {
      // Clear the cached values regardless of the error
      cached.conn = null;
      cached.promise = null;

      if (error instanceof Error) {
        // Log the error or send it to a monitoring service
        console.error("Failed to disconnect from the database:", error.message);

        // Re-throw the error to ensure calling code knows the disconnection failed
        throw error;
      }
    }
  }
}

export { dbConnect, dbDisconnect };
