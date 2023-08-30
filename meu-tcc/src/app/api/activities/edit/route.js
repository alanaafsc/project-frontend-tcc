import { sql } from '@vercel/postgres';

export default async function editActivity(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).end(); // Método não permitido
  }

  try {
    const { id, name, description, status, phaseId } = req.body;

    // Atualize a atividade
    const activityResult = await sql`
      UPDATE Activities
      SET name = ${name}, description = ${description}, status = ${status}, phase_id = ${phaseId}
      WHERE id = ${id}
      RETURNING *;
    `;

    res.status(200).json(activityResult[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error editing activity' });
  }
}
