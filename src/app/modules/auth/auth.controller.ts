import httpStatus from "http-status";
import config from "../../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.service";

const loginUser = catchAsync(async (req, res, next) => {
  const result = await authServices.loginUserIntoDB(req.body);
  const { refreshToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Login successful",
    data: {
      token: result.accessToken,
    },
  });
});
const refreshToken = catchAsync(async (req, res, next) => {
  const { refreshToken } = req.cookies;
  const result = await authServices.refreshTokenFromDB(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Refresh Token Updated Successfull",
    data: result,
  });
});

export const authControllers = {
  loginUser,
  refreshToken,
};
