import multer from "multer"

const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        return cb(null,"public/books/")
    },
    filename:(req,file,cb) => {
        console.log("img",file,"image details")
        cb(null,Date.now() + file.originalname)
    }
})

export const uploadBooks = multer({
    storage:storage
})