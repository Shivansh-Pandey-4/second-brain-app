import zod from 'zod';

export const userSignupSchema = zod.object({
     firstName : zod.string().min(2,{message: "minimum 2 words required"}),
     lastName : zod.string().min(2,{message : "minimum 2 words required"}).optional(),
     email : zod.string().email({message : "invalid email type"}),
     password : zod.string().min(6,{message : "minimum 6 digits required"}).max(30,{message : "maximum 30 digit is allowed"})
})

export type RequestSignupBody = zod.infer<typeof userSignupSchema>;


