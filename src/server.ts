import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { corsConfig } from "./config/cors";
import { connectDB } from "./config/db";
import interventionRoutes from "./routes/interventionRoutes";
import InterventionDataSheetRoutes from "./routes/InterventionDataSheetRoutes";
import conflictRoutes from "./routes/ConflictRoutes";
import UserRoutes from "./routes/UserRoutes";

dotenv.config();
connectDB();

const app = express();
app.use(cors(corsConfig));

app.use(express.json());

app.use("/api/interventions", interventionRoutes);
app.use("/api/conflicts", conflictRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/intervention_datasheet", InterventionDataSheetRoutes);

export default app;
