"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const OrderSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    products: [
        {
            _id: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    status: {
        type: String,
        enum: ["Pending", "Paid", "Shipped", "Completed", "Cancelled"],
        default: "Pending",
    },
    transaction: {
        id: String,
        transactionStatus: String,
        bank_status: String,
        sp_code: String,
        sp_message: String,
        method: String,
        date_time: String,
    },
}, {
    timestamps: true,
});
exports.Order = (0, mongoose_1.model)("Order", OrderSchema);
