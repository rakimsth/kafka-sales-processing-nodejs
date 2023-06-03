import { Kafka, Partitioners } from "kafkajs";
import ip from "ip";

const host = process.env.HOST_IP || ip.address();

const kafkaClientOptions = { sessionTimeout: 100, spinDelay: 100, retries: 2 };
const kafkaClient = new Kafka({
  clientId: "producer-client",
  brokers: [`${host}:9092`], // add multiple brokers if needed
  ...kafkaClientOptions,
});

const kafkaProducer = kafkaClient.producer({
  createPartitioner: Partitioners.DefaultPartitioner,
});

kafkaProducer.on("producer.connect", () =>
  console.log("Kafka producer connected")
);

kafkaProducer.on("producer.disconnect", () =>
  console.log("Kafka producer disconnected")
);

export default kafkaProducer;
