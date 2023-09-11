import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function DELETE(request) {
  const requestBody = await request.text();
  const { id } = JSON.parse(requestBody);

  try {
    // Exclua a atividade
    const activityResult = await sql`
      DELETE FROM Activities
      WHERE id = ${id}
      RETURNING *;
    `;

    return NextResponse.json({ activityResult }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error deleting activity' }, { status: 500 });
  }
}
