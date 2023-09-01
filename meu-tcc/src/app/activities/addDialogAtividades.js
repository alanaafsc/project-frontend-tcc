'use client'

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Tag } from 'antd';
import { useState, useEffect } from 'react';

const AddDialogAtividades = ({ open, onClose, onAdd }) => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState('');
    const [phases, setPhases] = useState([]);
    const [selectedPhase, setSelectedPhase] = useState('');
    const [activityData, setActivityData] = useState({
        atividade: '',
        descricao: '',
        status: '',
        fasePDP: '',
    });

    useEffect(() => {
        // Carregar a lista de projetos ao abrir o diálogo
        fetch('/api/projects/get')
            .then((response) => response.json())
            .then((data) => {
                if (data.projects && data.projects.rows) {
                    setProjects(data.projects.rows);
                }
            })
            .catch((error) => {
                console.error('Error fetching projects:', error);
            });
    }, []);

    const handleFetchActivities = async (selectedProject) => {
        console.log('selectedProject ', selectedProject);
        try {
            const response = await fetch(`/api/activities/get/project?projectId=${selectedProject}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                const phases = data.phases.rows;
                console.log('Phases: ', phases);
                if (phases) {
                    setPhases(phases); // Atualize o estado com as fases da API
                }
            }
        } catch (error) {
            console.error('Error fetching activities:', error);
        }
    };

    useEffect(() => {
        handleFetchActivities(selectedProject);
    }, [selectedProject]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setActivityData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAddActivity = async () => {
        try {
          const response = await fetch('/api/activities/add', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: activityData.atividade,
              description: activityData.descricao,
              status: activityData.status,
              projectId: selectedProject,
              phaseId: selectedPhase, // Certifique-se de que a chave seja 'phaseId' para corresponder à rota existente.
            }),
          });
      
          if (response.ok) {
            const data = await response.json();
            // Você pode lidar com a resposta da API aqui, se desejar
            // Por exemplo, atualizar o estado da lista de atividades.
            onAdd(data.activityResult); // Chama a função `onAdd` passando os dados da atividade.
            onClose();
          } else {
            // Lidar com erros da API, se houver algum
            console.error('Error adding activity:', response.statusText);
          }
        } catch (error) {
          console.error('Error adding activity:', error);
        }
      };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Adicionar Nova Atividade</DialogTitle>
            <DialogContent>
                <FormControl fullWidth margin="dense">
                    <InputLabel>Projeto</InputLabel>
                    <Select
                        value={selectedProject}
                        onChange={(event) => setSelectedProject(event.target.value)}
                    >
                        {projects.map((project) => (
                            <MenuItem key={project.id} value={project.id}>
                                {project.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="dense">
                    <InputLabel>Fase do PDP</InputLabel>
                    <Select
                        value={selectedPhase}
                        onChange={(event) => setSelectedPhase(event.target.value)}
                        disabled={!selectedProject}
                    >
                        {phases.map((phase) => (
                            <MenuItem key={phase.id} value={phase.id}>
                                {phase.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    autoFocus
                    margin="dense"
                    name="atividade"
                    label="Atividade"
                    fullWidth
                    value={activityData.atividade}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    name="descricao"
                    label="Descrição"
                    fullWidth
                    value={activityData.descricao}
                    onChange={handleInputChange}
                />
                <FormControl fullWidth margin="dense">
                    <InputLabel>Status</InputLabel>
                    <Select
                        name="status"
                        value={activityData.status}
                        onChange={handleInputChange}
                    >
                        <MenuItem value="Em andamento">
                            <Tag color="yellow">Em andamento</Tag>
                        </MenuItem>
                        <MenuItem value="Concluído">
                            <Tag color="green">Concluído</Tag>
                        </MenuItem>
                        <MenuItem value="Atrasado">
                            <Tag color="red">Atrasado</Tag>
                        </MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={handleAddActivity}>Adicionar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddDialogAtividades;
