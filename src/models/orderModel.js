import mongoose from "mongoose";
import { User } from "./userModel.js";
import { Books } from "./bookModel.js";

const orderSchema = new mongoose.Schema(
  {
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Books",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    noofdays: {
      type: Number,
    },
    isReturned: {
      type: Boolean,
      default: false,
    },
    issuedDate:{
        type: Date,
        default:Date.now
    },
    returnDate:{
        type:Date
    },
    fines:{
        Type:Number,
    }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export { Order };
