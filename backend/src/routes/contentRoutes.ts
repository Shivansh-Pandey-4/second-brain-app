import { Request, Response, Router } from "express";
import { contentFilterSchema, createContentSchema, RequestBodyContent } from "../zod-validation/contentSchema.js";
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
             error : response.error.issues
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
             error : err instanceof Error ? err.message : "something went wrong"
        })
     }
});


router.get("/content", authentication, async(req: Request<{}, {}, {}, {filter ?: string; search ?:string; page ?: string; limit ?: string;}>, res: Response)=>{

    const requestedPage = parseInt(req.query.page || "1");
    const requestedLimit = parseInt(req.query.limit || "5");
    const filter = req.query.filter;
    const search = req.query.search;

    const page = (Number.isNaN(requestedPage) || requestedPage < 1 ) ? 1 : requestedPage;
    const limit = (Number.isNaN(requestedLimit) || requestedLimit < 1) ? 5 : Math.min(requestedLimit, 3);
    
    const skip = (page - 1) * limit;
    
    const result = contentFilterSchema.safeParse({type: filter?.trim()});

    if(!result.success){
        return res.status(400).json({
          success : false,
          msg : "invalid filter type provided",
          error : result.error.issues[0]?.message
        })
    }


     try{

         const filter = result.data;
         const query: {type?: string; userId: string; title?: {$regex: string; $options: string;}} = 
         {
          userId: req.user_info?.user_id!
        } 

         if(filter.type !== "home"){
          query.type = filter.type;
         }

         if(search){
            query.title = {
               $regex : search,
               $options : "i"
            };
         }


          const totalDocument = await ContentModel.countDocuments(query);
          const totalPage = Math.ceil(totalDocument / limit);

          if((totalDocument > 0 && page > totalPage)){
            return res.status(404).json({
              success : false,
              msg : "page does not exit"
            })
          }

          const allContent = await ContentModel
           .find(query)
           .sort({'createdAt' : -1})
           .skip(skip)
           .limit(limit)
           .populate({path : "userId", select: "firstName"});

          if(allContent.length !==0){
                return res.json({
                     success : true,
                     msg : "user contents found successfully",
                     contents : allContent,
                     pagination : {
                        currentPage : page,
                        totalPage : totalPage,
                        limit : limit,
                        totalDocument : totalDocument
                     }
                })
          } else {
                return res.json({
                     success : true,
                     msg : "user second brain is empty currently",
                     contents : allContent,
                     pagination : {
                        currentPage : page,
                        totalPage : totalPage,
                        limit : limit,
                        totalDocument : totalDocument
                     }
                })
          }
     }catch(err){
               return res.status(500).json({
                    success : false,
                    msg : "failed to find the contents",
                    error : err instanceof Error ? err.message : err
               })
          }
});


router.delete("/content/:contentId", authentication, async (req: Request<{ contentId ?: string }>, res: Response) => {

    const { contentId } = req.params;

    if (!contentId) {
      return res.status(400).json({
        success: false,
        msg: "Invalid DELETE request",
        error: "Request param `contentId` is missing",
      });
    }

    if (!mongoose.isValidObjectId(contentId)) {
      return res.status(400).json({
        success: false,
        msg: "Invalid contentId",
        error: "Provided contentId is not a valid ObjectId",
      });
    }

    try {
      const deletedContent = await ContentModel.findOneAndDelete({_id : contentId, userId : req.user_info?.user_id});

      if (!deletedContent) {
        return res.status(404).json({
          success: false,
          msg: "Content not found",
          error: "No content with the provided contentId",
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
        error: err instanceof Error ? err.message : err,
      });
    }
});



export default router;