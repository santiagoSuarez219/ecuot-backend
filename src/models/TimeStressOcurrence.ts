import mongoose, { Schema, Document, Types } from "mongoose";

export interface ITimeStressOcurrence extends Document {
    systemName: string;
}

const TimeStressOcurrenceSchema = new Schema(
    {
        systemName: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
    },
    { timestamps: true }
);

const TimeStressOcurrence = mongoose.model<ITimeStressOcurrence>("TimeStressOcurrence", TimeStressOcurrenceSchema);

export default TimeStressOcurrence;