import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Select,
} from '@mui/material';

export default function DeleteDialogFases({ open, onClose, activities }) {
  const [selectedActivity, setSelectedActivity] = useState('');

  const handleDelete = () => {
    // Lógica para excluir a atividade selecionada
    console.log('Atividade selecionada para exclusão:', selectedActivity);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  const handleActivityChange = (event) => {
    setSelectedActivity(event.target.value);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Excluir Atividade</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Selecione a atividade que você deseja excluir:
        </DialogContentText>
        <Select
          value={selectedActivity}
          onChange={handleActivityChange}
          fullWidth
          label="Atividade"
        >
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
  );
}
