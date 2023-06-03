import express, { Request, Response, Next } from "express";
import kafkaProducer from "../producer";
import * as salesController from "./sale.controller";

const router = express.Router();

router.post("/", async (req: Request, res: Response, next: Next) => {
  const { total } = req.body;
  const parsedTotal = Number(total);

  const message = {
    value: JSON.stringify({
      total: parsedTotal,
      sale_date: Date.now(),
    }),
  };

  const payload = {
    topic: "sales-topic",
    messages: [message],
  };
  console.log("payload", JSON.stringify(payload));
  await kafkaProducer.connect();
  const resp = await kafkaProducer.send(payload).catch((e) => next(e));
  await kafkaProducer.disconnect();
  res.json({ message: resp ? "Sales added successfully" : resp });
});

router.get("/", (req: Request, res: Response, next: Next) => {
  salesController
    .list()
    .then((d) => res.json(d))
    .catch((e) => next(e));
});

export default router;
