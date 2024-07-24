import mongoose from "mongoose";
import { ConnectOptions } from "mongoose";

let isConnected = false; //track connection

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL!, {
      dbName: "theal",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);

    isConnected = true;
  } catch (error) {
    console.log("error", error);
  }
};

// password db: postPicker1506
