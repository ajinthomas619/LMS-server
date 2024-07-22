
import express from "express";
import dotenv from 'dotenv'
import authRouter from "../server/src/routes/authRoutes.js";
import orderRouter from "./src/routes/orderRoutes.js";
import booksRouter from "./src/routes/BookRoutes.js";
import userRouter from "./src/routes/userRoutes.js";
import cors from 'cors'
import session, {MemoryStore} from 'express-session';
import cookieParser from 'cookie-parser'
import http from 'http'



dotenv.config()
console.log('SESSION_SECRET_KEY:', process.env.SESSION_SECRET_KEY);

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(express.static('public/'))

const store = new MemoryStore()

app.use(
    cors({
      origin: "http://localhost:5173",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
    })
  );
app.use(
  session({

    secret: process.env.SESSION_SECRET_KEY,
     resave:false,
     saveUninitialized:false,
     cookie: {
      maxAge :30*24*60*60*1000,
      httpOnly : true,
     },
     store:store,
  })
)

const server = http.createServer(app)

app.use(express.urlencoded({extended:true}));
app.use('/api/auth',authRouter)
app.use('/api/order',orderRouter)
app.use('/api/books',booksRouter)
app.use('/api/user',userRouter)






export default app 
