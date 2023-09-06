import React, { useState, useEffect } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';

const EditDialogAtividades = ({ open, onClose, activityId }) => {
    const [activityData, setActivityData] = useState({
        name: '',
        description: '',
        status: '',
        phase_id: '',
    });

    const [statusOptions, setStatusOptions] = useState(['Em andamento', 'Concluído', 'Atrasado']);
    const [phaseOptions, setPhaseOptions] = useState([]);

    // Carregar os dados da atividade com base no activityId ao abrir o diálogo
    useEffect(() => {
        if (open && activityId) {
            // Realize uma solicitação para buscar os dados da atividade com base no activityId
            fetch(`/api/activities/get/activity?activity=${activityId}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.activity.rows) {
                        console.log(data.activity.rows[0])
                        setActivityData(data.activity.rows[0]);
                    }
                })
                .catch((error) => console.error('Erro ao buscar dados da atividade:', error));
        }
    }, [open, activityId]);

     // Carregar opções de fases disponíveis com base no projeto associado à atividade
     useEffect(() => {
        if (activityData.phase_id) {
            // Realize uma solicitação para buscar as fases associadas ao projeto (com base no phase_id)
            fetch(`/api/phase/get/project?phaseId=${activityData.phase_id}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.phases.rows) {
                        setPhaseOptions(data.phases.rows);
                    }
                })
                .catch((error) => console.error('Erro ao buscar opções de fase:', error));
        }
    }, [activityData.phase_id]);


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setActivityData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEditActivity = async () => {
        try {
            const response = await fetch('/api/activities/edit', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: activityId,
                    name: activityData.name,
                    description: activityData.description,
                    status: activityData.status,
                    phase_id: activityData.phase_id,
                }),
            });

            if (response.ok) {
                // Lida com a resposta da API após a edição, se necessário
                onClose(); // Fecha o diálogo após a edição bem-sucedida
                window.location.reload();
            } else {
                // Lida com erros da API, se houver algum
                console.error('Erro ao editar atividade:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao editar atividade:', error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Editar Atividade</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="name"
                    label="Atividade"
                    fullWidth
                    value={activityData.name}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    name="description"
                    label="Descrição"
                    fullWidth
                    value={activityData.description}
                    onChange={handleInputChange}
                />
                <FormControl fullWidth margin="dense">
                    <InputLabel>Status</InputLabel>
                    <Select
                        name="status"
                        value={activityData.status}
                        onChange={handleInputChange}
                    >
                         {statusOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="dense">
                    <InputLabel>Fase do PDP</InputLabel>
                    <Select
                        name="phase_id"
                        value={activityData.phase_id}
                        onChange={handleInputChange}
                    >
                        {phaseOptions.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={handleEditActivity}>Salvar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditDialogAtividades;
