'use client'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Table, Tag, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { DeleteOutlined } from '@ant-design/icons';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import EditDialog from './editFase';

const TableLayout = ({ projectId }) => {
  const [fases, setFases] = useState([]);
  const [selectedPhaseId, setSelectedPhaseId] = useState(null); // Estado para controlar o id da fase selecionada
  const [isEditDialogVisible, setEditDialogVisible] = useState(false); // Estado para controlar a visibilidade do diálogo de edição

  useEffect(() => {
    // Realize uma solicitação para buscar as fases com base no projectId
    if (projectId) {
      fetch(`/api/phase/get/projectId?projectId=${projectId}`)
        .then((response) => response.json())
        .then((data) => {
          setFases(data.phases.rows);
          console.log(data.phases.rows)
        })
        .catch((error) => console.error('Erro ao buscar as fases:', error));
    }
  }, [projectId]);

  const handleDelete = async (idPhase) => {
    try {
      const response = await fetch('/api/phase/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: idPhase,
        }),
      });

      if (response.ok) {
        setFases((prevFases) => prevFases.filter((fase) => fase.id !== record.id));
        window.location.reload(); // Recarregue a página para refletir as atualizações
      } else {
        // Trate o erro aqui, se necessário
      }
    } catch (error) {
      console.error('Error deleting phase:', error);
    }
  };
  const handleEdit = (idPhase) => {
    setSelectedPhaseId(idPhase);
    setEditDialogVisible(true); // Mostrar o diálogo de edição
  };

  const handleCloseEditDialog = () => {
    setEditDialogVisible(false); // Fechar o diálogo de edição
  };

  const columns = [
    {
      title: 'Fases',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Link href={`/stages/${record.id}`} passHref>
          {text}
        </Link>
      ),
    },
    {
      title: 'Descrição',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Data inicial',
      dataIndex: 'prazo_inicial',
      key: 'prazo_inicial',
      render: (prazo_inicial) => dayjs(prazo_inicial).format('DD/MM/YY'), // Formatando a data
    },
    {
      title: 'Data final',
      dataIndex: 'prazo_final',
      key: 'prazo_final',
      render: (prazo_final) => dayjs(prazo_final).format('DD/MM/YY'), // Formatando a data
    },
    {
      title: 'Ações',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, record) => (
        <div>
          <Button
            type="text"
            size="small"
            icon={<EditOutlined />}
            style={{ marginRight: 8 }}
            onClick={() => handleEdit(record.id)}
          >
            Editar
          </Button>
          <Button
            type="text"
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)} // Passando o ID da fase para handleDelete
          >
            Excluir
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={fases} style={{ width: '990px' }} />
      {isEditDialogVisible && (
        <EditDialog
          open={isEditDialogVisible}
          onClose={handleCloseEditDialog}
          projectId={projectId}
          selectedPhaseId={selectedPhaseId}
        />
      )}
    </>
  );
};
// const TableLayout = () => <Table columns={columns} dataSource={} style={{ width: '990px' }} />;
export default TableLayout;