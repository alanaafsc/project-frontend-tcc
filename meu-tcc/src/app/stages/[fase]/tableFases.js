'use client'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import * as React from 'react';
import { Table, Tag } from 'antd';
import { useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const TableLayout = ({ phaseId }) => {
    const [activities, setActivities] = React.useState([]);

    useEffect(() => {
        // Realize uma solicitação para buscar as atividades com base no phaseId
        if (phaseId) {
            fetch(`/api/activities/get/fase?phaseId=${phaseId}`)
                .then((response) => response.json())
                .then((data) => {
                    const rows = data.activity.rows;
                    const mappedActivities = rows.map((row) => ({
                        id: row.id,
                        name: row.name,
                        description: row.description,
                        phase_id: row.phase_id,
                        status: row.status,
                        prazo_inicial: dayjs(row.prazo_inicial).format('YYYY-MM-DD'),
                        prazo_final: dayjs(row.prazo_final).format('YYYY-MM-DD'),
                    }));
                    setActivities(mappedActivities);
                })
                .catch((error) => console.error('Erro ao buscar as atividades:', error));
        }
    }, [phaseId]);

    const columns = [
        {
            title: 'Atividades',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Descrição',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Fase do PDP',
            dataIndex: 'phase_id',
            key: 'phase_id',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                let color;
                if (status === 'Concluído') {
                    color = 'green';
                } else if (status === 'Em andamento') {
                    color = 'yellow';
                } else if (status === 'Atrasado') {
                    color = 'red';
                } else {
                    color = 'default'; // Cor padrão para outros estados
                }

                return <Tag color={color}>{status}</Tag>;
            },
        },
        {
            title: 'Data Inicial',
            dataIndex: 'prazo_inicial',
            key: 'prazo_inicial',
            render: (text, record) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        value={dayjs(text)}
                        onChange={(date) => handleDateChange(date, record.key, 'prazo_inicial')}
                    />
                </LocalizationProvider>
            ),
        },
        {
            title: 'Data Final',
            dataIndex: 'prazo_final',
            key: 'prazo_final',
            render: (text, record) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        value={dayjs(text)}
                        onChange={(date) => handleDateChange(date, record.key, 'prazo_final')}
                    />
                </LocalizationProvider>
            ),
        },
    ];

    const handleDateChange = (date, key, field) => {
        const updatedActivities = activities.map((activity) => {
            if (activity.key === key) {
                return {
                    ...activity,
                    [field]: dayjs(date).format('YYYY-MM-DD'),
                };
            }
            return activity;
        });
        setActivities(updatedActivities);
    };

    return <Table columns={columns} dataSource={activities} />;
};

export default TableLayout;