import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function PUT(request) {
  const requestBody = await request.text();
  const { id, name, description, currentPhaseId, phasesToAdd } = JSON.parse(requestBody);

  try {

    // Atualize o projeto
    const projectResult = await sql`
      UPDATE Projects
      SET name = ${name}, description = ${description}, current_phase_id = ${currentPhaseId}
      WHERE id = ${id}
      RETURNING *;
    `;

    // Atualize as fases relacionadas ao projeto
    if (phasesToAdd && phasesToAdd.length > 0) {
      await sql`
        UPDATE Phases
        SET project_id = ${id}
        WHERE id IN (${phasesToAdd});
      `;
    }

    return NextResponse.json({ projectResult }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error editing project' }, { status: 500 });
  }
}
