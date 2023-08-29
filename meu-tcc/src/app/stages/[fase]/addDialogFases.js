import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { DatePicker } from 'antd';
import { useState } from 'react';

export default function AddDialogFases({ open, onClose }) {
    const [newData, setNewData] = useState({
        descricao: '',
        fase: '',
        status: '',
        dataInicial: null,
        dataFinal: null,
    });

    const handleSave = () => {
        // Lógica para salvar as informações da nova fase no banco de dados
        console.log('Nova Fase:', newData);
        onClose();
    };

    const handleClose = () => {
        onClose();
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleDateChange = (name, dateString) => {
        const date = new Date(dateString); // Converte a string de data para um objeto Date
        setNewData((prevData) => ({
            ...prevData,
            [name]: date,
        }));
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Criar Nova Fase</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Preencha as informações da nova fase.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    name="descricao"
                    label="Descrição"
                    fullWidth
                    value={newData.descricao}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    name="fase"
                    label="Fase do PDP"
                    fullWidth
                    value={newData.fase}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    name="status"
                    label="Status"
                    fullWidth
                    value={newData.status}
                    onChange={handleInputChange}
                    sx={{ marginBottom: '12px' }}
                />
                <TextField
                    name="dataInicial"
                    label="Data Inicial"
                    fullWidth
                    value={newData.dataInicial || ''}
                    onChange={(event) => handleDateChange('dataInicial', event.target.value)}
                    sx={{ marginBottom: '12px' }}
                />
                <TextField
                    name="dataFinal"
                    label="Data Final"
                    fullWidth
                    value={newData.dataFinal || ''}
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
