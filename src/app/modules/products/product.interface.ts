import { Types } from "mongoose";

export interface IProduct {
  name: string;
  brand: Types.ObjectId;
  price: number;
  category: Types.ObjectId;
  description: string;
  quantity: number;
  inStock: boolean;
  image: string;
}
