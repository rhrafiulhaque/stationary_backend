import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import AppError from "../errors/AppError";
import { TUserRole } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";

const auth = (...requiredRoles: TUserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const tokenWitBearer = req.headers.authorization;
    const token = tokenWitBearer?.split(" ")[1];

    if (!token) {
      return next(new AppError(httpStatus.UNAUTHORIZED, "Please Login First"));
    }

    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(
        token,
        config.jwt_access_secret as string
      ) as JwtPayload;
    } catch (err: any) {
      if (err.name === "TokenExpiredError") {
        return next(
          new AppError(httpStatus.UNAUTHORIZED, "JWT Token has expired")
        );
      }
      return next(new AppError(httpStatus.UNAUTHORIZED, "Invalid Token"));
    }

    const role = decoded.role;

    const userExist = await User.findOne({ email: decoded.email });
    if (!userExist) {
      return next(new AppError(httpStatus.NOT_FOUND, "Email Not Found"));
    }

    const isBlocked = userExist?.isBlocked;
    if (isBlocked) {
      return next(
        new AppError(httpStatus.FORBIDDEN, "This User has been blocked")
      );
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      return next(
        new AppError(httpStatus.UNAUTHORIZED, "You are not Authorized")
      );
    }

    req.user = decoded as JwtPayload;
    next();
  };
};

export default auth;
