import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

export default function FormDialogAddProject({ open, onClose }) {
    const [projectData, setProjectData] = useState({
        name: '',
        description: '',
        phases: [],
    });

    const handleFieldChange = (field, value) => {
        setProjectData((prevData) => ({ ...prevData, [field]: value }));
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
        onClose(projectData); // Pass projectData to the onClose callback
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
                        value={projectData.description}
                        onChange={(e) => handleFieldChange('description', e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleClose}>Criar Projeto</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
