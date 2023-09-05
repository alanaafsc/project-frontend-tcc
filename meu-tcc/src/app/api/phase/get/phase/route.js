import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const phaseId = searchParams.get('phaseId');
    try {
        const phase = await sql`
            SELECT * FROM phases
            WHERE id = ${phaseId};
            `;

        return NextResponse.json({ phase }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}