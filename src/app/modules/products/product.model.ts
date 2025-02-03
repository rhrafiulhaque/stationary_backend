import { Schema, model } from "mongoose";
import { IProduct } from "./product.interface";

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    brand: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Brand",
    },
    price: {
      type: String,
      required: true,
      min: 0,
    },
    category: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    description: {
      type: String,
      required: true,
    },
    stock: {
      type: String,
      required: true,
      min: 0,
    },
    inStock: {
      type: Boolean,
      required: true,
      default: true,
    },
    image: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Product = model<IProduct>("Product", ProductSchema);
