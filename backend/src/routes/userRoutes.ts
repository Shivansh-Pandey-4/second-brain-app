import type { Request } from "express"; 
import { Router } from "express";
import UserModel from "../models/userModel.js";
import { userSignupSchema, RequestSignupBody, RequestSigninBody, userSigninSchema } from "../zod-validation/userSchemas.js";
import  jsonwebtoken from "jsonwebtoken";
import  bcrypt from 'bcrypt'

const router = Router();


router.post("/signup", async(req: Request<{},{},RequestSignupBody,{}>, res)=>{
      const response = userSignupSchema.safeParse(req.body);
      if(!response.success){
          return res.status(409).json({
             success : false,
             msg : "invalid credentail format",
             error : response.error.issues
          })
      }
      try{

         const {name,email,password} = response.data;
         const userExist = await UserModel.findOne({email});
         if(userExist){
            return res.status(400).json({
                success : false,
                 msg : "email already taken"
            })
         } 

         const hashedPassword = await bcrypt.hash(password,10);
         const newUser = await UserModel.create({name,password: hashedPassword,email});

         return res.json({
            success : true,
            msg : "user signup successfull",
            userDetail : newUser
         })

      }catch(err){
          return res.status(500).json({
             success : false,
             msg : "failed to signup",
             error : err instanceof Error ? err.message : "something went wrong"
          })
      }
});

 router.post("/signin", async(req: Request<{},{},RequestSigninBody,{}>, res)=>{
        const response = userSigninSchema.safeParse(req.body);
        if(!response.success){
            return res.status(400).json({
                success : false,
                 msg : "invalid credential format",
                 error : response.error.issues
            })
        }
        try{
            const {email,password} = response.data;
            const userExist = await UserModel.findOne({email});
            if(!userExist){
                 return res.status(400).json({
                     success : false,
                     msg : "invalid email or password"
                 })
            }

            const validatePassword = await bcrypt.compare(password, userExist.password);
            if(!validatePassword){
                return res.status(400).json({
                     success : false,
                     msg : "invalid email or password"
                })
            }

            if(!process.env.JWT_SECRET_KEY){
                 throw new Error("JWT_SECRET_KEY is not defined in environment variables");
            }

            const token = jsonwebtoken.sign({id : userExist._id,firstName : userExist.name},process.env.JWT_SECRET_KEY,{expiresIn : '1hr'});

            return res.json({
                success : true,
                 msg : "user signedIn successfully",
                 token
            })
        }catch(err){
             return res.status(500).json({
                 success : false,
                 msg : "failed to signin",
                 error : err instanceof Error ? err.message : "something went wrong"
             })
        }
 });


export default router;