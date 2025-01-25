import bcrypt from "bcrypt";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../../config";
import AppError from "../../errors/AppError";
import generateToken from "../../utils/jwt";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";

const loginUserIntoDB = async (payload: TLoginUser) => {
  const userExist = await User.findOne({ email: payload.email }).select(
    "+password"
  );
  if (!userExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Email Not Found");
  }

  const isBlocked = userExist?.isBlocked;
  if (isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, "This User has been blocked");
  }

  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    userExist?.password
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, "Password Does not Match");
  }

  const token = generateToken(userExist);

  return token;
};

const refreshTokenFromDB = async (token: string) => {
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Please Login First");
  }

  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string
  ) as JwtPayload;

  const userExist = await User.findOne({ email: decoded.email });
  if (!userExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Email Not Found");
  }

  const isBlocked = userExist?.isBlocked;
  if (isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, "This User has been blocked");
  }

  const result = generateToken(userExist);

  return {
    accessToken: result.accessToken,
  };
};

export const authServices = {
  loginUserIntoDB,
  refreshTokenFromDB,
};
