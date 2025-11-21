import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Indicator } from '@/models/Indicator.model';

export async function GET(request: Request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const search = searchParams.get('search');

        let query: any = {};

        if (category && category !== 'all') {
            query.category = category;
        }

        if (search) {
            query.$text = { $search: search };
        }

        const indicators = await Indicator.find(query)
            .select('-__v')
            .sort({ year: -1, name: 1 })
            .lean();

        return NextResponse.json({
            success: true,
            data: indicators,
            count: indicators.length,
        });
    } catch (error) {
        console.error('Error fetching indicators:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch indicators' },
            { status: 500 }
        );
    }
}
