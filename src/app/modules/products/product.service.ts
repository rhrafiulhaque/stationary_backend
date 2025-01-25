import QueryBuilder from "../../builder/QueryBuilder";
import { productSearchableFields } from "./product.constants";
import { IProduct } from "./product.interface";
import { Product } from "./product.model";

const createProductInDB = async (product: IProduct) => {
  const hasProduct = await Product.findOne({ name: product.name });
  if (hasProduct) {
    throw new Error("The Product already added");
  } else {
    const result = await Product.create(product);
    return result;
  }
};

const getAllProductFromDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(
    Product.find().populate("category").populate("brand"),
    query
  )
    .search(productSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await productQuery.countTotal();
  const result = await productQuery.modelQuery;
  return {
    meta,
    result,
  };
};

const getProductByIdFromDB = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};

const updateProductByIdInDB = async (id: string, data: Partial<IProduct>) => {
  const hasProduct = await Product.findOne({ _id: id });
  if (!hasProduct) {
    throw new Error("There Have No prodcut to update in this ID");
  } else {
    const result = await Product.findByIdAndUpdate(
      id,
      {
        ...data,
        inStock: data.quantity && data.quantity > 0 ? true : false,
      },
      { new: true }
    );
    return result;
  }
};

const deleteProductByIdInDB = async (productId: string) => {
  const result = await Product.findByIdAndDelete(productId);
  if (!result) {
    throw new Error("Product not found by this ID");
  } else {
    return result;
  }
};

export const productService = {
  createProductInDB,
  getAllProductFromDB,
  getProductByIdFromDB,
  updateProductByIdInDB,
  deleteProductByIdInDB,
};
