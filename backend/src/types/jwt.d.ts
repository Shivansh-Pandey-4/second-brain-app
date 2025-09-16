import { JwtPayload as DefaultJwtPayload } from "jsonwebtoken";

export interface MyJwtPayload extends DefaultJwtPayload {
        firstName : string;
        id : string;
}