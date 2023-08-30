import { sql } from '@vercel/postgres';

export default async function addProject(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Método não permitido
  }

  try {
    const { name, description, currentPhaseId } = req.body;

    // Adicione o projeto
    const projectResult = await sql`
      INSERT INTO Projects (name, description, current_phase_id)
      VALUES (${name}, ${description}, ${currentPhaseId})
      RETURNING *;
    `;

    const projectId = projectResult[0].id;

    // Atualize as fases relacionadas ao projeto
    const phasesToAdd = req.body.phasesToAdd || [];
    if (phasesToAdd.length > 0) {
      await sql`
        UPDATE Phases
        SET project_id = ${projectId}
        WHERE id IN (${phasesToAdd});
      `;
    }

    res.status(201).json(projectResult[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error adding project' });
  }
}