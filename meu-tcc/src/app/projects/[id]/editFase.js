'use client'

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const EditDialog = ({ open, onClose, projectId, selectedPhaseId }) => {
    const [phaseData, setPhaseData] = useState({
        name: '',
        description: '',
        prazo_inicial: dayjs(),
        prazo_final: dayjs(),
    });

    useEffect(() => {
        // Realize uma solicitação para buscar os dados da fase com base no selectedPhaseId
        if (selectedPhaseId) {
            fetch(`/api/phase/get/phase?phaseId=${selectedPhaseId}`)
                .then((response) => response.json())
                .then((data) => {
                    const phase = data.phase.rows[0]; // Certifique-se de que o objeto retornado corresponda à estrutura de dados da fase
                    setPhaseData({
                        name: phase.name,
                        description: phase.description,
                        prazo_inicial: dayjs(phase.prazo_inicial),
                        prazo_final: dayjs(phase.prazo_final),
                    });
                })
                .catch((error) => console.error('Erro ao buscar os dados da fase:', error));
        }
    }, [selectedPhaseId]);

    const handleFieldChange = (field, value) => {
        let newValue = value;

        // Verifique se o campo é uma data e converta para dayjs, se necessário
        if (field === 'prazo_inicial' || field === 'prazo_final') {
            newValue = dayjs(value);
        }

        setPhaseData((prevData) => ({
            ...prevData,
            [field]: newValue,
        }));
    };

    const handleSave = async () => {
        try {
            const response = await fetch('/api/phase/edit', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: selectedPhaseId,
                    name: phaseData.name,
                    description: phaseData.description,
                    projectId: projectId,
                    prazo_inicial: phaseData.prazo_inicial.toISOString(),
                    prazo_final: phaseData.prazo_final.toISOString(),
                }),
            });

            if (response.ok) {
                onClose();
                window.location.reload();

            } else {
                // Trate o erro aqui, se necessário
            }
        } catch (error) {
            console.error('Error editing phase:', error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Editar Fase</DialogTitle>
            <DialogContent>
                <DialogContentText>Edite os detalhes da fase:</DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Nome da Fase"
                    fullWidth
                    value={phaseData.name}
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
                    value={phaseData.description}
                    onChange={(e) => handleFieldChange('description', e.target.value)}
                    variant="standard"
                    sx={{ marginBottom: '10px' }}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Prazo Inicial"
                        value={phaseData.prazo_inicial}
                        onChange={(date) => handleFieldChange('prazo_inicial', date)}
                        renderInput={(params) => <TextField {...params} />}
                        sx={{ marginBottom: '10px' }}
                    />
                    <DatePicker
                        label="Prazo Final"
                        value={phaseData.prazo_final}
                        onChange={(date) => handleFieldChange('prazo_final', date)}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={handleSave}>Salvar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditDialog;
