import bcrypt from 'bcrypt';
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const revalidate = 1;
export async function POST(request) {
  const { name, email, password } = await request.json();
 
  try {
    if (!name || !email || !password) throw new Error('Name, email, and password are required');
    
    // Encriptar a senha antes de armazenar no banco de dados
    const passwordHash = await bcrypt.hash(password, 10);
    
    // Inserir o usuário na tabela
    await sql`
    INSERT INTO Users (name, email, password_hash) VALUES (${name}, ${email}, ${passwordHash});`;

    const users = await sql`SELECT * FROM Users;`;
    return NextResponse.json({ message: 'User created successfully', users }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}