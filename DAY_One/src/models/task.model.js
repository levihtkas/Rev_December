import mongoose from "mongoose"

const taskSchema = new mongoose.Schema(
  {
    title: {
      type:String,
      required:true,
      trim:true
    },
    completed:{
      type: Boolean,
      default:false
    },
    username:{
      type:String,
      trim:true
    }
  },
  {timestamps:true}
)

const UserSchema = new mongoose.Schema({
  username:{
    type:String,
    trim:true
  },
  tasks:[{type:mongoose.Schema.Types.ObjectId,ref:"Task"}]
})
export const Task = mongoose.model("Task",taskSchema)
export const User = mongoose.model("User",UserSchema)

