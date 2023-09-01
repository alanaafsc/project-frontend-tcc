import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const requestBody = await request.text(); // Lê o corpo da solicitação como texto
  const { name, description, currentPhaseId, phasesToAdd } = JSON.parse(requestBody);
  const parsedCurrentPhaseId = currentPhaseId !== '' ? parseInt(currentPhaseId) : null;

  try {
    // Adicione o projeto
    const projectResult = await sql`
      INSERT INTO Projects (name, description, current_phase_id)
      VALUES (${name}, ${description}, ${parsedCurrentPhaseId})
      RETURNING *;
    `;

    if (projectResult && projectResult.rows[0]) {
      const newProject = projectResult.rows[0];
      const projectId = newProject.id;

      // Adicione as fases associadas ao projeto
      for (const phaseName of phasesToAdd) {
        await sql`
            INSERT INTO Phases (name, project_id)
            VALUES (${phaseName}, ${projectId});
        `;
      }
      // Retorne o novo projeto criado
      return NextResponse.json({ newProject }, { status: 201 });
    } else {
      console.error('Error inserting project into database or retrieving new project data');
      return NextResponse.json({ error: 'Error adding project' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error inserting project into database:', error);
    return NextResponse.json({ error: 'Error adding project' }, { status: 500 });
  }
}
