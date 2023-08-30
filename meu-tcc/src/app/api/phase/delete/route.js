import { sql } from '@vercel/postgres';

export default async function deletePhase(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).end(); // Método não permitido
  }

  try {
    const { id } = req.body;

    // Exclua a fase
    const phaseResult = await sql`
      DELETE FROM Phases
      WHERE id = ${id}
      RETURNING *;
    `;

    // Limpe as referências das atividades associadas à fase
    await sql`
      UPDATE Activities
      SET phase_id = NULL
      WHERE phase_id = ${id};
    `;

    res.status(200).json(phaseResult[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting phase' });
  }
}
