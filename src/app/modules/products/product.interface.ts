import { Types } from "mongoose";

export interface IProduct {
  name: string;
  brand: Types.ObjectId;
  price: string;
  category: Types.ObjectId;
  description: string;
  stock: string;
  inStock: boolean;
  image: string;
}
