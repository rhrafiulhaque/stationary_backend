import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./user.service";

const createUser = catchAsync(async (req, res, next) => {
  const result = await userServices.createUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Created Successfull",
    data: result,
  });
});
const getAllUsers = catchAsync(async (req, res, next) => {
  const result = await userServices.getAllUsersFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Retrive Successfull",
    meta: result.meta,
    data: result.result,
  });
});
const getMe = catchAsync(async (req, res, next) => {
  const requestedEmail = req.user.email;
  const requestedRole = req.user.role;
  const result = await userServices.getMeFromDB(requestedEmail, requestedRole);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Retrive Successfull",
    data: result,
  });
});

const blockUser = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const isBlocked = req.body.isBlocked;

  const result = await userServices.blockUserToDB(userId, isBlocked);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User blocked successfully",
    data: result,
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  const requestedEmail = req.user.email;
  const requestedRole = req.user.role;
  const updatedData = req.body;
  const result = await userServices.updateUserData(
    requestedEmail,
    requestedRole,
    updatedData
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Updated Successfull",
    data: result,
  });
});

export const userControllers = {
  createUser,
  getAllUsers,
  getMe,
  blockUser,
  updateUser,
};
