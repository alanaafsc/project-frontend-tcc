import { sql } from '@vercel/postgres';

export default async function addActivity(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Método não permitido
  }

  try {
    const { name, description, status, phaseId } = req.body;

    // Adicione a atividade
    const activityResult = await sql`
      INSERT INTO Activities (name, description, status, phase_id)
      VALUES (${name}, ${description}, ${status}, ${phaseId})
      RETURNING *;
    `;

    res.status(201).json(activityResult[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error adding activity' });
  }
}
