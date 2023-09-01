import { sql } from '@vercel/postgres';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  console.log(searchParams);
  const projectId = searchParams.get('projectId'); // Obter o phaseId da query
  console.log('projectId, ', projectId);
  try {
    const phases = await sql`
      SELECT * FROM Phases
      WHERE project_id = ${projectId};
    `;

    return NextResponse.json({ phases }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}



