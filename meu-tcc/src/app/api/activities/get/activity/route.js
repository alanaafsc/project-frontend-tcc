import { sql } from '@vercel/postgres';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const activityId = searchParams.get('activity'); // Obter o phaseId da query

  try {
    const activity = await sql`
      SELECT * FROM activities
      WHERE id = ${activityId};
    `;

    return NextResponse.json({ activity }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
