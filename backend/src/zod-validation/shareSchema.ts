import zod from "zod";

export const shareSchema = zod.object({
    share : zod.boolean({error : "only boolean value is allowed"})
})

