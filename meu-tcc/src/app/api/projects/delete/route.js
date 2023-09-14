import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const revalidate = 1;
export const dynamic = 'force-dynamic';
export async function DELETE(request) {
  const requestBody = await request.text();
  const { id } = JSON.parse(requestBody);

  try {
     await sql`
     UPDATE Phases
     SET project_id = NULL
     WHERE project_id = ${id};
   `;

    const projectResult = await sql`
      DELETE FROM Projects
      WHERE id = ${id}
      RETURNING *;
    `;

    return NextResponse.json({ projectResult }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error deleting project' }, { status: 500 });
  }
}
