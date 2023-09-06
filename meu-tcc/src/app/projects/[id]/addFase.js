import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import * as React from 'react';
import { useState } from 'react';

export default function FormDialogAddFase({ open, onClose, onAdd, projectId }) {
    const [faseData, setFaseData] = useState({
        name: '',
        description: '',
        project_id: projectId,
        prazo_inicial: dayjs(),
        prazo_final: dayjs(),
    });

    const handleClose = () => {
        setFaseData({
            name: '',
            description: '',
            currentPhaseId: '',
            project_id: projectId,
            prazo_inicial: dayjs(),
            prazo_final: dayjs(),
        });
        onClose();
    };

    const handleCreatePhase = async () => {
        try {
            const response = await fetch('/api/phase/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: faseData.name, // Use o valor do campo de nome
                    description: faseData.description,
                    project_id: projectId,
                    prazo_inicial: faseData.prazo_inicial.toISOString().split('T')[0],
                    prazo_final: faseData.prazo_final.toISOString().split('T')[0],
                }),
            });

            if (response.ok) {
                const data = await response.json();
                const newPhase = data.newPhase;
                onAdd(newPhase);
                onClose();

                window.location.reload();

            } else {
                // Trate o erro aqui, se necessário
            }
        } catch (error) {
            console.error('Error creating phase:', error);
        }
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Criar Nova Fase</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Por favor, insira os detalhes da fase:
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        id="name"
                        label="Nome da Fase"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={faseData.name}
                        onChange={(e) => setFaseData({ ...faseData, name: e.target.value })}
                        sx={{ marginBottom: '30px' }}
                    />
                    <TextField
                        margin="dense"
                        id="description"
                        label="Descrição"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={faseData.description}
                        onChange={(e) => setFaseData({ ...faseData, description: e.target.value })}
                        sx={{ marginBottom: '30px' }}
                    />
                    {/* DatePicker para Prazo Inicial */}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Prazo inicial"
                            value={faseData.prazo_inicial}
                            onChange={(date) => setFaseData({ ...faseData, prazo_inicial: date })}
                            sx={{marginRight: '15px'}}
                        />
                    </LocalizationProvider>
                    {/* DatePicker para Prazo Final */}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Prazo final"
                            value={faseData.prazo_final}
                            onChange={(date) => setFaseData({ ...faseData, prazo_final: date })}
                        />
                    </LocalizationProvider>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleCreatePhase}>Criar Fase</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}