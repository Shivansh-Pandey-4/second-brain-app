declare namespace Express {
  export interface Request {
    user_info?: {
      user_name: string;
      user_id: string;
    };
  }
}