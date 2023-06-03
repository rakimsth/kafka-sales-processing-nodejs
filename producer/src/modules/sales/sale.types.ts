import { Document } from "mongoose";

export interface ISale extends Document {
  total: number;
  sale_date: Date;
}
