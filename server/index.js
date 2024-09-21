import app from "./app.js";
import { connectToDatabase } from "./database.js";
import dotenv from "dotenv";

dotenv.config();

connectToDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`server is running on port: ${process.env.PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
