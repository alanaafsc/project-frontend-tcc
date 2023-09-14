import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const revalidate = 1;
export const dynamic = 'force-dynamic';
export async function GET(request) {
  try {
    const phases = await sql`SELECT * FROM Phases;`;
    return NextResponse.json({ phases }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}