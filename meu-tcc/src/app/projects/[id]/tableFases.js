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
  const [selectedPhaseId, setSelectedPhaseId] = useState(null); 
  const [isEditDialogVisible, setEditDialogVisible] = useState(false);

  useEffect(() => {
    if (projectId) {
      fetch(`/api/phase/get/projectId?projectId=${projectId}`)
        .then((response) => response.json())
        .then((data) => {
          setFases(data.phases.rows);
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
        window.location.reload();
      } else {
      }
    } catch (error) {
      console.error('Error deleting phase:', error);
    }
  };

  const handleEdit = (idPhase) => {
    setSelectedPhaseId(idPhase);
    setEditDialogVisible(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogVisible(false);
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
      render: (prazo_inicial) => dayjs(prazo_inicial).format('DD/MM/YY'),
    },
    {
      title: 'Data final',
      dataIndex: 'prazo_final',
      key: 'prazo_final',
      render: (prazo_final) => dayjs(prazo_final).format('DD/MM/YY'), 
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
            onClick={() => handleDelete(record.id)} 
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
          selectedPhaseId={selectedPhaseId}
          onClose={() => setEditDialogVisible(false)}
          projectId={projectId}
        />
      )}
    </>
  );
};

export default TableLayout;