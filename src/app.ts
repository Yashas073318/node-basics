import express from "express";
import cors from "cors";
import tasksRouter from "./routes/tasks.js";
import healthRouter from "./routes/health.js";

export function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get("/", (_req, res) => {
    res.json({ message: "Welcome to the node-basics API" });
  });

  app.use("/health", healthRouter);
  app.use("/api/tasks", tasksRouter);

  app.use((req, res) => {
    res.status(404).json({ message: `Route ${req.path} not found` });
  });

  return app;
}
