import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { userSearchableFields } from "../products/product.constants";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (payload: TUser) => {
  const userExist = await User.findOne({ email: payload.email });
  if (userExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Email Already Exist");
  }
  const result = await User.create(payload);
  return result;
};
const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find(), query)
    .search(userSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await userQuery.countTotal();
  const result = await userQuery.modelQuery;
  return {
    meta,
    result,
  };
};
const getMeFromDB = async (
  requesteUserEmail: string,
  requseteUserRole: string
) => {
  const user = await User.findOne({ email: requesteUserEmail });
  if (requseteUserRole !== user!.role || requesteUserEmail !== user!.email) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You are not Authorized to access this user"
    );
  }

  return user;
};

const blockUserToDB = async (userId: string, isBlocked: boolean) => {
  const isUserExist = await User.findById(userId);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User does not found");
  }
  const result = await User.findOneAndUpdate(
    { _id: userId },
    { isBlocked: isBlocked },
    {
      new: true,
      runValidators: true,
    }
  );

  return result;
};

const updateUserData = async (
  requesteUserEmail: string,
  requseteUserRole: string,
  updateData: Partial<TUser>
) => {
  const userExist = await User.findOne({ email: requesteUserEmail });
  if (
    requseteUserRole !== userExist!.role ||
    requesteUserEmail !== userExist!.email
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You are not Authorized to Update this user"
    );
  }

  const updatedUser = await User.findOneAndUpdate(
    { email: userExist!.email },
    {
      name: updateData.name,
      phone: updateData.phone,
      address: updateData.address,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  return updatedUser;
};

export const userServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getMeFromDB,
  blockUserToDB,
  updateUserData,
};
