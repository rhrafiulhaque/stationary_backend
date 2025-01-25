import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const notFound = (req: Request, res: Response, next: NextFunction): void => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Api Not Found",
    statusCode: httpStatus.NOT_FOUND,
    error: "",
  });
};

export default notFound;
