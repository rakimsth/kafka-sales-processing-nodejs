import saleModel from "./sale.model";

import { ISale } from "./sale.types";

export const add = async (payload: Required<ISale>): Promise<ISale> => {
  return saleModel.create(payload);
};
