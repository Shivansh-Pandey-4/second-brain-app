import * as express from 'express';

declare global {
    namespace Express {
        interface Request {
             user_info ?: {
                user_name : string;
                user_id : string;
             }
        }
    }
}