import { sql } from '@vercel/postgres';

export default async function editPhase(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).end(); // Método não permitido
  }

  try {
    const { id, name, description, projectId, activities } = req.body;

    // Atualize a fase
    const phaseResult = await sql`
      UPDATE Phases
      SET name = ${name}, description = ${description}, project_id = ${projectId}
      WHERE id = ${id}
      RETURNING *;
    `;

    // Atualize as atividades relacionadas à fase
    if (activities && activities.length > 0) {
      await sql`
        UPDATE Activities
        SET phase_id = ${id}
        WHERE id IN (${activities});
      `;
    }

    res.status(200).json(phaseResult[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error editing phase' });
  }
}
