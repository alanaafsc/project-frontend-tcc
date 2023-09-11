'use client'

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select'; 
import { useState, useEffect } from 'react';

export default function DeleteActivityDialog({ open, onClose, phaseId }) {
    const [selectedActivityId, setSelectedActivityId] = useState(null);
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        if (phaseId) {
            fetch(`/api/activities/get/fase?phaseId=${phaseId}`)
                .then((response) => response.json())
                .then((data) => {
                    setActivities(data.activity.rows);
                })
                .catch((error) => console.error('Erro ao buscar as atividades:', error));
        }
    }, [phaseId]);

    const handleActivityChange = (event) => {
        setSelectedActivityId(event.target.value);
    };

    const handleClose = () => {
        onClose();
    };

    const handleDelete = async () => {
        try {
            const response = await fetch('/api/activities/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: selectedActivityId,
                }),
            });
    
            if (response.ok) {
                handleClose();
                window.location.reload(); // Recarregue a página para refletir as atualizações
            } else {
                // Trate o erro aqui, se necessário
            }
        } catch (error) {
            console.error('Error deleting activity:', error);
        }
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Excluir atividade</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Escolha a atividade que deseja excluir.
                    </DialogContentText>
                    <Select // Use o componente Select em vez do MenuItem
                        value={selectedActivityId}
                        onChange={handleActivityChange}
                        fullWidth
                        variant="standard"
                    >
                        <MenuItem value={null}>Selecionar Atividade</MenuItem>
                        {activities.map((activity) => (
                            <MenuItem key={activity.id} value={activity.id}>
                                {activity.name}
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


