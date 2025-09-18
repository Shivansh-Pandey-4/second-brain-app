import { Router } from "express";
import authentication from "../middleware/userAuthentication";
import { shareSchema } from "../zod-validation/shareSchema";
import random from "../util/randomFun";
import ShareModel from "../models/shareModel";
const router = Router();


router.post("/brain/share", authentication, async(req,res)=>{
     const response = shareSchema.safeParse(req.body);
     if(!response.success){
        return res.status(400).send({
             msg : "invalid credential format",
             success : false,
             detailError : response.error.issues
        })
     }
      const {share} = req.body;
      if(!share){
          return res.status(200).send({
             msg : "share link is not generated",
             success : false,
          })
      }
      try{
         const hashStringExist = await ShareModel.findOne({userId : req.user_info?.user_id});
         
         if(hashStringExist){
            return res.status(400).send({
               msg : "failed to generate share link",
               success : false,
               detailError : "share link alread generated using this user"
            })
         }
         
           const salt = 10;
           const hashString = random(salt);
         
           const shareDb = await ShareModel.create({hash: hashString,userId: req.user_info?.user_id});

           return res.send({
               msg : "share string generated",
               success : true,
               hashString
           })

      }catch(err){
           return res.status(500).send({
             msg : "failed to generate share link",
             success : false,
             detailError : (err instanceof Error) ? err.message : err
           })
      }
});



export default router;