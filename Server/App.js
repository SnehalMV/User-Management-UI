import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRouter from "./routes/user"
import adminRouter from "./routes/admin"
import db from './utils/connection'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended:false }))
app.use(morgan("dev"))
app.use(cors({
  origin:'http://localhost:3000',
  credentials: true
}))

db()

app.use(cookieParser())
app.use('/', userRouter)
app.use('/admin',adminRouter)


app.listen(4000 ,() => {console.log("Connected to server");})