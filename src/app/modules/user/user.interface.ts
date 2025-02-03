import { Types } from "mongoose";

export type TUser = {
  id?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: "admin" | "user";
  isBlocked: boolean;
  profilePhoto?: string;
};

export type TUserFromToken = {
  email: string;
  id: string;
  role: string;
  name: string;
  iat: number;
  exp: number;
};

export type TUserToken = {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  phone: string;
  profilePhoto?: string;
  role: "admin" | "user";
  isBlocked: boolean;
};

export const USER_ROLE = {
  user: "user",
  admin: "admin",
} as const;

export type TUserRole = keyof typeof USER_ROLE;
