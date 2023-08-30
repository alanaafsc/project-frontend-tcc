import { sql } from '@vercel/postgres';

export default async function deleteActivity(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).end(); // Método não permitido
  }

  try {
    const { id } = req.body;

    // Exclua a atividade
    const activityResult = await sql`
      DELETE FROM Activities
      WHERE id = ${id}
      RETURNING *;
    `;

    res.status(200).json(activityResult[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting activity' });
  }
}
