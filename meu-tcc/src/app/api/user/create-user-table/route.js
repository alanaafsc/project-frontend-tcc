import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // Criação da tabela de usuários
    await sql`
      CREATE TABLE Users (
        id serial PRIMARY KEY,
        name varchar(255),
        email varchar(255) UNIQUE,
        password_hash varchar(255)
      );
    `;
    
    return NextResponse.json({ message: 'User table created successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(request) {
  const { name, email, password } = await request.json();
  
  try {
    // Encriptar a senha antes de armazenar no banco de dados
    const passwordHash = await bcrypt.hash(password, 10);
    
    // Inserir o usuário na tabela
    await sql`
      INSERT INTO Users (name, email, password_hash)
      VALUES (${name}, ${email}, ${passwordHash});
    `;
    
    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
