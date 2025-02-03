import { Schema, model } from "mongoose";
import { IOrder } from "./order.interface";

const OrderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    products: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    status: {
      type: String,
      enum: ["Pending", "Paid", "Shipped", "Completed", "Cancelled"],
      default: "Pending",
    },
    transaction: {
      id: String,
      transactionStatus: String,
      bank_status: String,
      sp_code: String,
      sp_message: String,
      method: String,
      date_time: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Order = model<IOrder>("Order", OrderSchema);
