import mongoose from "mongoose";
import { User } from "./userModel.js";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: String,
      required: true,
    },
    copies: {
      type: Number,
      required: true,
      min: [0,"Number of copies available cannot be negative"],
    },
    availableCopies: {
      type: Number,
      min: [0,"Number of copies available cannot be negative"],
    },
    genre: {
      type: String,
      trim: true,
    },
    borrowedUsers:{
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
    language: {
      type: String,
      trim: true,
    },
    image: {
      type:String,
    },
  },
  { timestamps: true }
);

const Books = mongoose.model("Books", bookSchema);
export { Books };
