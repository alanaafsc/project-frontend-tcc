'use client'

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import * as React from 'react';

export default function EditProjectDialog({ open, onClose, projects }) {
    const [selectedProject, setSelectedProject] = React.useState('');
    const [projectData, setProjectData] = React.useState({
        name: '',
        description: '',
        phases: [],
    });

    const handleClose = () => {
        onClose();
    };

    const handleProjectChange = (event) => {
        const selectedProjectId = event.target.value;
        const selectedProjectData = projects.find((project) => project.id === selectedProjectId);
        setSelectedProject(selectedProjectId);
        setProjectData(selectedProjectData);
    };

    const handleSave = () => {
        // Aqui você pode salvar o projeto atualizado no banco de dados
        // projectData contém os dados atualizados do projeto
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Editar Projeto</DialogTitle>
            <DialogContent>
                <DialogContentText
                sx={{marginBottom: '10px'}}
                >Selecione um projeto para editar:</DialogContentText>
                <TextField
                    select
                    margin="dense"
                    label="Projeto"
                    fullWidth
                    value={selectedProject}
                    onChange={handleProjectChange}
                    sx={{marginBottom: '10px'}}
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
                    variant="standard"
                    sx={{marginBottom: '10px'}}
                />
                <TextField
                    margin="dense"
                    id="description"
                    label="Descrição"
                    fullWidth
                    rows={4}
                    value={projectData.description}
                    variant="standard"
                />
                {/* Aqui você pode adicionar os campos para selecionar as fases do PDP */}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={handleSave}>Salvar</Button>
            </DialogActions>
        </Dialog>
    );
}
