import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const requestBody = await request.text(); // Lê o corpo da solicitação como texto
  const { name, description, project_id, prazo_inicial, prazo_final } = JSON.parse(requestBody);

  try {

    // Adicione a fase
    const phaseResult = await sql`
      INSERT INTO Phases (name, description, project_id, prazo_inicial, prazo_final)
      VALUES (${name}, ${description}, ${project_id}, ${prazo_inicial}, ${prazo_final})
      RETURNING *;
    `;

    return NextResponse.json({ phaseResult }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error adding phase' }, { status: 500 });

  }
}
