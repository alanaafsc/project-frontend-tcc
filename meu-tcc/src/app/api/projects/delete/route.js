import { sql } from '@vercel/postgres';

export default async function deleteProject(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).end(); // Método não permitido
  }

  try {
    const { id } = req.body;

    // Exclua o projeto
    const projectResult = await sql`
      DELETE FROM Projects
      WHERE id = ${id}
      RETURNING *;
    `;

    // Limpe as referências das fases associadas ao projeto
    await sql`
      UPDATE Phases
      SET project_id = NULL
      WHERE project_id = ${id};
    `;

    res.status(200).json(projectResult[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting project' });
  }
}
