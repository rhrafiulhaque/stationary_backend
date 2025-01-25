import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { blogSearchableFields } from "./blog.constant";
import { TBlog } from "./blog.interface";
import { Blog } from "./blog.model";

const createBlogIntoDb = async (payload: TBlog) => {
  const result = await Blog.create(payload);
  return result;
};

const getAllBlogFromDB = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(Blog.find(), query)
    .search(blogSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await blogQuery.modelQuery;
  return result;
};

const updateBlogByIdToDB = async (
  blogId: string,
  updatedData: Partial<TBlog>
) => {
  const isBlogExist = await Blog.findById(blogId);
  if (!isBlogExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog is not found");
  }
  const result = await Blog.findByIdAndUpdate({ _id: blogId }, updatedData, {
    new: true,
    runValidators: true,
    strict: true,
  });

  return result;
};

const getSingleBlogFromDB = async (id: string) => {
  const result = await Blog.findById(id);
  return result;
};

const deleteBlogByIdFromDB = async (blogId: string) => {
  const isBlogExist = await Blog.findById(blogId);
  if (!isBlogExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog is not found");
  }
  const result = await Blog.findByIdAndDelete(blogId);
  return result;
};

export const blogServices = {
  createBlogIntoDb,
  getAllBlogFromDB,
  updateBlogByIdToDB,
  deleteBlogByIdFromDB,
  getSingleBlogFromDB,
};
