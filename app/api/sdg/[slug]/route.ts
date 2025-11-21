import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { SDGGoal } from '@/models/SDGGoal.model';

export async function GET(
    request: Request,
    { params }: { params: { slug: string } }
) {
    try {
        await connectDB();

        const goal = await SDGGoal.findOne({ slug: params.slug })
            .select('-__v')
            .lean();

        if (!goal) {
            return NextResponse.json(
                { success: false, error: 'SDG goal not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: goal,
        });
    } catch (error) {
        console.error('Error fetching SDG goal:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch SDG goal' },
            { status: 500 }
        );
    }
}
