import mongoose from "mongoose";


const contentSchema = new mongoose.Schema({
        type : {
            type : String,
            enum : { 
                values : ["tweet","document","youtube","brainthought"],
                message : `invalid type is given`
            },
            lowercase : true,
            trim : true,
            required : true
        },

        link : {
            type : String,
            lowercase : true,
            trim : true,
            default : undefined
        },

        title : {
            type : String,
            required : true,
            minLength : 2,
            maxLength : 80,
            trim : true
        },

        tags : {
            type : String,
            lowercase : true,
            trim : true,
        },
        
        userId : {
                type : mongoose.Schema.Types.ObjectId,
                required : true,
                ref : "User"
            }

     },{timestamps : true})

const ContentModel = mongoose.model("Content",contentSchema);

export default ContentModel;