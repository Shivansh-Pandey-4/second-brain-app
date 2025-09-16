import { Request, Response, Router } from "express";
import { createContentSchema, RequestBodyContent } from "../zod-validation/contentSchema";
import ContentModel from "../models/contentModel";
import authentication from "../middleware/userAuthentication";
import mongoose from "mongoose";

const router = Router();

router.post("/content", authentication, async(req: Request<{},{},RequestBodyContent,{}>, res: Response)=>{
     const response = createContentSchema.safeParse(req.body);
     if(!response.success){
         return res.status(400).send({
             msg : "invalid credential type",
             success : false,
             detailError : response.error.issues
         })
     }

     try{
          const {title,type,link,tags} = req.body;
          const addNewContent = await ContentModel.create({title,type,link,tags,userId: req.user_info?.user_id});

          return res.send({
             msg : "new content added successfully",
             content : addNewContent,
             success : true
          })
     }catch(err){
        return res.status(500).send({
             msg : "failed to add content",
             success : false,
             detailError : err
        })
     }
});

router.get("/content", authentication, async(req,res)=>{
     try{
          const allContent = await ContentModel.find({userId : req.user_info?.user_id}).populate({path : "userId", select: "firstName"});

          if(allContent.length !==0){
                return res.send({
                     msg : "user contents found successfully",
                     success : true,
                     contents : allContent
                })
          } else {
                return res.send({
                     msg : "user second brain is empty currently",
                     success : true,
                     contents : allContent
                })
          }
     }catch(err){
               return res.status(500).send({
                    msg : "failed to find the contents",
                    success : false,
                    detailError : err instanceof Error ? err.message : err
               })
          }
});


router.delete("/content/:contentId", authentication, async (req: Request<{ contentId: string }>, res: Response) => {

    const { contentId } = req.params;

    if (!contentId) {
      return res.status(400).json({
        msg: "Invalid DELETE request",
        success: false,
        detailError: "Request param `contentId` is missing",
      });
    }

    if (!mongoose.isValidObjectId(contentId)) {
      return res.status(400).json({
        msg: "Invalid contentId",
        success: false,
        detailError: "Provided contentId is not a valid ObjectId",
      });
    }

    try {
      const deletedContent = await ContentModel.findOneAndDelete({_id : contentId});

      if (!deletedContent) {
        return res.status(404).json({
          msg: "Content not found",
          success: false,
          detailError: "No content with the provided contentId",
        });
      }

      return res.json({
        msg: "Content deleted successfully",
        success: true,
        content: deletedContent,
      });

    } 
    catch (err) {
      return res.status(500).json({
        msg: "Failed to delete content",
        success: false,
        detailError: err instanceof Error ? err.message : err,
      });
    }
});






export default router;