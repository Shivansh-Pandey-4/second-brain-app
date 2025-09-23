import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minlength : 2,
    },
    email : {
        type : String,
        required : true,
        trim : true,
        toLowerCase : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        minLength : 6,
        trim : true
    }
})

const UserModel = mongoose.model("User",userSchema);

export default UserModel;
