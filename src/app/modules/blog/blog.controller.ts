import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { blogServices } from "./blog.service";

const createBlog = catchAsync(async (req, res, next) => {
  const result = await blogServices.createBlogIntoDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog created successfully",
    data: result,
  });
});

const getAllBlog = catchAsync(async (req, res, next) => {
  const result = await blogServices.getAllBlogFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog retrives Successfull",
    data: result,
  });
});

const getSingleBlog = catchAsync(async (req, res) => {
  const { blogId } = req.params;
  const result = await blogServices.getSingleBlogFromDB(blogId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog is retrieved successfully",
    data: result,
  });
});

const updateBlogById = catchAsync(async (req, res, next) => {
  const { blogId } = req.params;
  const updatedData = req.body;

  const result = await blogServices.updateBlogByIdToDB(blogId, updatedData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog Updated Successfull",
    data: result,
  });
});
const deleteBlogById = catchAsync(async (req, res, next) => {
  const { blogId } = req.params;

  const result = await blogServices.deleteBlogByIdFromDB(blogId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog Deleted Successfull",
    data: result,
  });
});

export const blogControllers = {
  createBlog,
  getAllBlog,
  updateBlogById,
  deleteBlogById,
  getSingleBlog,
};
