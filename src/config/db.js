import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

export const connectDB = async() =>{
  try{
    await mongoose.connect(process.env.MONGOSE_CONNECT_URL)
    console.log("DB connected")
  } catch(e){
    console.error("DB connection failed");
  }
}