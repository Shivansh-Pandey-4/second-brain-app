import zod from 'zod';

export const userSignupSchema = zod.object({
     name : zod.string().trim().min(2,{message: "minimum 2 words required"}),

     email : zod.preprocess((val) => typeof val === "string" ? val.trim() : val, zod.email({message : "incorrect email type"})),

     password : zod.string().trim().min(6,{message : "minimum 6 digits required"}).max(30,{message : "maximum 30 digit is allowed"})
});

export const userSigninSchema = userSignupSchema.pick({email : true, password: true});

export type RequestSignupBody = zod.infer<typeof userSignupSchema>;
export type RequestSigninBody = zod.infer<typeof userSigninSchema>;


