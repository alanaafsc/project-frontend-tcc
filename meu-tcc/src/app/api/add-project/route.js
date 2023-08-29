import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const projectName = searchParams.get('projectName');
  const projectDescription = searchParams.get('projectDescription');
  const projectCurrentPhase = searchParams.get('projectCurrentPhase');

 
  try {
    if (!projectCurrentPhase || !projectName  || !projectDescription) throw new Error('Name, phase and description are required');
    await sql`
    INSERT INTO projects (name, description, current_phase) VALUES (${projectName}, ${projectDescription}, ${projectCurrentPhase});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
 
  const projects = await sql`SELECT * FROM projects;`;
  return NextResponse.json({ projects }, { status: 200 });
}
