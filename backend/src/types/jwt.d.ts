import { JwtPayload as DefaultJwtPayload } from "jsonwebtoken";

export interface MyJwtPayload extends DefaultJwtPayload {
        name : string;
        id : string;
}