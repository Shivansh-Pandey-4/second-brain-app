import zod from 'zod';

export const createContentSchema = zod.object({
     type : zod.literal(["tweet","document","youtube","brainthought"],{error : "does not include this type"}),
     link : zod.url({error : "invalid url type"}).optional(),
     title : zod.string().min(2,{error : "minimum 2 characters is required"}),
     tags : zod.string().optional()
})

export type RequestBodyContent = zod.infer<typeof createContentSchema>;