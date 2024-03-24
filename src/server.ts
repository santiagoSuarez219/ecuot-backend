import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import interventionRoutes from "./routes/interventionRoutes";
import conflictRoutes from "./routes/ConflicRoutes";

dotenv.config();
connectDB();
const app = express();

app.use(express.json());

app.use("/api/interventions", interventionRoutes);
app.use("/api/conflicts", conflictRoutes);

export default app;
