import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import config from "./config";

let server: Server;
async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("Database Connected");
    server = app.listen(config.port, () => {
      console.log(`Server is Running at ${config.port}`);
    });
  } catch (err) {
    console.log("Error Occuered", err);
  }
}

bootstrap();

process.on("unhandledRejection", () => {
  console.log(`😈 unahandledRejection is detected , shutting down ...`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});
