import express from 'express'

import {
    createUser,
    loginUser,
    logout,
    refreshToken
} from '../controllers/authController.js'

const authRouter = express.Router() 

authRouter.post('/login',loginUser)
authRouter.post('/signup',createUser)
authRouter.post('/logout',logout)
authRouter.post('/refresh',refreshToken)

export default authRouter