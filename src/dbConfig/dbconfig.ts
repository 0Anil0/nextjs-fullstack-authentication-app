import mongoose from "mongoose";

export function connect() {
  try {
    console.log("Connection");
    mongoose.connect("mongodb://127.0.0.1:27017/users");
    // const connection = mongoose.connection;
    // connection.on("connect", () => {
    //   console.log("Connected");
    // });
    // connection.on("error", (error) => {
    //   console.log("error", error);
    //   process.exit();
    // });
  } catch (error) {
    console.log("Something went wrong...");
    console.log(error);
  }
}
