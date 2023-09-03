import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const phaseId = searchParams.get('phaseId');
    try {
        const projectId = await sql`
        SELECT project_id
        FROM phases
        WHERE id = ${phaseId};
        `;

        const phases = await sql`
        SELECT * FROM phases
        WHERE project_id = ${projectId.rows[0].project_id};
        `;

        return NextResponse.json({ phases }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
