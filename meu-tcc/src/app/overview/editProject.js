'use client'

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { FormControlLabel } from '@mui/material';
import { Checkbox } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import * as React from 'react';
import { useEffect, useState } from 'react';

export default function EditProjectDialog({ open, onClose, projects, setProjects }) {
    const [selectedProject, setSelectedProject] = React.useState('');
    const [projectData, setProjectData] = React.useState({
        name: '',
        description: '',
        currentPhaseId: '',
        prazo_inicial: dayjs(), // Use dayjs para a data inicial
        prazo_final: dayjs(),
        phases: {
            'Projeto Informacional': false,
            'Projeto Conceitual': false,
            'Projeto Preliminar': false,
            'Projeto Detalhado': false,
        },
    });
    const [projectPhases, setProjectPhases] = useState([]);


    const fetchPhases = async (project) => {
        try {
            const response = await fetch(`/api/phase/get/project?phaseId=${project.current_phase_id
                }`);
            console.log('response: ', response)
            if (response.ok) {
                const data = await response.json();
                setProjectPhases(data.phases.rows);
            } else {
                console.error('Error fetching project phases:', response.statusText);
                setProjectPhases([]);
            }
        } catch (error) {
            console.error('Error fetching project phases:', error);
            setProjectPhases([]);
        }
    };

    useEffect(() => {
        if (selectedProject) {
            const selectedProjectData = projects.find((project) => project.id === selectedProject);
            setProjectData(selectedProjectData);

            // Chame a função para buscar as fases associadas ao projeto
            fetchPhases(selectedProjectData);
        } else {
            setProjectData({
                name: '',
                description: '',
                currentPhaseId: '',
                prazo_inicial: dayjs(),
                prazo_final: dayjs(),
                phases: {
                    'Projeto Informacional': false,
                    'Projeto Conceitual': false,
                    'Projeto Preliminar': false,
                    'Projeto Detalhado': false,
                },
            });

            // Limpe as fases quando não houver projeto selecionado
            setProjectPhases([]);
        }
    }, [selectedProject, projects]);

    const handleFieldChange = (field, value) => {
        let newValue = value;

        // Verifique se o campo é uma data e converta para dayjs, se necessário
        if (field === 'prazo_inicial' || field === 'prazo_final') {
            newValue = dayjs(value);
        }

        setProjectData((prevData) => ({
            ...prevData,
            [field]: newValue,
        }));
    };

    const handleClose = () => {
        onClose();
    };

    const handleProjectChange = (event) => {
        const selectedProjectId = event.target.value;
        setSelectedProject(selectedProjectId);
    };

    const handlePhaseChange = (phase, isChecked) => {
        setProjectData((prevData) => ({
            ...prevData,
            phases: {
                ...prevData.phases,
                [phase]: isChecked,
            },
        }));
    };


    const handleSave = async () => {
        try {
            const response = await fetch('/api/projects/edit', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: selectedProject,
                    name: projectData.name,
                    description: projectData.description,
                    currentPhaseId: projectData.currentPhaseId,
                    phasesToAdd: Object.keys(projectData.phases).filter(phase => projectData.phases[phase]),
                    prazo_inicial: projectData.prazo_inicial,
                    prazo_final: projectData.prazo_final,
                }),
            });

            if (response.ok) {
                const updatedProjects = projects.map((project) =>
                    project.id === selectedProject ? { ...project, name: projectData.name, description: projectData.description } : project
                );
                setProjects(updatedProjects);

                onClose();
            } else {
                // Trate o erro aqui, se necessário
            }
        } catch (error) {
            console.error('Error editing project:', error);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Editar Projeto</DialogTitle>
            <DialogContent>
                <DialogContentText
                    sx={{ marginBottom: '10px' }}
                >Selecione um projeto para editar:</DialogContentText>
                <TextField
                    select
                    margin="dense"
                    label="Projeto"
                    fullWidth
                    value={selectedProject}
                    onChange={handleProjectChange}
                    sx={{ marginBottom: '10px' }}
                >
                    {projects.map((project) => (
                        <MenuItem key={project.id} value={project.id}>
                            {project.name}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Nome do Projeto"
                    fullWidth
                    value={projectData.name}
                    onChange={(e) => handleFieldChange('name', e.target.value)}
                    variant="standard"
                    sx={{ marginBottom: '10px' }}
                />
                <TextField
                    margin="dense"
                    id="description"
                    label="Descrição"
                    fullWidth
                    rows={4}
                    value={projectData.description}
                    style={{ marginBottom: '25px' }}
                    onChange={(e) => handleFieldChange('description', e.target.value)}
                    variant="standard"
                />
                <div>
                    <div>
                        <b>Fases Associadas:</b>
                    </div>
                    {projectData.phases && Object.keys(projectData.phases).map((phase) => (<FormControlLabel
                        key={phase}
                        control={
                            <Checkbox
                                checked={projectData.phases[phase]}
                                onChange={(e) =>
                                    handlePhaseChange(phase, e.target.checked)
                                }
                            />
                        }
                        label={phase}
                    />
                    ))}
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker', 'DatePicker']}>
                        <DatePicker
                            label="Prazo inicial"
                            value={dayjs(projectData.prazo_inicial)}
                            onChange={(date) => handleFieldChange('prazo_inicial', date)}
                        />
                        <DatePicker
                            label="Prazo final"
                            value={dayjs(projectData.prazo_final)}
                            onChange={(date) => handleFieldChange('prazo_final', date)}
                        />
                    </DemoContainer>
                </LocalizationProvider>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={handleSave}>Salvar</Button>
            </DialogActions>
        </Dialog>
    );
}
