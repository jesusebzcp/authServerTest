import mongoose from "mongoose";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

const connectMongoDb = async () => {
  try {
    const db = await mongoose.connect(process.env.URI_DB as string);
    console.log("database is connected to", db.connection.db.databaseName);
  } catch (error) {
    console.error(error);
  }
};

export default connectMongoDb;
