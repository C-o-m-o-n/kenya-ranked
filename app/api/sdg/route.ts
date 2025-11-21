import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { SDGGoal } from '@/models/SDGGoal.model';

export async function GET() {
    try {
        await connectDB();

        const goals = await SDGGoal.find({})
            .select('-__v')
            .sort({ number: 1 })
            .lean();

        // Calculate overall SDG score
        const overallScore = goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length;

        return NextResponse.json({
            success: true,
            data: {
                goals,
                overallScore: Math.round(overallScore * 10) / 10,
            },
        });
    } catch (error) {
        console.error('Error fetching SDG goals:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch SDG goals' },
            { status: 500 }
        );
    }
}
