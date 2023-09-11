import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const requestBody = await request.text();
  const { name, description, status, projectId, phaseId, prazo_inicial, prazo_final } = JSON.parse(requestBody);
  try {
    // Verifique se o projeto e a fase fornecidos são válidos antes de prosseguir
    const project = await sql`SELECT * FROM Projects WHERE id = ${projectId}`;
    if (!project.rows[0]) {
      return NextResponse.json({ error: 'Invalid project ID' }, { status: 400 });
    }

    const phase = await sql`SELECT * FROM Phases WHERE id = ${phaseId} AND project_id = ${projectId}`;
    if (!phase.rows[0]) {
      return NextResponse.json({ error: 'Invalid phase ID for the selected project' }, { status: 400 });
    }

    // Adicione a atividade com os dados fornecidos
    const activityResult = await sql`
      INSERT INTO Activities (name, description, status, phase_id, prazo_inicial, prazo_final)
      VALUES (${name}, ${description}, ${status}, ${phaseId}, ${prazo_inicial}, ${prazo_final})
      RETURNING *;
    `;

    return NextResponse.json({ activityResult }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error adding activity' }, { status: 500 });
  }
}

