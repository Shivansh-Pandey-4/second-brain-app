import { Request, Router } from "express";
import UserModel from "../models/userModel";
import { userSignupSchema, RequestSignupBody } from "../zod-validation/userSchemas";
import bcrypt from "bcrypt";

const router = Router();



export default router;