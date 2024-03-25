import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { corsConfig } from "./config/cors";
import { connectDB } from "./config/db";
import interventionRoutes from "./routes/interventionRoutes";
import conflictRoutes from "./routes/ConflictRoutes";

dotenv.config();
connectDB();

const app = express();
app.use(cors(corsConfig));

app.use(express.json());

app.use("/api/interventions", interventionRoutes);
app.use("/api/conflicts", conflictRoutes);

export default app;
