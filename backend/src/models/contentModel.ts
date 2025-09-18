import mongoose from "mongoose";


const contentSchema = new mongoose.Schema({
        type : {
            type : String,
            enum : { 
                values : ["tweet","document","link","youtube","random","brain thought"],
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
            type : [String],
            lowercase : true,
            trim : true,
            default : []
        },

        description : {
           type : String,
           trim : true,
           minLength : 10,
        },
        
        userId : {
                type : mongoose.Schema.Types.ObjectId,
                required : true,
                ref : "User"
            }

     },{timestamps : true})

const ContentModel = mongoose.model("Content",contentSchema);

export default ContentModel;