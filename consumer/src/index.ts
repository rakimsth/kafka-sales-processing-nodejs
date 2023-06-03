import "dotenv/config";
import mongoose from "mongoose";

import consumer from "./modules/consumer";
// connect to kafka
(async () => {
  await consumer();
})();

type Options = {
  autoIndex: boolean;
  maxPoolSize: number;
  serverSelectionTimeoutMS: number;
  socketTimeoutMS: number;
  family: number;
};

const options: Options = {
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
};

mongoose
  .connect(
    `mongodb://localhost:27017/${process.env.DB_NAME || "kafka_sales"}`,
    options
  )
  .then((db) => {
    console.log(`Connected to ${db.connection.name} DB...`);
  })
  .catch((error) => console.log(error));
