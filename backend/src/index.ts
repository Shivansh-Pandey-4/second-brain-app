import  express, { NextFunction } from 'express';
import mongoose from 'mongoose';
import  'dotenv/config';
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import shareRouter from "./routes/shareRoutes.js";
import contentRouter from "./routes/contentRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

const connectDb = async()=>{
    try{
        if(process.env.MONGO_DB_CONN){
             await mongoose.connect(process.env.MONGO_DB_CONN);
             console.log("connected to database successfully");
             app.listen(PORT,()=>{
                  console.log(`app started listening on the port ${PORT}`);
             })
        }else {
            throw new Error("cannot find database connection string");
        }
    }catch(err){
         console.log(`failed to connect to database : `,err);
    }
}

connectDb();

app.use(cors());
app.use(express.json());
app.use("/api/v1",userRouter);
app.use("/api/v1/",contentRouter);
app.use("/api/v1/",shareRouter);


app.get("/", (req, res)=>{
    return res.json({
        success : true,
        msg : "hello world "
    })
})