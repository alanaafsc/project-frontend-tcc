import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function DELETE(request) {
  const requestBody = await request.text();
  const { id } = JSON.parse(requestBody);

  try {
     // Limpe as referências das fases associadas ao projeto
     await sql`
     UPDATE Phases
     SET project_id = NULL
     WHERE project_id = ${id};
   `;

    // Exclua o projeto
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
