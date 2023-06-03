import { Schema, model } from "mongoose";
import { ISale } from "./sale.types";
// 1. Import an interface representing a document in MongoDB.

// 2. Create a Schema corresponding to the document interface.
const saleSchema: Schema = new Schema<ISale>({
  total: { type: Number, required: true, default: 0 },
  sale_date: { type: Date, required: true },
});

// 3. Create a Model.
export default model<ISale>("Sales", saleSchema);
