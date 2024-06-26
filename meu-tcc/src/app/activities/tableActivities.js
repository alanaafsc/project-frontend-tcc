'use client'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AddIcon from '@mui/icons-material/Add';
import { Button, Fab } from '@mui/material';
import { Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import AddDialogAtividades from './addDialogAtividades';
import EditDialogAtividades from './editDialogAtividades';

const { Column } = Table;

const TableLayout = () => {
    const [atividadesData, setAtividadesData] = useState([]);
    const [phaseData, setPhaseData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/phase/get/');
                const data = await response.json();

                if (data.phases.rows) {
                    const phaseData = data.phases.rows;

                    for (const phase of phaseData) {
                        try {
                            const projectResponse = await fetch(`/api/projects/get/project?projectId=${phase.project_id}`);
                            const projectData = await projectResponse.json();

                            if (projectData.project.rows) {
                                phase.projectName = projectData.project.rows[0].name;
                            }
                        } catch (error) {
                            console.error('Erro ao buscar dados do projeto:', error);
                        }
                    }

                    setPhaseData([...phaseData]);
                }
            } catch (error) {
                console.error('Erro ao buscar dados de fases:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        fetch('/api/activities/get')
            .then((response) => response.json())
            .then((data) => {
                if (data.activities.rows) {
                    setAtividadesData(data.activities.rows);
                }
            })
            .catch((error) => console.error('Erro ao buscar dados:', error));

    }, []);


    return (
        <div>
            <Table dataSource={atividadesData} style={{ width: '990px' }}>
                <Column title="Atividades" dataIndex="name" key="name" />
                <Column title="Descrição" dataIndex="description" key="description" />
                <Column
                    title="Fase do PDP"
                    dataIndex="phase_id"
                    key="phase_id"
                    render={(phaseId) => {
                        const phase = phaseData.find((phase) => phase.id === phaseId);
                        return phase ? phase.name : 'N/A'; 
                    }}
                />
                <Column
                    title="Projeto"
                    dataIndex="phase_id"
                    key="phase_id"
                    render={(phaseId) => {
                        const phase = phaseData.find((phase) => phase.id === phaseId);
                        if (!phase) {
                            return 'Fase não encontrada';
                        }
                
                        if (phase.project_id === null) {
                            return 'N/A'; 
                        }
                
                        return phase.projectName; 
                    }}
                />

                <Column
                    title="Status"
                    dataIndex="status"
                    key="status"
                    render={(status) => {
                        let color;
                        if (status === 'Concluído') {
                            color = 'green';
                        } else if (status === 'Em andamento') {
                            color = 'yellow';
                        } else if (status === 'Atrasado') {
                            color = 'red';
                        } else {
                            color = 'default'; 
                        }
                        return <Tag color={color}>{status}</Tag>;
                    }}
                />
            </Table>
        </div>
    );
};

export default TableLayout;