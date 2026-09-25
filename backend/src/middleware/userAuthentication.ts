import { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { MyJwtPayload } from "../types/jwt.js";


function authentication(req: Request, res: Response, next: NextFunction){
            const token = req.headers?.token;
            if(!token){
                return res.status(400).json({
                    success : false,
                     msg : "jwt token not provided"
                })
            }
            try{
                if(!process.env.JWT_SECRET_KEY){
                     throw new Error("missing jwt key");
                }

                const decode = jwt.verify(token as string, process.env.JWT_SECRET_KEY) as MyJwtPayload;

                     req.user_info = {
                         user_name : decode.name,
                         user_id : decode.id
                     }
                     next();
            }catch(err){
                return res.status(500).json({
                     success : false,
                     msg : "user authentication failed",
                     error : err instanceof Error ? err.message : "something went wrong"
                })
            }
}

export default authentication;