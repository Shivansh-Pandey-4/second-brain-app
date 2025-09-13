import express from 'express';
import mongoose from 'mongoose';
import userRouter from "./routes/userRoutes";

const app = express();
const port = 3000;

async function connectDb(){
     try{
        await mongoose.connect("mongodb+srv://shivanshofficial8750:8750776958@cluster0.samyw.mongodb.net/SecondBrain-Application");

        console.log(`connected to db successfully`);

        app.listen(port,()=>{
            console.log(`app started listening on the port ${port}`);
        })

     }catch(error){
         console.log(`failed to connect to db: `,error);
     }
}

connectDb();

app.use(express.json());
app.use("/user",userRouter);

app.get("/",(req,res)=>{
     return res.send({
        msg : "hello world",
        success : true
     })
})

