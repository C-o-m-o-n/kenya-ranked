import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Indicator } from '@/models/Indicator.model';

export async function GET(
    request: Request,
    { params }: { params: { slug: string } }
) {
    try {
        await connectDB();

        const indicator = await Indicator.findOne({ slug: params.slug })
            .select('-__v')
            .lean();

        if (!indicator) {
            return NextResponse.json(
                { success: false, error: 'Indicator not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: indicator,
        });
    } catch (error) {
        console.error('Error fetching indicator:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch indicator' },
            { status: 500 }
        );
    }
}
