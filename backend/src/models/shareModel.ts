import mongoose from "mongoose";

const shareSchema = new mongoose.Schema({
    hash : {
        type : String,
        required : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User",
        unique : true
    }
});

const ShareModel = mongoose.model("Share",shareSchema);

export default ShareModel;