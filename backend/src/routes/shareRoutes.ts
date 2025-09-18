import { Router } from "express";
import authentication from "../middleware/userAuthentication";
import { shareSchema } from "../zod-validation/shareSchema";
import random from "../util/randomFun";
import ShareModel from "../models/shareModel";
import ContentModel from "../models/contentModel";
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
      try{
         if(!share){
         const hashStringExist = await ShareModel.findOne({userId : req.user_info?.user_id});
           
           if(!hashStringExist){
              return res.status(400).send({
                 msg : "bad request",
                 success : false,
                 detailError : "share link does not exist already"
              })
           }

           const deleteShareLink = await ShareModel.findOneAndDelete({userId : req.user_info?.user_id});

           if(!deleteShareLink){
               throw new Error("failed to delete the share link");
           }

           return res.send({
              msg : "share link is deleted successfully",
              success : true
           })
      }else{
         const hashStringExist = await ShareModel.findOne({userId : req.user_info?.user_id});
         
         if(hashStringExist){
            return res.status(400).send({
               msg : "failed to generate share link",
               success : false,
               detailError : "share link already exist for this user"
            })
         }
         
         const salt = 10;
         const hashString = random(salt);
         
         const shareDb = await ShareModel.create({hash: hashString,userId: req.user_info?.user_id});
         
         return res.send({
            msg : "share link generated successfully",
            success : true,
            hashString
         })
      }
         
      }catch(err){
         return res.status(500).send({
            msg : "some issue occurred",
            success : false,
            detailError : (err instanceof Error) ? err.message : err
         })
      }
});

router.get("/brain/share/:shareString", async(req,res)=>{
    const {shareString} = req.params;

   const prefix = (process.env.MY_PLATEFORM_PREFIX || "").trim();

  if (!shareString.startsWith(prefix)) {
    return res.status(400).send({
      msg: "invalid share link",
      success: false,
      detailError: "share link is not correct type"
    });
  }

    try{
        const shareLinkExist = await ShareModel.findOne({hash : shareString});
        if(!shareLinkExist){
           return res.status(400).send({
                msg : "invalid share link provided",
                success : false,
                detailError : "no user found with this share link"
           })
        }
        
        const userContent = await ContentModel.find({ userId: shareLinkExist.userId}).populate({path: "userId", select: "firstName"});

        if(userContent.length === 0){
           return res.send({
             msg : "second brain of share user's link is empty",
             success : true,
             userContent
           })
        }

        return res.send({
           msg : "second brain found successfully",
           success : true,
           userContent
        })

    }catch(err){
        return res.status(500).send({
             msg : "failed to /GET data",
             success : false,
             detailError : (err instanceof Error) ? err.message : err
        })
    }
})

export default router;