import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { TUserFromToken } from "../user/user.interface";
import { orderService } from "./order.service";

const createOrder = catchAsync(async (req, res, next) => {
  const user = req.user;
  const order = await orderService.createOrder(
    user as TUserFromToken,
    req.body,
    req.ip!
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order Created successfully",
    data: order,
  });
});

const verifyPayment = catchAsync(async (req, res) => {
  const order = await orderService.verifyPayment(req.query.order_id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order verified successfully",
    data: order,
  });
});
const getAllOrder = catchAsync(async (req, res) => {
  const user = req.user as TUserFromToken;
  const order = await orderService.getAllOrderFromDB(user, req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order retrieved successfully",
    meta: order.meta,
    data: order.result,
  });
});
const updateOrderStatus = catchAsync(async (req, res) => {
  const user = req.user as TUserFromToken;
  const { orderId } = req.params;
  const { status } = req.body;
  const result = await orderService.updateOrderStatusInDB(
    user,
    orderId,
    status
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order updated successfully",
    data: result,
  });
});

export const orderController = {
  createOrder,
  verifyPayment,
  getAllOrder,
  updateOrderStatus,
};
