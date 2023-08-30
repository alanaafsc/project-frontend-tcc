import { sql } from '@vercel/postgres';

export default async function editProject(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).end(); // Método não permitido
  }

  try {
    const { id, name, description, currentPhaseId, phasesToAdd } = req.body;

    // Atualize o projeto
    const projectResult = await sql`
      UPDATE Projects
      SET name = ${name}, description = ${description}, current_phase_id = ${currentPhaseId}
      WHERE id = ${id}
      RETURNING *;
    `;

    // Atualize as fases relacionadas ao projeto
    if (phasesToAdd && phasesToAdd.length > 0) {
      await sql`
        UPDATE Phases
        SET project_id = ${id}
        WHERE id IN (${phasesToAdd});
      `;
    }

    res.status(200).json(projectResult[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error editing project' });
  }
}
