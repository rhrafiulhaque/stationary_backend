import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { brandService } from "./brand.service";

const createBrand = catchAsync(async (req, res, next) => {
  const result = await brandService.createBrandInDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Brand Created Successfull",
    data: result,
  });
});

const getAllBrands = catchAsync(async (req, res) => {
  const result = await brandService.getAllBrandFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Brands are retrieved successfully",
    meta: result.meta,
    data: result.result,
  });
});
const getSingleBrand = catchAsync(async (req, res) => {
  const { brandId } = req.params;
  const result = await brandService.getBrandByIdFromDB(brandId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Brand is retrieved successfully",
    data: result,
  });
});
const updateBrand = catchAsync(async (req, res) => {
  const { brandId } = req.params;
  const updatedName = req.body.name;
  const result = await brandService.updateBrandByIdInDB(brandId, updatedName);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Brand is updated successfully",
    data: result,
  });
});
const deleteBrand = catchAsync(async (req, res) => {
  const { brandId } = req.params;
  const result = await brandService.deleteBrandByIdInDB(brandId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Brand is deleted successfully",
    data: result,
  });
});

export const brandControllers = {
  createBrand,
  getAllBrands,
  getSingleBrand,
  updateBrand,
  deleteBrand,
};
