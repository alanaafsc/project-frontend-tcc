import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';


export async function PUT(request) {
  const requestBody = await request.text();
  const { id, name, description, project_id, prazo_inicial, prazo_final } = JSON.parse(requestBody);

  try {
    // Atualize a fase
    const phaseResult = await sql`
      UPDATE Phases
      SET name = ${name}, description = ${description}, project_id = ${project_id}, prazo_inicial = ${prazo_inicial},  prazo_final = ${prazo_final}
      WHERE id = ${id}
      RETURNING *;
    `;

    return NextResponse.json({ phaseResult }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error editing phase' }, { status: 500 });
  }
}
