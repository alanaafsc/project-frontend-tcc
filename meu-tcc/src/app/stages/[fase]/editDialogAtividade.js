'use client'

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField, FormControlLabel } from '@mui/material';
import { Tag } from 'antd';
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const EditDialogAtividades = ({ open, onClose, phaseId }) => {
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [activityDetails, setActivityDetails] = useState({
    name: '',
    description: '',
    status: '',
    phase_id: '',
    prazo_inicial: dayjs(),
    prazo_final: dayjs(),
  });

  useEffect(() => {
    fetch(`/api/activities/get/fase?phaseId=${phaseId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.activity && data.activity.rows) {
          setActivities(data.activity.rows);
        }
      })
      .catch((error) => {
        console.error('Error fetching phases:', error);
      });
  }, [phaseId]);

  const handleActivityChange = (event) => {
    const selectedActivityId = event.target.value;
    setSelectedActivity(selectedActivityId);

    fetch(`/api/activities/get/activity?activity=${selectedActivityId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.activity) {
          setActivityDetails(data.activity.rows[0]);
        }
      })
      .catch((error) => {
        console.error('Error fetching activity details:', error);
      });
  };

  const handleFieldChange = (field, value) => {
    let newValue = value;

    if (field === 'prazo_inicial' || field === 'prazo_final') {
      newValue = dayjs(value);
    }

    setActivityDetails((prevDetails) => ({
      ...prevDetails,
      [field]: newValue,
    }));

  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/activities/edit', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: selectedActivity,
          name: activityDetails.name,
          description: activityDetails.description,
          status: activityDetails.status,
          phase_id: activityDetails.phase_id,
          prazo_inicial: activityDetails.prazo_inicial,
          prazo_final: activityDetails.prazo_final,
        }),
      });

      if (response.ok) {
        onClose(); 
        window.location.reload();
      } else {
        console.error('Error editing activity:', response.statusText);
      }
    } catch (error) {
      console.error('Error editing activity:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar Atividade</DialogTitle>
      <DialogContent>
        <FormControl sx={{ width: '550px' }} margin="dense">
          <InputLabel>Selecione uma atividade</InputLabel>
          <Select
            value={selectedActivity || ''}
            onChange={handleActivityChange}
          >
            <MenuItem value="" disabled>
              Selecione uma atividade
            </MenuItem>
            {activities.map((activity) => (
              <MenuItem key={activity.id} value={activity.id}>
                {activity.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {selectedActivity && (
          <div>
            <TextField
              margin="dense"
              label="Nome da Atividade"
              fullWidth
              value={activityDetails.name}
              onChange={(e) => handleFieldChange('name', e.target.value)}
            />
            <TextField
              margin="dense"
              label="Descrição"
              fullWidth
              multiline
              rows={4}
              value={activityDetails.description}
              onChange={(e) => handleFieldChange('description', e.target.value)}
            />
            <FormControl fullWidth margin="dense" sx={{ marginBottom: '17px' }}>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={activityDetails.status}
                onChange={(e) => handleFieldChange('status', e.target.value)}
              >
                <MenuItem value="Em andamento">Em andamento</MenuItem>
                <MenuItem value="Concluído">Concluído</MenuItem>
                <MenuItem value="Atrasado">Atrasado</MenuItem>
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Prazo inicial"
                value={dayjs(activityDetails.prazo_inicial)}
                onChange={(date) => handleFieldChange('prazo_inicial', date)}
                sx={{ marginRight: '15px' }}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Prazo final"
                value={dayjs(activityDetails.prazo_final)}
                onChange={(date) => handleFieldChange('prazo_final', date)}
              />
            </LocalizationProvider>
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSave}>Salvar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialogAtividades;
