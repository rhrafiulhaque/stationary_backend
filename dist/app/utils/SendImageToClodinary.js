"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.sendImageToCloudinary = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const cloudinary_1 = require("cloudinary");
const multer_1 = __importDefault(require("multer"));
const config_1 = __importDefault(require("../../config"));
cloudinary_1.v2.config({
    cloud_name: config_1.default.cloudinary_cloud_name,
    api_key: config_1.default.cloudinary_api_key,
    api_secret: config_1.default.cloudinary_api_secret,
});
const sendImageToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary_1.v2.uploader.upload_stream({ resource_type: "image" }, (error, result) => {
            if (error) {
                console.error("Cloudinary Upload Error:", error);
                return reject(error);
            }
            resolve(result);
        });
        uploadStream.end(fileBuffer);
    });
};
exports.sendImageToCloudinary = sendImageToCloudinary;
const storage = multer_1.default.memoryStorage();
const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(file.originalname.toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    }
    else {
        cb(new Error("Only image files are allowed"));
    }
};
exports.upload = (0, multer_1.default)({ storage, fileFilter });
