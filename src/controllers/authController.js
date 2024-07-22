import { User } from "../models/userModel.js";
import mongoose from "mongoose";
import {
  comparePassword,
  hashPassword,
} from "../utils/hashPassword/hashPassword.js";
import {createAccessToken,clearAccessTokenFromCookie} from "../utils/jwt/jwt.js";
export const createUser = async (req, res) => {
  try {
    
    const { username, email, phone, password } = req.body;

    const hashedPass =await hashPassword(password);


    const data = {
      username: username,
      email: email,
      password: hashedPass,
      phone: phone,
    };
    
    if (!username || !email || !password || !phone) {
     
      return res.status(400).json({ error: "Missing required fields" });
    }
    const userEmailExist = await User.findOne({
      email: email,
    });
    if (userEmailExist) {
      return { status: false, message: "user already exists" };
    }
    
    const user = await User.create(data);
   

    if (user) {
      return res
        .status(200)
        .json({
          status: true,
          message: "user created successfully",
          data: user,
        });
    } else {
      return res
        .status(400)
        .json({ status: false, message: "user not created" });
    }
  } catch (error) {
    console.log("Error in creating user", error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userData = await User.findOne({ email: email });
  
    if (userData) {
      const passwordMatch = comparePassword(password, userData.password);
      if (passwordMatch) {
        const accessTokensecretkey = process.env.ACCESS_SECRET_KEY;
        const tokenExpiration = "6h";
        createAccessToken(userData, accessTokensecretkey, tokenExpiration);
        return res
          .status(200)
          .json({
            status: true,
            message: "user logged in successfully",
            data: userData,
          });
      }
    }
    else{
      return res.status(400).json({ status: false, message: "user not found"})
    }
  } catch (error) {
    console.log("error in login", error);
  }
};

export const logout = async(req,res) => {
  try {
   
    clearAccessTokenFromCookie("accessToken",res)
    res.clearCookie("accessToken")
    console.log("success")
    res.status(200).json({status:true,message:"loggged out successfully"})
  } catch (error) {
    console.log("error in logging out",error)
    return res.status(500).json({status:false,message:`${error}`})
  }
}

export const refreshToken = async (req, res) => {
  try {
    const { token, id } = req.body;

    if (!token || !id) {
      return res
        .status(400)
        .json({ status: false, message: "Token and user ID are required" });
    }

    const refreshSecretKey = process.env.REFRESH_SECRET_KEY;

    let payload;
    try {
      payload = jwt.verify(token, refreshSecretKey);
    } catch (err) {
      console.error("Error verifying refresh token:", err);
      return res
        .status(401)
        .json({ status: false, message: "Invalid refresh token" });
    }

    if (!payload || !payload.user) {
      return res
        .status(401)
        .json({ status: false, message: "Payload not found" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    const accessToken = createAccessToken(
      user,
      process.env.ACCESS_SECRET_KEY,
      process.env.ACCESS_EXPIRY
    );

    return res.status(200).json({ status: true, accessToken });
  } catch (error) {
    console.error("Error in refreshToken function:", error);
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

