import { Order } from "../models/orderModel.js";
import { User } from "../models/userModel.js";
import { Books } from "../models/bookModel.js";
import { response } from "express";
import mongoose from "mongoose";

export const createOrder = async (req, res) => {
  const { userId, bookId, noofdays } = req.body;

  try {
    const user = await User.findById(userId);
    const book = await Books.findById(bookId);

    if (!user) {
      console.log("user not found");
      return res.status(400).json({ message: "User not found" });
    }
    if (book.borrowedUsers.includes(userId)) {
      console.log("user already borrowed the book");
      return res
        .status(400)
        .json({ status: false, message: "user already borrowed the book" });
    }
    if (!book) {
      console.log("book not found");
      return res.status(400).json({ message: "Book not found" });
    }
    if (book.avaialbleCopies <= 0) {
      console.log("copies <0");
      return res
        .status(400)
        .json({ messages: "No available copies for the book" });
    }

    const order = new Order({
      userId: userId,
      bookId: bookId,
      noofdays: noofdays,
    });

    book.availableCopies -= 1;
    book.borrowedUsers.push(new mongoose.Types.ObjectId(userId));
    await book.save();
    await order.save();

    return res
      .status(201)
      .json({ status: true, message: "Order created successfully" });
  } catch (error) {
    console.log("error in creating order", error);
    return res
      .status(500)
      .json({ status: false, message: `server error ${error}` });
  }
};
export const getUserOrder = async (req, res) => {
  try {
    const { userId } = req.params;
    const response = await Order.find({
      userId: userId,
      isReturned: false,
    }).populate("bookId");
    if (response) {
      return res.status(200).json({ status: true, data: response });
    }
  } catch (error) {
    console.log("erron in getting user order", error);
    return res
      .status(500)
      .json({ status: false, message: "error in getting user order" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("userId").populate("bookId");
    return res
      .status(200)
      .json({ status: true, message: "All orders", data: orders });
  } catch (error) {
    console.log("errorn in getting all orders", error);
    return res
      .status(500)
      .json({ status: false, message: "error in getting all orders" });
  }
};
export const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id)
      .populate("userId")
      .populate("bookId");
    if (!order) {
      return res
        .status(404)
        .json({ status: false, message: "Order not found" });
    }
    return res.status(200).json({ status: true, data: order });
  } catch (error) {
    console.log("error in getting order by id", error);
    return res
      .status(500)
      .json({ status: false, message: "error in getting the order" });
  }
};

export const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { userId, isReturn } = req.body;

  try {
    const order = await Order.findById(id);
    if (!order) {
      console.log("order not found");
      return res
        .status(400)
        .json({ status: false, message: "Order not found" });
    }

    if (isReturn) {
      order.isReturned = true;
      order.returnDate = new Date();

      const book = await Books.findById(order.bookId);

      book.availableCopies += 1;
      book.borrowedUsers = book.borrowedUsers.filter(
        (user) => user.toString() !== userId
      );

      await book.save();
    }

    await order.save();
    return res.status(200).json({ status: true, data: order });
  } catch (error) {
    console.log("error in updating order", error);
    return res
      .status(500)
      .json({ status: false, message: "Error in updating order" });
  }
};

export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      console.log("order not found");
      return response
        .status(404)
        .json({ status: false, message: "order not found" });
    }

    const user = await User.findById(order.userId);
    user.orders = user.orders.filter((order) => order._id != id);
    await user.save();

    const book = await Books.findById(order.bookId);
    book.avaialbleCopies += 1;
    await book.save();

    return res
      .status(200)
      .json({ status: true, message: "order deleted successfully" });
  } catch (error) {}
};
