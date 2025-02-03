"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const product_model_1 = require("../products/product.model");
const user_model_1 = require("../user/user.model");
const order_model_1 = require("./order.model");
const order_utils_1 = require("./order.utils");
const createOrder = (user, payload, client_ip) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(payload === null || payload === void 0 ? void 0 : payload.length)) {
        throw new AppError_1.default(http_status_1.default.NOT_ACCEPTABLE, "Order is not specified");
    }
    const userDetails = (yield user_model_1.User.findById(user.id));
    const products = payload;
    let totalPrice = 0;
    const productDetails = yield Promise.all(products.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield product_model_1.Product.findById(item._id);
        if (product) {
            const subtotal = product
                ? (Number(product.price) || 0) * item.quantity
                : 0;
            totalPrice += subtotal;
            return item;
        }
    })));
    let order = yield order_model_1.Order.create({
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
    const payment = yield order_utils_1.orderUtils.makePaymentAsync(shurjopayPayload);
    if (payment === null || payment === void 0 ? void 0 : payment.transactionStatus) {
        order = yield order.updateOne({
            transaction: {
                id: payment.sp_order_id,
                transactionStatus: payment.transactionStatus,
            },
        });
    }
    return payment.checkout_url;
});
const verifyPayment = (order_id) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedPayment = yield order_utils_1.orderUtils.verifyPaymentAsync(order_id);
    if (verifiedPayment.length) {
        yield order_model_1.Order.findOneAndUpdate({
            "transaction.id": order_id,
        }, {
            "transaction.bank_status": verifiedPayment[0].bank_status,
            "transaction.sp_code": verifiedPayment[0].sp_code,
            "transaction.sp_message": verifiedPayment[0].sp_message,
            "transaction.transactionStatus": verifiedPayment[0].transaction_status,
            "transaction.method": verifiedPayment[0].method,
            "transaction.date_time": verifiedPayment[0].date_time,
            status: verifiedPayment[0].bank_status == "Success"
                ? "Paid"
                : verifiedPayment[0].bank_status == "Failed"
                    ? "Pending"
                    : verifiedPayment[0].bank_status == "Cancel"
                        ? "Cancelled"
                        : "",
        });
    }
    return verifiedPayment;
});
const getAllOrderFromDB = (user, query) => __awaiter(void 0, void 0, void 0, function* () {
    let productQuery;
    if (user.role === "user") {
        productQuery = new QueryBuilder_1.default(order_model_1.Order.find({ user: user.id }).populate("user").populate("products"), query)
            .sort()
            .paginate();
    }
    else if (user.role === "admin") {
        productQuery = new QueryBuilder_1.default(order_model_1.Order.find().populate("user").populate("products"), query)
            .sort()
            .paginate();
    }
    const meta = yield productQuery.countTotal();
    const result = yield productQuery.modelQuery;
    return {
        meta,
        result,
    };
});
const updateOrderStatusInDB = (user, orderId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const allowedStatuses = [
        "Pending",
        "Paid",
        "Shipped",
        "Completed",
        "Cancelled",
    ];
    if (!allowedStatuses.includes(status)) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Invalid status value");
    }
    if (user.role === "admin") {
        const result = yield order_model_1.Order.findByIdAndUpdate(orderId, { status: status }, { new: true });
        return result;
    }
    else {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Unauthorized: Only admins can update the order status");
    }
});
exports.orderService = {
    createOrder,
    verifyPayment,
    getAllOrderFromDB,
    updateOrderStatusInDB,
};
