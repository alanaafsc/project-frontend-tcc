import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function PUT(request) {
  const requestBody = await request.text();
  const { id, name, description, status, phase_id } = JSON.parse(requestBody);

  try {

    // Atualize a atividade
    const activityResult = await sql`
      UPDATE activities
      SET name = ${name}, description = ${description}, status = ${status}, phase_id = ${phase_id}
      WHERE id = ${id}
      RETURNING *;
    `;

    return NextResponse.json({ activityResult }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error editing activity' }, { status: 500 });
  }
}
