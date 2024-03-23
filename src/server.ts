import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import interventionRoutes from './routes/interventionRoutes';

dotenv.config(); 
connectDB();
const app = express();

app.use(express.json());

app.use('/api/interventions', interventionRoutes);

export default app;