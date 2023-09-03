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

// O record é o objeto que contém os dados da linha atual da tabela. 
// Ele é passado automaticamente para a função de renderização que você define na propriedade render da coluna. 
const TableLayout = () => {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [selectedActivityId, setSelectedActivityId] = useState(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const [atividadesData, setAtividadesData] = useState([]);
    const [phaseData, setPhaseData] = useState([]);

    useEffect(() => {
        fetch('/api/phase/get/') // Substitua por sua rota real para buscar todas as fases
            .then((response) => response.json())
            .then((data) => {
                if (data.phases.rows) {
                    setPhaseData(data.phases.rows);
                }
            })
            .catch((error) => console.error('Erro ao buscar dados de fases:', error));
    }, []);

    const handleAddDialogOpen = () => {
        setIsAddDialogOpen(true);
    };

    const handleAddDialogClose = () => {
        setIsAddDialogOpen(false);
    };

    const handleAddActivity = (newActivityData) => {
        // Atualize o estado com os dados da nova atividade
        setAtividadesData([...atividadesData, newActivityData]);

        // Recarregue a página usando window.location.reload()
        window.location.reload();
    };

    useEffect(() => {
        // Realize a solicitação à API para buscar os dados do banco de dados
        fetch('/api/activities/get')
            .then((response) => response.json())
            .then((data) => {
                if (data.activities.rows) {
                    setAtividadesData(data.activities.rows);
                    console.log(data.activities.rows)
                }
            })
            .catch((error) => console.error('Erro ao buscar dados:', error));
    }, []);

    const handleEdit = (record) => {
        // Lógica para lidar com a edição do item com base no "record"
        setSelectedActivityId(record.id);
        setIsEditDialogOpen(true);
        console.log('Editar item:', record);
    };

    const handleUpload = (record) => {
        // Lógica para lidar com o upload de arquivos do item com base no "record"
        setSelectedActivityId(record.key);
        console.log('Upload de arquivos para o item:', record);
    };


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
                        // Encontre a fase correspondente com base no ID da fase
                        const phase = phaseData.find((phase) => phase.id === phaseId);
                        return phase ? phase.name : 'N/A'; // Mostra o nome da fase ou 'N/A' se não encontrado
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
                            color = 'default'; // Cor padrão para outros estados
                        }
                        return <Tag color={color}>{status}</Tag>;
                    }}
                />
                <Column
                    title="Ações"
                    dataIndex="key"
                    key="actions"
                    render={(key, record) => (
                        <div>
                            <Button type="primary" onClick={() => handleEdit(record)}>
                                Editar
                            </Button>
                            <Button type="default" onClick={() => handleUpload(record)}>
                                Upload
                            </Button>
                        </div>
                    )}
                />
            </Table>
            {/* Diálogo de Edição */}
            <EditDialogAtividades
                open={isEditDialogOpen}
                onClose={() => setIsEditDialogOpen(false)}
                activityId={selectedActivityId} // Passe o ID da atividade selecionada para o diálogo
            />
            <Fab color="primary" aria-label="add" onClick={handleAddDialogOpen}>
                <AddIcon />
            </Fab>
            <AddDialogAtividades open={isAddDialogOpen} onClose={handleAddDialogClose} onAdd={handleAddActivity} />
        </div>
    );
};

export default TableLayout;