import mongoose, { Schema, Model } from 'mongoose';

export interface ISDGIndicator {
    id: string;
    name: string;
    value: number;
    target: number;
    unit: string;
    year: number;
    progress: number;
}

export interface ISDGGoal {
    number: number;
    title: string;
    slug: string;
    description: string;
    color: string;
    icon: string;
    progress: number;
    status: 'on-track' | 'moderate' | 'off-track' | 'insufficient-data';
    indicators: ISDGIndicator[];
    lastUpdated: Date;
}

const SDGIndicatorSchema = new Schema<ISDGIndicator>({
    id: { type: String, required: true },
    name: { type: String, required: true },
    value: { type: Number, required: true },
    target: { type: Number, required: true },
    unit: { type: String, required: true },
    year: { type: Number, required: true },
    progress: { type: Number, required: true },
});

const SDGGoalSchema = new Schema<ISDGGoal>(
    {
        number: { type: Number, required: true, unique: true, min: 1, max: 17 },
        title: { type: String, required: true },
        slug: { type: String, required: true, unique: true, index: true },
        description: { type: String, required: true },
        color: { type: String, required: true },
        icon: { type: String, required: true },
        progress: { type: Number, required: true, min: 0, max: 100 },
        status: {
            type: String,
            enum: ['on-track', 'moderate', 'off-track', 'insufficient-data'],
            required: true,
        },
        indicators: [SDGIndicatorSchema],
        lastUpdated: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    }
);

export const SDGGoal: Model<ISDGGoal> =
    mongoose.models.SDGGoal || mongoose.model<ISDGGoal>('SDGGoal', SDGGoalSchema);
