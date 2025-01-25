import QueryBuilder from "../../builder/QueryBuilder";
import { brandSearchableFields } from "./brand.constants";
import { IBrand } from "./brand.interface";
import { Brand } from "./brand.model";

const createBrandInDB = async (brand: IBrand) => {
  const hasBrand = await Brand.findOne({ name: brand.name });
  if (hasBrand) {
    throw new Error("The Brand already added");
  } else {
    const result = await Brand.create(brand);
    return result;
  }
};

const getAllBrandFromDB = async (query: Record<string, unknown>) => {
  const brandQuery = new QueryBuilder(Brand.find(), query)
    .search(brandSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await brandQuery.countTotal();
  const result = await brandQuery.modelQuery;
  return {
    meta,
    result,
  };
};

const getBrandByIdFromDB = async (id: string) => {
  const result = await Brand.findById(id);
  return result;
};

const updateBrandByIdInDB = async (id: string, updatedName: string) => {
  const hasBrand = await Brand.findOne({ _id: id });
  if (!hasBrand) {
    throw new Error("There Have No brand to update in this ID");
  } else {
    const result = await Brand.findByIdAndUpdate(
      id,
      {
        name: updatedName,
      },
      { new: true }
    );
    return result;
  }
};

const deleteBrandByIdInDB = async (brandId: string) => {
  const result = await Brand.findByIdAndDelete(brandId);
  if (!result) {
    throw new Error("Brand not found by this ID");
  } else {
    return result;
  }
};

export const brandService = {
  createBrandInDB,
  getAllBrandFromDB,
  getBrandByIdFromDB,
  updateBrandByIdInDB,
  deleteBrandByIdInDB,
};
