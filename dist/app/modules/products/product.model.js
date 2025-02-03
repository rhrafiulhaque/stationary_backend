"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    brand: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Brand",
    },
    price: {
        type: String,
        required: true,
        min: 0,
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Category",
    },
    description: {
        type: String,
        required: true,
    },
    stock: {
        type: String,
        required: true,
        min: 0,
    },
    inStock: {
        type: Boolean,
        required: true,
        default: true,
    },
    image: {
        type: String,
        require: true,
    },
}, {
    timestamps: true,
});
exports.Product = (0, mongoose_1.model)("Product", ProductSchema);
