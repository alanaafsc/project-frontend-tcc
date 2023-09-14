import { sql } from '@vercel/postgres';
import { NextResponse, NextRequest } from 'next/server';

export const revalidate = 1;
export const dynamic = 'force-dynamic';
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get('projectId'); 

  try {
    const project = await sql`
      SELECT * FROM projects
      WHERE id = ${projectId};
    `;

    return NextResponse.json({ project }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}