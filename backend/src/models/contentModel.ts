import mongoose from "mongoose";


const contentSchema = new mongoose.Schema({
        type : {
            type : String,
            enum : { 
                values : ["tweet","document","link","youtube","random","brain_Thought"],
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
            trim : true
        },

        tags : {
            type : [String],
            lowercase : true,
            trim : true,
            default : []
        }

     },{timestamps : true})

const ContentModel = mongoose.model("Content",contentSchema);

export default ContentModel;