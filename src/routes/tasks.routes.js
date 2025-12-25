import express from "express";
import {
  createTask,
  readTask,
  updateTask,
  deleteTask
} from "../controllers/task.controller.js";

const router = express.Router();

router.post("/", createTask);
router.get("/", readTask);
router.patch("/:taskId", updateTask);
router.delete("/:taskId", deleteTask);

export default router;
