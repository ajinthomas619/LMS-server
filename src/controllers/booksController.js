import { Books } from "../models/bookModel.js";
import { User } from "../models/userModel.js";

export const addBook = async (req, res) => {
  try {
    const { body, file } = req;

    if (!file || Array.isArray(file)) {
      return res.status(400).json({ error: "No Files uploaded" });
    }

    const uploadedFiles = Array.isArray(file) ? file : [file];
    const images = uploadedFiles.map((file) => file.filename);

    const data = {
      image: images[0],
      data: body,
    };

    const { title, author, copies, genre, language } = data;

    const bookData = {
      title: body.title,
      author: body.author,
      copies: body.copies,
      availableCopies: body.copies,
      genre: body.genre,
      language: body.language,
      image: images[0],
    };

    const response = await Books.create(bookData);
    if (response) {
      return res.status(200).json({
        status: true,
        message: "Book Added Successfully",
        data: response,
      });
    }
  } catch (error) {
    console.log("erron creatinjg book", error);
    return res
      .status(500)
      .json({ status: false, message: "error in creating books" });
  }
};

export const showBooks = async (req, res) => {
  try {
    const response = await Books.find();
    if (response) {
      return res.status(200).json({
        status: true,
        message: "Books fetched successfully",
        data: response,
      });
    }
  } catch (error) {
    console.log("error in fetching books", error);
    return res
      .status(500)
      .json({ status: false, error: "error in fetching books" });
  }
};
export const showBooksforUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const response = await Books.find({ borrowedUsers: { $nin: [userId] } });

    if (response) {
      return res.status(200).json({
        status: true,
        message: "Books fetched successfully",
        data: response,
      });
    }
  } catch (error) {
    console.log("error in fetching books", error);
    return res
      .status(500)
      .json({ status: false, error: "error in fetching books" });
  }
};

export const editBookData = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = req.body;
    const response = await Books.findByIdAndUpdate(
      id,
      {
        title: data.Title,
        author: data.author,
        copies: data.copies,
        availableCopies: data.copies,
      },
      { new: true }
    );
    if (response) {
      return res.status(200).json({
        status: true,
        message: "Book Updated Successfully",
        data: response,
      });
    }
  } catch (error) {
    console.log("error in editing book data", error);
    return res
      .status(500)
      .json({ status: false, message: "errorn in updating book data" });
  }
};
export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Books.findById(id);
    if (!book) {
      return res.status(400).json({ status: false, message: "Book not found" });
    }

    const response = await Books.findByIdAndDelete(id);
    if (response) {
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.log("Error in deleting image file", err);
          return res
            .status(500)
            .json({ status: false, message: "Error in deleting image file" });
        }
        return res.status(200).json({
          status: true,
          message: "Book Deleted Successfully",
          data: response,
        });
      });
    }
  } catch (error) {
    console.log("error in deleting book", error);
    return res
      .status(500)
      .json({ status: false, message: "error in deleting data" });
  }
};
export const searchBook = async (req, res) => {
  try {
    const regex = req.params.user;

    const bookData = await Books.find({
      $or: [
        {
          title: {
            $regex: ".*" + regex + ".*",
            $options: "i",
          },
        },
        {
          author: {
            $regex: ".*" + regex + ".*",
            $options: "i",
          },
        },
      ],
    });
    if (bookData) {
      return res
        .status(200)
        .json({ status: true, message: "Book Found", data: bookData });
    }
  } catch (error) {
    console.log("error in searching books", error);
    return res
      .status(500)
      .json({ status: false, message: "error in finding books" });
  }
};
