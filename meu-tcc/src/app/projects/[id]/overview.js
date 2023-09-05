import React, { useEffect, useState } from 'react';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import { Description } from '@mui/icons-material';

const OverviewProject = ({ projectId }) => {
  const [projectData, setProjectData] = useState(null);
  const [phaseName, setPhaseName] = useState(null);

  useEffect(() => {
    if (projectId) {
      // Realize uma solicitação para buscar os detalhes do projeto com base no projectId
      fetch(`/api/projects/get/project?projectId=${projectId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.project.rows) {
            setProjectData(data.project.rows[0]);
            // Agora, vamos buscar o nome da fase com base no ID da fase atual
            fetch(`/api/phase/get/phase?phaseId=${data.project.rows[0].current_phase_id}`)
              .then((phaseResponse) => phaseResponse.json())
              .then((phaseData) => {
                setPhaseName(phaseData.phase.rows[0].name); // Definir o nome da fase no estado
              })
              .catch((phaseError) => console.error('Erro ao buscar a fase:', phaseError));
          }
        })
        .catch((error) => console.error('Erro ao buscar o projeto:', error));
    }
  }, [projectId]);

  // Verifique se os dados do projeto estão carregados ou ainda são nulos
  if (!projectData || !phaseName) {
    return <div>Carregando...</div>;
  }

  const { name, prazo_final } = projectData;

  return (
    <Card>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={2}
        >
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              variant="overline"
            >
              PROJETO
            </Typography>
            <Typography variant="h5">
              {name}
            </Typography>
            <Typography variant="button">
              Fase: {phaseName} {/* Exibir o nome da fase */}
            </Typography>
            <Typography variant="body2">
              Prazo Final: {prazo_final}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'default',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              <DescriptionIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default OverviewProject;
