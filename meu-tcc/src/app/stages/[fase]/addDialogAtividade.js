'use client'

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Tag } from 'antd';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const AddDialogAtividades = ({ open, onClose }) => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState('');
    const [phases, setPhases] = useState([]);
    const [selectedPhase, setSelectedPhase] = useState('');
    const [activityData, setActivityData] = useState({
        atividade: '',
        descricao: '',
        status: '',
        fasePDP: '',
        prazo_inicial: dayjs(),
        prazo_final: dayjs(),
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

    const handleInputChange = (field, value) => {
        let newValue = value;

        // Verifique se o campo é uma data e converta para dayjs, se necessário
        if (field === 'prazo_inicial' || field === 'prazo_final') {
            newValue = dayjs(value);
        }

        setActivityData((prevData) => ({
            ...prevData,
            [field]: newValue,
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
                    phaseId: selectedPhase,
                    prazo_inicial: activityData.prazo_inicial,
                    prazo_final: activityData.prazo_final,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                onClose();
                window.location.reload();
            } else {
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
                    onChange={(e) => handleInputChange('atividade', e.target.value)}
                />
                <TextField
                    margin="dense"
                    name="descricao"
                    label="Descrição"
                    fullWidth
                    value={activityData.descricao}
                    onChange={(e) => handleInputChange('descricao', e.target.value)}
                />
                <FormControl fullWidth margin="dense">
                    <InputLabel>Status</InputLabel>
                    <Select
                        name="status"
                        value={activityData.status}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                        sx={{ marginBottom: '10px' }}
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
                {/* DatePicker para Prazo Inicial */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Prazo inicial"
                        value={dayjs(activityData.prazo_inicial)}
                        onChange={(date) => handleInputChange('prazo_inicial', date)}
                        sx={{ marginRight: '15px' }}
                    />
                </LocalizationProvider>
                {/* DatePicker para Prazo Final */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Prazo final"
                        value={dayjs(activityData.prazo_final)}
                        onChange={(date) => handleInputChange('prazo_final', date)}                    />
                </LocalizationProvider>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={handleAddActivity}>Adicionar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddDialogAtividades;
