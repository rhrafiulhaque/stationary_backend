import { Schema, model } from "mongoose";
import { IBrand } from "./brand.interface";

const BrandSchema = new Schema<IBrand>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Brand = model<IBrand>("Brand", BrandSchema);
