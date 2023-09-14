import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon,
  Typography,
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight'; 
import { MoreVert } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';


const ListTasks = ({ projectId }) => {

  const [projectData, setProjectData] = useState(null);
  const [phaseName, setPhaseName] = useState(null);
  const [activitiesData, setActivitiesData] = useState([]);

  useEffect(() => {
    if (projectId) {
      fetch(`/api/projects/get/project?projectId=${projectId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.project.rows) {
            setProjectData(data.project.rows[0]);
            fetch(`/api/phase/get/phase?phaseId=${data.project.rows[0].current_phase_id}`)
              .then((phaseResponse) => phaseResponse.json())
              .then((phaseData) => {
                setPhaseName(phaseData.phase.rows[0].name); 
                fetch(`/api/activities/get/fase?phaseId=${phaseData.phase.rows[0].id}`)
                  .then((activitiesResponse) => activitiesResponse.json())
                  .then((activities) => {
                    setActivitiesData(activities.activity.rows); 
                  })
                  .catch((error) => console.error('Erro ao buscar as atividades:', error));
              })
              .catch((phaseError) => console.error('Erro ao buscar a fase:', phaseError));
          }
        })
        .catch((error) => console.error('Erro ao buscar o projeto:', error));
    }
  }, [projectId]);

  return (
    <Card>
      <CardHeader title="Atividades da fase atual" />
      <List>
        {activitiesData.map((activity, index) => {
          const hasDivider = index < activitiesData.length - 1;

          return (
            <ListItem divider={hasDivider} key={activity.id}>
              <ListItemAvatar>
                {/* Você pode adicionar uma imagem da atividade aqui se tiver */}
                {/* Por exemplo: <img src={activity.image} alt={activity.name} /> */}
              </ListItemAvatar>
              <ListItemText
                primary={activity.name}
                primaryTypographyProps={{ variant: 'subtitle1' }}
                secondary={`Prazo: ${activity.prazo_inicial} - ${activity.prazo_final}`}
                secondaryTypographyProps={{ variant: 'body2' }}
              />
              <IconButton edge="end">
                <SvgIcon>
                  {/* Substitua EllipsisVerticalIcon pelo ícone desejado */}
                  {/* Por exemplo, você pode usar MoreVertIcon do Material-UI */}
                  <MoreVert />
                </SvgIcon>
              </IconButton>
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
        >
          Ver tudo
        </Button>
      </CardActions>
    </Card>
  );
};

export default ListTasks;

