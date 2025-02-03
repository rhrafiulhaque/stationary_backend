import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import config from "../../../config";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },

    profilePhoto: {
      type: String,
      default: null,
      optional: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

export const User = model<TUser>("User", userSchema);
