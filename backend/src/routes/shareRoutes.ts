import { Router } from "express";
import authentication from "../middleware/userAuthentication.js";
import { shareSchema } from "../zod-validation/shareSchema.js";
import random from "../util/randomFun.js";
import ShareModel from "../models/shareModel.js";
import ContentModel from "../models/contentModel.js";
const router = Router();


router.post("/brain/share", authentication, async(req,res)=>{
     const response = shareSchema.safeParse(req.body);
     if(!response.success){
        return res.status(400).json({
             success : false,
             msg : "invalid credential format",
             detailError : response.error.issues[0]?.message
        })
     }

      const {share} = response.data;

      try{
         if(!share){
         const hashStringExist = await ShareModel.findOne({userId : req.user_info?.user_id});
           
           if(!hashStringExist){
              return res.status(400).json({
                 msg : "bad request",
                 success : false,
                 detailError : "share link does not exist already"
              })
           }

           const deleteShareLink = await ShareModel.findOneAndDelete({userId : req.user_info?.user_id});

           if(!deleteShareLink){
               throw new Error("failed to delete the share link");
           }

           return res.json({
              success : true,
              msg : "share link is deleted successfully"
           })
      }else{
         const hashStringExist = await ShareModel.findOne({userId : req.user_info?.user_id});
         
         if(hashStringExist){
            return res.status(200).json({
               success : true,
               msg : "user have already one",
               hashString : hashStringExist.hash
            })
         }
         
         const salt = 10;
         const hashString = random(salt);
         
         const shareDb = await ShareModel.create({hash: hashString,userId: req.user_info?.user_id});
         
         return res.json({
            success : true,
            msg : "share link generated successfully",
            hashString
         })
      }
         
      }catch(err){
         return res.status(500).json({
            success : false,
            msg : "some issue occurred",
            detailError : (err instanceof Error) ? err.message : err
         })
      }
});

router.get("/brain/:shareString", async(req,res)=>{
    const {shareString} = req.params;

   const prefix = (process.env.MY_PLATEFORM_PREFIX || "").trim();

  if (!shareString.startsWith(prefix)) {
    return res.status(400).json({
       success: false,
      msg: "invalid share link",
      detailError: "share link is not correct type"
    });
  }

    try{
        const shareLinkExist = await ShareModel.findOne({hash : shareString});
        if(!shareLinkExist){
           return res.status(400).json({
              success : false,
                msg : "invalid share link provided",
                detailError : "no user found with this share link"
           })
        }
        
        const userContent = await ContentModel.find({ userId: shareLinkExist.userId}).populate({path: "userId", select: "firstName"});

        if(userContent.length === 0){
           return res.json({
             success : true,
             msg : "second brain of share user's link is empty",
             userContent
           })
        }

        return res.json({
           success : true,
           msg : "second brain found successfully",
           userContent
        })

    }catch(err){
        return res.status(500).json({
           success : false,
             msg : "failed to /GET data",
             detailError : (err instanceof Error) ? err.message : "something went wrong"
        })
    }
})

export default router;