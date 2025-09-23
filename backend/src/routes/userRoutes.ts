import { Request, Router } from "express";
import UserModel from "../models/userModel";
import { userSignupSchema, RequestSignupBody, RequestSigninBody, userSigninSchema } from "../zod-validation/userSchemas";
import  jsonwebtoken from "jsonwebtoken";
import  bcrypt from 'bcrypt'

const router = Router();


router.post("/signup", async(req: Request<{},{},RequestSignupBody,{}>, res)=>{
      const response = userSignupSchema.safeParse(req.body);
      if(!response.success){
          return res.status(409).send({
             msg : "invalid credentail format",
             detailError : response.error.issues
          })
      }
      try{

         const {name,email,password} = req.body;
         const userExist = await UserModel.findOne({email});
         if(userExist){
            return res.status(400).send({
                 msg : "duplicate email, failed to signup",
                 success : false
            })
         } 

         const hashedPassword = await bcrypt.hash(password,10);
         const newUser = await UserModel.create({name,password: hashedPassword,email});

         return res.send({
            msg : "user signup successfull",
            success : true,
            userDetail : newUser
         })

      }catch(err){
          return res.status(500).send({
             msg : "failed to signup",
             success : false,
             detailError : err
          })
      }
});

 router.post("/signin", async(req: Request<{},{},RequestSigninBody,{}>, res)=>{
        const response = userSigninSchema.safeParse(req.body);
        if(!response.success){
            return res.status(400).send({
                 msg : "invalid credential format",
                 success : false,
                 detailError : response.error.issues
            })
        }
        try{
            const {email,password} = req.body;
            const userExist = await UserModel.findOne({email});
            if(!userExist){
                 return res.status(400).send({
                     msg : "invalid email or password",
                     success : false
                 })
            }

            const validatePassword = await bcrypt.compare(password, userExist.password);
            if(!validatePassword){
                return res.status(400).send({
                     msg : "invalid email or password",
                     success : false
                })
            }

            if(!process.env.JWT_SECRET_KEY){
                 throw new Error("JWT_SECRET_KEY is not defined in environment variables");
            }

            const token = jsonwebtoken.sign({id : userExist._id,firstName : userExist.name},process.env.JWT_SECRET_KEY,{expiresIn : '1hr'});

            return res.send({
                 msg : "user signedIn successfully",
                 token,
                 success : true
            })
        }catch(err){
             return res.status(500).send({
                 msg : "failed to signin",
                 success : false,
                 detailError : err
             })
        }
 });


export default router;