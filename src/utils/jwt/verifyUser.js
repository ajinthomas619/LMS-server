
import {createAaccessToken} from "./jwt"
const jwt = require('jsonwebtoken')


export const verifyUser = (req,res,next) => {
    const userAccessToken = req.cookies.user_accessToken
    const userRefreshToken = req.cookies.user_refreshToken

    if(!userRefreshToken) {
        return res.status(401).json({message: "Refresh Token Not Found"})
    }
    jwt.verify(
        userAccessToken,process.env.ACCESS_SECRET_KEY || "",
        (err,decoded) => {
            if(err){
                if(err.name === "TokenExpiredError" || err.name === "JsonWebTokenError"
                    && userRefreshToken){
                        jwt.verify(
                            userRefreshToken,
                            process.env.REFRESH_SECRET_KEY || "",
                            (errRefresh,decodeRefresh) => {
                                if(errRefresh){
                                    return res.status(401).json({message: "invalid refresh token"})
                                } 
                              const user = decodeRefresh.user
                               const newAccessToken = createAaccessToken(
                                user, process.env.ACCESS_SECRET_KEY || "",
                                "15m"
                               )
                               res.cookie("accessToken",newAccessToken,{
                                maxAge: 300000,
                                httpOnly: false,
                                secure: true,
                                sameSite: "strict",
                               })
                               req.user = user
                               next()
                            }
                        )
                    } else{
                        return res.status(401).json({
                            status:false,
                            message:"Unauthorized  - no token provided"
                        })
                    }
            }
            else {
                const decodedUser = decoded.user
                req.user = decodedUser
                next()
            }
        }
    )
}