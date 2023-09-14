import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const revalidate = 1;
export const dynamic = 'force-dynamic';
export async function GET(request) {
  try {
    const users = await sql`SELECT * FROM Users;`;
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}