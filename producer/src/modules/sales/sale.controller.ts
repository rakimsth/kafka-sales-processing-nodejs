import saleModel from "./sale.model";

import { ISale } from "./sale.types";

export const list = (): Promise<ISale[]> => {
  return saleModel.find();
};
