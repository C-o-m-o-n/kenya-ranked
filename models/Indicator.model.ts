import mongoose, { Schema, Model } from 'mongoose';

export interface ITrendPoint {
    year: number;
    value: number;
}

export interface IComparisonData {
    country: string;
    value: number;
}

export interface IIndicator {
    id: string;
    name: string;
    slug: string;
    category: string;
    description: string;
    year: number;
    score: number;
    rank: number;
    totalCountries: number;
    trend: 'up' | 'down' | 'neutral';
    trendData: ITrendPoint[];
    regionalComparisons: IComparisonData[];
    source: string;
    sourceUrl: string;
    methodology: string;
    unit?: string;
    higherIsBetter: boolean;
    lastUpdated: Date;
}

const TrendPointSchema = new Schema<ITrendPoint>({
    year: { type: Number, required: true },
    value: { type: Number, required: true },
});

const ComparisonDataSchema = new Schema<IComparisonData>({
    country: { type: String, required: true },
    value: { type: Number, required: true },
});

const IndicatorSchema = new Schema<IIndicator>(
    {
        id: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true, index: true },
        category: { type: String, required: true, index: true },
        description: { type: String, required: true },
        year: { type: Number, required: true },
        score: { type: Number, required: true },
        rank: { type: Number, required: true },
        totalCountries: { type: Number, required: true },
        trend: { type: String, enum: ['up', 'down', 'neutral'], required: true },
        trendData: [TrendPointSchema],
        regionalComparisons: [ComparisonDataSchema],
        source: { type: String, required: true },
        sourceUrl: { type: String, required: true },
        methodology: { type: String, required: true },
        unit: { type: String },
        higherIsBetter: { type: Boolean, required: true },
        lastUpdated: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    }
);

// Create indexes for better query performance
IndicatorSchema.index({ category: 1, year: -1 });
IndicatorSchema.index({ name: 'text', description: 'text' });

export const Indicator: Model<IIndicator> =
    mongoose.models.Indicator || mongoose.model<IIndicator>('Indicator', IndicatorSchema);
