import { NextResponse } from 'next/server'
import { fetchAndStoreNews } from '@/utils/newsFetcher'

async function handleCronRequest(request: Request) {
    try {
        const authHeader = request.headers.get('authorization');
        
        if (
            process.env.CRON_SECRET && 
            authHeader !== `Bearer ${process.env.CRON_SECRET}` &&
            authHeader !== process.env.CRON_SECRET
        ) {
            console.warn('Unauthorized cron execution attempt');
            return NextResponse.json({ error: 'Unauthorized cron execution' }, { status: 401 });
        }

        const result = await fetchAndStoreNews();
        return NextResponse.json(result);
    } catch (error: any) {
        console.error('Cron job failed:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(request: Request) {
    return handleCronRequest(request);
}

export async function POST(request: Request) {
    return handleCronRequest(request);
}
