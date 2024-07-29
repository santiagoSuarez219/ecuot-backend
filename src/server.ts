import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { corsConfig } from "./config/cors";
import { connectDB } from "./config/db";

import InterventionDataSheetRoutes from "./routes/InterventionDataSheetRoutes";
import interventionRoutes from "./routes/interventionRoutes";
import conflictRoutes from "./routes/ConflictRoutes";
import informationRoutes from "./routes/InformationRoutes";

import UserRoutes from "./routes/UserRoutes";
import NewsRoutes from "./routes/NewsRoutes";

dotenv.config();
connectDB();

const app = express();
app.use(cors(corsConfig));

app.use(express.json());

app.use("/api/information", informationRoutes);
app.use("/api/interventions", interventionRoutes);
app.use("/api/conflicts", conflictRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/intervention_datasheet", InterventionDataSheetRoutes);
app.use("/api/news", NewsRoutes);

export default app;
