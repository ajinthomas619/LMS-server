import mongoose from "mongoose";
import { Order } from "./orderModel.js";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    profileUrl: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isBlocked:{
      type:Boolean,
      default:false
    },
    orders: [
      {
        orderID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Order",
        },
      },
    ],
  },
  { timestamps: true }

);

const User = mongoose.model("User", userSchema);
export { User };
