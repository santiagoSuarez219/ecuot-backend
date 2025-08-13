import mongoose from 'mongoose';
import colors from 'colors';
import { exit } from 'node:process';
import path from 'path';
import fs from 'fs';

import TimeStressOcurrence from '../models/TimeStressOcurrence'; 

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.DATABASE_URL)
        const url = `${connection.connection.host}:${connection.connection.port}`
        console.log(colors.magenta.bold(`MongoDB connected: ${url}`));
    } catch (error) {
        // console.log(error.message);
        console.log(colors.red.bold('Error connecting to MongoDB'));
        exit(1);
    }
}

// export const addHierarchies = async () => {
//     try {
    
//         const dataPath = path.join(process.cwd(), 'src','seed', 'timeStreessOccurrence.json');
//         const rawData = fs.readFileSync(dataPath, 'utf-8');
//         const hierarchies = JSON.parse(rawData);
//         await TimeStressOcurrence.deleteMany({});
//         await TimeStressOcurrence.insertMany(hierarchies);
//         console.log(colors.green.bold('✅ Intervenciones insertadas'));
//     } catch (error) {
//         console.error(error);
//         console.log(colors.red.bold('Error adding interventions'));
//         exit(1);
//     }
// }