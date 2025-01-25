import jwt from "jsonwebtoken";
import config from "../../config";
import { TUserToken } from "../modules/user/user.interface";

const generateToken = (user: TUserToken) => {
  const accessToken = jwt.sign(
    { id: user._id, email: user.email, role: user.role, name: user.name },
    config.jwt_access_secret as string,
    {
      expiresIn: config.jwt_access_expiresin,
    }
  );

  const refreshToken = jwt.sign(
    { id: user._id, email: user.email, role: user.role, name: user.name },
    config.jwt_refresh_secret as string,
    {
      expiresIn: config.jwt_refresh_expiresin,
    }
  );

  return { accessToken, refreshToken };
};

export default generateToken;
