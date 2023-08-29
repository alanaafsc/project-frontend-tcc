import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { DatePicker } from 'antd';
import { useState } from 'react';

export default function EditDialogFases({ open, onClose }) {
    const [editedData, setEditedData] = useState({});

    const handleSave = () => {
        // Lógica para salvar as informações editadas no banco de dados
        console.log('Dados editados:', editedData);
        onClose();
    };

    const handleClose = () => {
        onClose();
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleDateChange = (name, dateString) => {
        const date = new Date(dateString); // Converte a string de data para um objeto Date
        setEditedData((prevData) => ({
            ...prevData,
            [name]: date,
        }));
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Editar Atividade</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Edite as informações da atividade.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    name="descricao"
                    label="Descrição"
                    fullWidth
                    value={editedData.descricao || ''}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    name="fase"
                    label="Fase do PDP"
                    fullWidth
                    value={editedData.fase || ''}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    name="status"
                    label="Status"
                    fullWidth
                    value={editedData.status || ''}
                    onChange={handleInputChange}
                    sx={{marginBottom: '12px'}}
                />
                <TextField
                    name="dataInicial"
                    label="Data Inicial"
                    fullWidth
                    value={editedData.dataInicial || ''}
                    onChange={(event) => handleDateChange('dataInicial', event.target.value)}
                    sx={{marginBottom: '12px'}}
                />
                <TextField
                    name="dataFinal"
                    label="Data Final"
                    fullWidth
                    value={editedData.dataFinal || ''}
                    onChange={(event) => handleDateChange('dataFinal', event.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={handleSave}>Salvar</Button>
            </DialogActions>
        </Dialog>
    );
}


