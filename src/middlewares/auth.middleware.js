import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

//when user do login ,we give user refresh token and access token (check tken is there or not)
export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    // request have cookies access through cookieParser and you need accesstoken if not there then you should check custom req header(could be sent by user)
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    // console.log(token);
    //if token is not there
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }
    //after its verified we will get decoded token info.
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    //_id from model access token
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
