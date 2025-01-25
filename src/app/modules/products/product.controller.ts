import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import { sendImageToCloudinary } from "../../utils/SendImageToClodinary";
import sendResponse from "../../utils/sendResponse";
import { productService } from "./product.service";

const createProduct = catchAsync(async (req, res, next) => {
  const product = req.body;
  console.log(product);
  let image = null;
  if (req.file) {
    try {
      const uploadResult = (await sendImageToCloudinary(
        req.file.buffer
      )) as any;
      image = uploadResult.secure_url;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw new AppError(
        httpStatus.BAD_GATEWAY,
        "Failed to upload photo to Cloudinary"
      );
    }
  }
  product.image = image;
  const result = await productService.createProductInDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product Created Successfull",
    data: result,
  });
});

const getAllProducts = catchAsync(async (req, res) => {
  const result = await productService.getAllProductFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Products are retrieved successfully",
    meta: result.meta,
    data: result.result,
  });
});
const getSingleProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await productService.getProductByIdFromDB(productId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product is retrieved successfully",
    data: result,
  });
});
const updateProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const updatedData = req.body;
  const result = await productService.updateProductByIdInDB(
    productId,
    updatedData
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product is updated successfully",
    data: result,
  });
});
const deleteProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await productService.deleteProductByIdInDB(productId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product is deleted successfully",
    data: result,
  });
});

export const productControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
