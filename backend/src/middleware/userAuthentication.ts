import { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken";
import { MyJwtPayload } from "../types/jwt";


function authentication(req: Request, res: Response, next: NextFunction){
            const {token} = req.headers;
            if(!token){
                return res.status(400).send({
                     msg : "token is missing",
                     success : false
                })
            }
            try{
                if(!process.env.JWT_SECRET_KEY){
                     throw new Error("missing jwt key");
                }

                const decode = jwt.verify(token as string, process.env.JWT_SECRET_KEY) as MyJwtPayload;

                     req.user_info = {
                         user_name : decode.firstName,
                         user_id : decode.id
                     }
                     next();
            }catch(err){
                return res.status(500).send({
                     msg : "user authentication failed",
                     success : false,
                     error : err
                })
            }
}

export default authentication;