import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
   username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    profilePicture:{
        type:String,
        default:"https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",

    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    
  },
    { timestamps: true }

);

const User = mongoose.model('User', userSchema);

export default User;


