import { Task, User } from "../models/task.model.js";


export const createTask = async(req,res,next)=>{
  try{
    const {title,username} = req.body;

    if(!title || !username){
      return res.status(400).json({message:"Title &username is required"})
    }
    const user= await User.findOneAndUpdate(
      {username},{username},{upsert:true,new:true}
    );
    const task = await Task.create({title,username:user.username})
    
    user.tasks.push(task._id)
    await user.save()
    res.status(200).json({message:"Task and User handled",task,user})
  } catch (err){
    next(err)
  }
}

export const readTask = async(req,res,next)=>{
  try{
    const {username} = req.body;
    const user = await User.findOne({username}).populate({path:'tasks',options:{sort:{createdAt:-1}}})
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if(user.tasks.length === 0){
      return res.status(400).send("Nothing is found")
    }

    return res.status(200).send(user.tasks)
  }catch(err){
    next(err);
  }
}


export const updateTask = async(req,res,next)=>{
  try{
    const {taskId} = req.params;
    const {title,completed} = req.body;
    
    const updatedTask = await Task.findByIdAndUpdate(taskId,{title,completed},{new:true,runValidators:true})
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask
    });
  } catch (err) {
    next(err);
  }
}

export const deleteTask = async (req,res,next)=>{
  const {taskId} = req.params;

  const task = await Task.findByIdAndDelete(taskId);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  await User.findOneAndUpdate(
    {username:task.username},
    {$pull:{tasks:taskId}}
  );

  res.status(200).json({ message: "Task deleted successfully" });
}