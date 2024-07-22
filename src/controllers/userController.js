import { User } from "../models/userModel.js";

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    if (user) {
      return res.status(200).json({ status: true, data: user });
    }
  } catch (error) {
    console.log("error in getting useer", error);
    return res
      .status(500)
      .json({ status: false, message: "error in getting users" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const response = await User.find({});
    if (response) {
      return res.status(200).json({ status: true, data: response });
    }
  } catch (error) {
    console.log("error in getting all users", error);
  }
};

export const editUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, phone } = req.body;

    const response = await User.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          username: username,
          email: email,
          phone: phone,
        },
      },
      { new: true }
    );
    if (response) {
      return res
        .status(200)
        .json({
          status: true,
          message: "Profile updated successfully",
          data: response,
        });
    }
  } catch (error) {
    console.log("error in updating profile", error);
    return res
      .status(500)
      .json({ status: false, message: "error in updating profile" });
  }
};

export const addProfileImage = async (req, res) => {
  try {
    const { imageUrl, userId } = req.body;
    const response = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          profileUrl: imageUrl,
        },
      },
      { new: true }
    );
    if (response) {
      return res
        .status(200)
        .json({
          status: true,
          message: "Profile updated successfully",
          data: response,
        });
    }
  } catch (error) {
    console.log("error in updating profile image", error);
    return res
      .status(500)
      .json({ status: false, message: "error in updating profile image" });
  }
};

export const searchUser = async (req, res) => {
  try {
    const regex = req.params.user;

    const userData = await User.find({
      $or: [
        {
          email: {
            $regex: ".*" + regex + ".*",
            $options: i,
          },
        },
        {
          username: {
            $regex: ".*" + regex + ".*",
            $options: "i",
          },
        },
      ],
    });
    if (userData) {
      return res
        .status(200)
        .json({ status: true, message: "user found", data: userData });
    }
  } catch (error) {
    console.log("error in searching user", error);
    return res
      .status(500)
      .json({ status: false, message: "error in finding users" });
  }
};
