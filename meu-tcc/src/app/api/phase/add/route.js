import { sql } from '@vercel/postgres';

export default async function addPhase(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Método não permitido
  }

  try {
    const { name, description, projectId, activities } = req.body;

    // Adicione a fase
    const phaseResult = await sql`
      INSERT INTO Phases (name, description, project_id)
      VALUES (${name}, ${description}, ${projectId})
      RETURNING *;
    `;

    const phaseId = phaseResult[0].id;

    // Atualize as atividades relacionadas à fase
    if (activities && activities.length > 0) {
      await sql`
        UPDATE Activities
        SET phase_id = ${phaseId}
        WHERE id IN (${activities});
      `;
    }

    res.status(201).json(phaseResult[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error adding phase' });
  }
}
