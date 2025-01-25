import QueryBuilder from "../../builder/QueryBuilder";
import { categorySearchableFields } from "./category.constants";
import { ICategory } from "./category.interface";
import { Category } from "./category.model";

const createCategoryInDB = async (category: ICategory) => {
  const hasCategory = await Category.findOne({ name: category.name });
  if (hasCategory) {
    throw new Error("The Category already added");
  } else {
    const result = await Category.create(category);
    return result;
  }
};

const getAllCategoryFromDB = async (query: Record<string, unknown>) => {
  const categoryQuery = new QueryBuilder(Category.find(), query)
    .search(categorySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await categoryQuery.countTotal();
  const result = await categoryQuery.modelQuery;
  return {
    meta,
    result,
  };
};

const getCategoryByIdFromDB = async (id: string) => {
  const result = await Category.findById(id);
  return result;
};

const updateCategoryByIdInDB = async (id: string, updatedName: string) => {
  const hasCategory = await Category.findOne({ _id: id });
  if (!hasCategory) {
    throw new Error("There Have No prodcut to update in this ID");
  } else {
    const result = await Category.findByIdAndUpdate(
      id,
      {
        name: updatedName,
      },
      { new: true }
    );
    return result;
  }
};

const deleteCategoryByIdInDB = async (categoryId: string) => {
  const result = await Category.findByIdAndDelete(categoryId);
  if (!result) {
    throw new Error("Category not found by this ID");
  } else {
    return result;
  }
};

export const categoryService = {
  createCategoryInDB,
  getAllCategoryFromDB,
  getCategoryByIdFromDB,
  updateCategoryByIdInDB,
  deleteCategoryByIdInDB,
};
