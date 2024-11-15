import mongoose from "mongoose"

export const connect=async()=>{
    await mongoose.connect("mongodb://localhost:27017/chatApp",{
        useNewUrlParser:True,
        useUnifiedTopology:True
    })
    console.log("db is connected")
    
}