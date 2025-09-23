import zod from 'zod';

export const userSignupSchema = zod.object({
     name : zod.string().min(2,{message: "minimum 2 words required"}),
     email : zod.string().email({message : "invalid email type"}),
     password : zod.string().min(6,{message : "minimum 6 digits required"}).max(30,{message : "maximum 30 digit is allowed"})
});

export const userSigninSchema = zod.object({
     email : zod.string().email({message : "invalid email type"}),
     password : zod.string().min(6,{message: "minimum 6 digit is required"}).max(30,{message : "maximum 30 digit is allowed"})
})

export type RequestSignupBody = zod.infer<typeof userSignupSchema>;
export type RequestSigninBody = zod.infer<typeof userSigninSchema>;


