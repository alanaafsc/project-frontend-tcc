import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';


// Criacao de todas as tabelas. Foi adicionado depois a referencia do id do projeto no Phases
    // ALTER TABLE IF EXISTS Phases
    // ADD COLUMN IF NOT EXISTS project_id int REFERENCES Projects(id);
export async function GET(request) {
  try {
    // Criar a tabela de fases
    await sql`
      CREATE TABLE IF NOT EXISTS Phases (
        id serial PRIMARY KEY,
        name varchar(255),
        description text
      );
    `;

    // Criar a tabela de atividades
    await sql`
      CREATE TABLE IF NOT EXISTS Activities (
        id serial PRIMARY KEY,
        name varchar(255),
        description text,
        status varchar(255),
        phase_id int REFERENCES Phases(id)
      );
    `;

    // Criar a tabela de projetos
    await sql`
      CREATE TABLE IF NOT EXISTS Projects (
        id serial PRIMARY KEY,
        name varchar(255),
        description text,
        current_phase_id int REFERENCES Phases(id)
      );
    `;

    return NextResponse.json({ message: 'Tables created successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
