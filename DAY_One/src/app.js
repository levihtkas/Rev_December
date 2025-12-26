import express from "express"
import cors from "cors"
import taskRoutes from "./routes/tasks.routes.js"
import { errorHandler } from "./middlewares/error.middleware.js";

app.use(errorHandler);

const app = express();

app.use(cors());

app.use(express.json())

app.use("/api/tasks",taskRoutes)

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});
export default app;
