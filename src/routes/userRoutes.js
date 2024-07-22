import express from 'express'

import {
    getUserById,
    editUserProfile,
    addProfileImage,
    searchUser,
    getAllUsers
} from '../controllers/userController.js'

const userRouter = express.Router()
userRouter.get(`/get-user/:id`,getUserById)
userRouter.put(`/edit-user/:id`,editUserProfile)
userRouter.put(`/add-profile-image`,addProfileImage)
userRouter.get(`/search-user/:user`,searchUser)
userRouter.get('/getAllUsers',getAllUsers)

export default userRouter