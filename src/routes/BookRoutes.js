import express from "express"

import {
    addBook,
    showBooks,
    editBookData,
    deleteBook,
    searchBook,
    showBooksforUser
} from '../controllers/booksController.js'
import { uploadBooks } from "../utils/multer/multerBooks.js"

const booksRouter = express.Router()

booksRouter.post('/add-book',uploadBooks.single('file'),addBook)
booksRouter.get('/show-books',showBooks)
booksRouter.put('/edit-book/:id',editBookData)
booksRouter.delete('/delete-book/:id',deleteBook)
booksRouter.get('/search-book/:user',searchBook)
booksRouter.get('/show-books-for-user/:userId',showBooksforUser)

export default booksRouter