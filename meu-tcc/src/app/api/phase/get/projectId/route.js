import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    try {
    
        const phases = await sql`
        SELECT * FROM phases
        WHERE project_id = ${projectId};
        `;

        return NextResponse.json({ phases }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
