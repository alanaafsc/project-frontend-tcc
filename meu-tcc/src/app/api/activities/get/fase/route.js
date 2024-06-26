import { sql } from '@vercel/postgres';
import { NextResponse, NextRequest } from 'next/server';

export const revalidate = 1;
export const dynamic = 'force-dynamic';
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const phaseId = searchParams.get('phaseId'); 

  try {
    const activity = await sql`
      SELECT * FROM activities
      WHERE phase_id = ${phaseId};
    `;

    return NextResponse.json({ activity }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
