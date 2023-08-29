'use client'

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select'; 
import { useState } from 'react';

export default function DeleteProjectDialog({ open, onClose, projects, onDelete }) {
    const [selectedProjectId, setSelectedProjectId] = useState(null);

    const handleProjectChange = (event) => {
        setSelectedProjectId(event.target.value);
    };

    const handleClose = () => {
        onClose();
    };

    const handleDelete = () => {
        onDelete(selectedProjectId);
        handleClose();
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Excluir Projeto</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Escolha o projeto que deseja excluir.
                    </DialogContentText>
                    <Select // Use o componente Select em vez do MenuItem
                        value={selectedProjectId}
                        onChange={handleProjectChange}
                        fullWidth
                        variant="standard"
                    >
                        <MenuItem value={null}>Selecionar Projeto</MenuItem>
                        {projects.map((project) => (
                            <MenuItem key={project.id} value={project.id}>
                                {project.name}
                            </MenuItem>
                        ))}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleDelete}>Excluir</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

