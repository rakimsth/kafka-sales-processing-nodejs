import express, { Request, Response, Next } from "express";
import salesRouter from "../modules/sales/sale.routes.api";
const router = express.Router();

router.use("/sales", salesRouter);

export default router;
