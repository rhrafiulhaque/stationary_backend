import { Schema, model } from "mongoose";
import { TBlog } from "./blog.interface";

const blogSchema = new Schema<TBlog>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    isPublished: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

export const Blog = model<TBlog>("Blog", blogSchema);
