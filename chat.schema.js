import mongoose from "mongoose";
const chatSchema=new mongoose.Schema({
    username:String,
    message:String,
    timestamp:date
});
export const chatModel=mongoose.chatSchema("chat",chatSchema)