'use client'

import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Tag } from 'antd';

const AddDialogAtividades = ({ open, onClose }) => {
    const [activityData, setActivityData] = useState({
        atividade: '',
        descricao: '',
        status: '',
        fasePDP: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setActivityData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAddActivity = () => {
        // Lógica para adicionar a nova atividade com os dados fornecidos
        console.log('Nova atividade adicionada:', activityData);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Adicionar Nova Atividade</DialogTitle>
            <DialogContent>
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
                <TextField
                    margin="dense"
                    name="fasePDP"
                    label="Fase do PDP"
                    fullWidth
                    value={activityData.fasePDP}
                    onChange={handleInputChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={handleAddActivity}>Adicionar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddDialogAtividades;
