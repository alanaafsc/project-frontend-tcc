import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const revalidate = 1;
export const dynamic = 'force-dynamic';
export async function DELETE(request) {
  const requestBody = await request.text();
  const { id } = JSON.parse(requestBody);

  try {

    await sql`
    UPDATE projects
    SET current_phase_id = NULL
    WHERE current_phase_id = ${id};
  `;

    await sql`
        UPDATE Activities
        SET phase_id = NULL
        WHERE phase_id = ${id};
      `;

    const phaseResult = await sql`
      DELETE FROM Phases
      WHERE id = ${id}
      RETURNING *;
    `;

    return NextResponse.json({ phaseResult }, { status: 201 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error deleting phase' }, { status: 500 });
  }
}
