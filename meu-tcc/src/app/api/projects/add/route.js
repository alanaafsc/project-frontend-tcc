import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const requestBody = await request.text(); // Lê o corpo da solicitação como texto
  const { name, description, currentPhaseId, prazo_inicial, prazo_final, phasesToAdd } = JSON.parse(requestBody);
  const parsedCurrentPhaseId = currentPhaseId !== '' ? parseInt(currentPhaseId) : null;

  try {
    // Adicione o projeto
    const projectResult = await sql`
      INSERT INTO Projects (name, description, current_phase_id, prazo_inicial, prazo_final)
      VALUES (${name}, ${description}, ${parsedCurrentPhaseId}, ${prazo_inicial}, ${prazo_final})
      RETURNING *;
    `;

    if (projectResult && projectResult.rows[0]) {
      const newProject = projectResult.rows[0];
      const projectId = newProject.id;

      // Adicione as fases associadas ao projeto
      const phaseIds = [];

      for (const phaseName of phasesToAdd) {
        const idPhase = await sql`
              INSERT INTO Phases (name, project_id)
              VALUES (${phaseName}, ${projectId})
              RETURNING id;
          `;
        // Adicione o ID retornado ao array phaseIds
        phaseIds.push(idPhase.rows[0].id);
      }

      // Se currentPhaseId for null ou não definido, defina-o como o ID da primeira fase em phasesToAdd
      if (parsedCurrentPhaseId === null && phaseIds.length > 0) {
        const newCurrentPhaseId = phaseIds[0];
        await sql`
          UPDATE projects
          SET current_phase_id = ${newCurrentPhaseId}
          WHERE id = ${projectId};
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
