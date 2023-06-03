import { Kafka } from "kafkajs";
import ip from "ip";
import * as salesController from "../sales/sale.controller";

const host = process.env.HOST_IP || ip.address();

// Kafka Configurations
const topics = ["sales-topic"]; // subscribe to multiple topic if needed
const subscribeOptions = { fromBeginning: true }; // enable this if you want full history consumption
const kafkaClientOptions = { sessionTimeout: 100, spinDelay: 100, retries: 2 };
const kafkaClient = new Kafka({
  clientId: "consumer-client",
  brokers: [`${host}:9092`],
  ...kafkaClientOptions,
});

const kafkaConsumer = kafkaClient.consumer({ groupId: "my-group" });

const consumer = async () => {
  await kafkaConsumer.connect();
  await kafkaConsumer.subscribe({ topics, ...subscribeOptions });
  await kafkaConsumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
      const value = JSON.parse(Buffer.from(message.value).toString());
      console.log({
        topic,
        partition,
        key: message.key,
        value,
        headers: message.headers,
      });
      // DO DB OPERATIONS
      const response = await salesController.add(value);
      console.log("Data added to DB successfully");
    },
  });
};

export default consumer;
