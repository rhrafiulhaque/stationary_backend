import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { categoryService } from "./category.service";

const createCategory = catchAsync(async (req, res, next) => {
  const result = await categoryService.createCategoryInDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category Created Successfull",
    data: result,
  });
});

const getAllCategories = catchAsync(async (req, res) => {
  const result = await categoryService.getAllCategoryFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category are retrieved successfully",
    meta: result.meta,
    data: result.result,
  });
});
const getSingleCategory = catchAsync(async (req, res) => {
  const { catId } = req.params;
  const result = await categoryService.getCategoryByIdFromDB(catId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category is retrieved successfully",
    data: result,
  });
});
const updateCategory = catchAsync(async (req, res) => {
  const { catId } = req.params;
  const updatedName = req.body.name;
  const result = await categoryService.updateCategoryByIdInDB(
    catId,
    updatedName
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category is updated successfully",
    data: result,
  });
});
const deleteCategory = catchAsync(async (req, res) => {
  const { catId } = req.params;
  const result = await categoryService.deleteCategoryByIdInDB(catId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category is deleted successfully",
    data: result,
  });
});

export const categoryControllers = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
