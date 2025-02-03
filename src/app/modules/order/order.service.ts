import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { Product } from "../products/product.model";
import { TUser, TUserFromToken } from "../user/user.interface";
import { User } from "../user/user.model";
import { TOrderStatus } from "./order.interface";
import { Order } from "./order.model";
import { orderUtils } from "./order.utils";
const createOrder = async (
  user: TUserFromToken,
  payload: { _id: string; quantity: number }[],
  client_ip: string
) => {
  if (!payload?.length) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, "Order is not specified");
  }

  const userDetails = (await User.findById(user.id)) as TUser;
  const products = payload;

  let totalPrice = 0;
  const productDetails = await Promise.all(
    products.map(async (item) => {
      const product = await Product.findById(item._id);
      if (product) {
        const subtotal = product
          ? (Number(product.price) || 0) * item.quantity
          : 0;
        totalPrice += subtotal;
        return item;
      }
    })
  );

  let order = await Order.create({
    user: user.id,
    products: productDetails,
    totalPrice,
  });

  // payment integration
  const shurjopayPayload = {
    amount: totalPrice,
    order_id: order._id,
    currency: "BDT",
    customer_name: userDetails.name,
    customer_address: userDetails.address,
    customer_email: userDetails.email,
    customer_phone: userDetails.phone,
    customer_city: userDetails.address,
    client_ip,
  };

  const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

  if (payment?.transactionStatus) {
    order = await order.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    });
  }
  return payment.checkout_url;
};

const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    await Order.findOneAndUpdate(
      {
        "transaction.id": order_id,
      },
      {
        "transaction.bank_status": verifiedPayment[0].bank_status,
        "transaction.sp_code": verifiedPayment[0].sp_code,
        "transaction.sp_message": verifiedPayment[0].sp_message,
        "transaction.transactionStatus": verifiedPayment[0].transaction_status,
        "transaction.method": verifiedPayment[0].method,
        "transaction.date_time": verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == "Success"
            ? "Paid"
            : verifiedPayment[0].bank_status == "Failed"
            ? "Pending"
            : verifiedPayment[0].bank_status == "Cancel"
            ? "Cancelled"
            : "",
      }
    );
  }

  return verifiedPayment;
};

const getAllOrderFromDB = async (
  user: TUserFromToken,
  query: Record<string, unknown>
) => {
  let productQuery;
  if (user.role === "user") {
    productQuery = new QueryBuilder(
      Order.find({ user: user.id }).populate("user").populate("products"),
      query
    )
      .sort()
      .paginate();
  } else if (user.role === "admin") {
    productQuery = new QueryBuilder(
      Order.find().populate("user").populate("products"),
      query
    )
      .sort()
      .paginate();
  }

  const meta = await productQuery!.countTotal();
  const result = await productQuery!.modelQuery;
  return {
    meta,
    result,
  };
};

const updateOrderStatusInDB = async (
  user: TUserFromToken,
  orderId: string,
  status: TOrderStatus
) => {
  const allowedStatuses: TOrderStatus[] = [
    "Pending",
    "Paid",
    "Shipped",
    "Completed",
    "Cancelled",
  ];
  if (!allowedStatuses.includes(status)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid status value");
  }

  if (user.role === "admin") {
    const result = await Order.findByIdAndUpdate(
      orderId,
      { status: status },
      { new: true }
    );
    return result;
  } else {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "Unauthorized: Only admins can update the order status"
    );
  }
};

export const orderService = {
  createOrder,
  verifyPayment,
  getAllOrderFromDB,
  updateOrderStatusInDB,
};
