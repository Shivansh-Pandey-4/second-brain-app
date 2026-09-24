import { Request, Response, Router } from "express";
import { createContentSchema, RequestBodyContent } from "../zod-validation/contentSchema.js";
import ContentModel from "../models/contentModel.js";
import authentication from "../middleware/userAuthentication.js";
import mongoose from "mongoose";

const router = Router();

router.post("/content", authentication, async(req: Request<{},{},RequestBodyContent,{}>, res: Response)=>{
     const response = createContentSchema.safeParse(req.body);
     if(!response.success){
         return res.status(400).json({
           success : false,
             msg : "invalid credential type",
             detailError : response.error.issues
         })
     }

     try{
          const {title, type, link, tags} = response.data;

          const addNewContent = await ContentModel.create({title,type,link,tags,userId: req.user_info?.user_id});

          return res.json({
            success : true,
             msg : "new content added successfully",
             content : addNewContent
          })

     }catch(err){
        return res.status(500).json({
             success : false,
             msg : "failed to add content",
             detailError : err instanceof Error ? err.message : "something went wrong"
        })
     }
});

router.get("/content", authentication, async(req,res)=>{
     try{
          const allContent = await ContentModel.find({userId : req.user_info?.user_id}).populate({path : "userId", select: "firstName"});

          if(allContent.length !==0){
                return res.json({
                     success : true,
                     msg : "user contents found successfully",
                     contents : allContent
                })
          } else {
                return res.json({
                     success : true,
                     msg : "user second brain is empty currently",
                     contents : allContent
                })
          }
     }catch(err){
               return res.status(500).json({
                    success : false,
                    msg : "failed to find the contents",
                    detailError : err instanceof Error ? err.message : err
               })
          }
});


router.delete("/content/:contentId", authentication, async (req: Request<{ contentId ?: string }>, res: Response) => {

    const { contentId } = req.params;

    if (!contentId) {
      return res.status(400).json({
        success: false,
        msg: "Invalid DELETE request",
        detailError: "Request param `contentId` is missing",
      });
    }

    if (!mongoose.isValidObjectId(contentId)) {
      return res.status(400).json({
        success: false,
        msg: "Invalid contentId",
        detailError: "Provided contentId is not a valid ObjectId",
      });
    }

    try {
      const deletedContent = await ContentModel.findOneAndDelete({_id : contentId});

      if (!deletedContent) {
        return res.status(404).json({
          success: false,
          msg: "Content not found",
          detailError: "No content with the provided contentId",
        });
      }

      return res.json({
        success: true,
        msg: "Content deleted successfully",
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