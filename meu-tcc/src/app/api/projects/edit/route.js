import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const revalidate = 1;
export const dynamic = 'force-dynamic';
export async function PUT(request) {
  const requestBody = await request.text();
  const { id, name, description, currentPhaseId, prazo_inicial, prazo_final, phasesToAdd } = JSON.parse(requestBody);

  try {

    const projectResult = await sql`
      UPDATE Projects
      SET name = ${name}, description = ${description}, current_phase_id = ${currentPhaseId}, prazo_inicial = ${prazo_inicial}, prazo_final = ${prazo_final}
      WHERE id = ${id}
      RETURNING *;
    `;

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
