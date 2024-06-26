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

export default function FormDialogAddProject({ open, onClose, onAdd }) {

    const [projectData, setProjectData] = useState({
        name: '',
        description: '',
        currentPhaseId: '',
        prazo_inicial: dayjs(), 
        prazo_final: dayjs(),
        phases: [],
    });

    const handleFieldChange = (field, value) => {
        setProjectData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handlePhaseChange = (phase, isChecked) => {
        if (isChecked) {
            setProjectData((prevData) => ({
                ...prevData,
                phases: [...prevData.phases, phase],
            }));
        } else {
            setProjectData((prevData) => ({
                ...prevData,
                phases: prevData.phases.filter((p) => p !== phase),
            }));
        }
    };

    const handleClose = () => {
        setProjectData({
            name: '',
            description: '',
            currentPhaseId: '',
            prazo_inicial: dayjs(), 
            prazo_final: dayjs(),
            phases: [],
        });
        onClose();
    };

    const handleCreateProject = async () => {
        try {
            const response = await fetch('/api/projects/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: projectData.name,
                    description: projectData.description,
                    currentPhaseId: projectData.currentPhaseId,
                    prazo_inicial: projectData.prazo_inicial.toISOString().split('T')[0], 
                    prazo_final: projectData.prazo_final.toISOString().split('T')[0], 
                    phasesToAdd: projectData.phases, 
                }),
            });

            if (response.ok) {
                const data = await response.json();
                const newProject = data.newProject; 
                onAdd(newProject); 
                onClose(); 
            } else {
            
            }
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };


    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Criar Novo Projeto</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Por favor, insira os detalhes do projeto:
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nome do Projeto"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={projectData.name}
                        onChange={(e) => handleFieldChange('name', e.target.value)}
                    />
                    <DialogContentText sx={{ marginTop: '25px' }}>Selecione as Fases:</DialogContentText>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={projectData.phases.includes('Projeto Informacional')}
                                onChange={(e) =>
                                    handlePhaseChange('Projeto Informacional', e.target.checked)
                                }
                            />
                        }
                        label="Projeto Informacional"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={projectData.phases.includes('Projeto Conceitual')}
                                onChange={(e) =>
                                    handlePhaseChange('Projeto Conceitual', e.target.checked)
                                }
                            />
                        }
                        label="Projeto Conceitual"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={projectData.phases.includes('Projeto Preliminar')}
                                onChange={(e) =>
                                    handlePhaseChange('Projeto Preliminar', e.target.checked)
                                }
                            />
                        }
                        label="Projeto Preliminar"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={projectData.phases.includes('Projeto Detalhado')}
                                onChange={(e) =>
                                    handlePhaseChange('Projeto Detalhado', e.target.checked)
                                }
                            />
                        }
                        label="Projeto Detalhado"
                    />

                    <TextField
                        margin="dense"
                        id="description"
                        label="Descrição"
                        type="text"
                        fullWidth
                        variant="standard"
                        sx={{ marginBottom:'30px' }}
                        value={projectData.description}
                        onChange={(e) => handleFieldChange('description', e.target.value)}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker', 'DatePicker']}>
                            <DatePicker
                                label="Prazo inicial"
                                value={projectData.prazo_inicial}
                                onChange={(date) => handleFieldChange('prazo_inicial', date)}
                            />
                            <DatePicker
                                label="Prazo final"
                                value={projectData.prazo_final}
                                onChange={(date) => handleFieldChange('prazo_final', date)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleCreateProject}>Criar Projeto</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
