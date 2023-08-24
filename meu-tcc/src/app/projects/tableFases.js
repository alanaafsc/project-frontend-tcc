'use client'

import React, { useState } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Table, Tag } from 'antd';

const columns = [
  {
    title: 'Fases',
    dataIndex: 'fases',
    key: 'fases',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Descrição',
    dataIndex: 'descricao',
    key: 'descricao',
  },
  {
    title: 'Atividades',
    dataIndex: 'atividades',
    key: 'atividades',
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
];
const data = [
  {
    key: '1',
    fases: 'Projeto Informacional',
    descricao: 'Projeto de desenvolvimento  de software',
    atividades: 'atividade',
    status: 'Em andamento',
  },
  {
    key: '2',
    fases: 'Projeto Detalhado',
    descricao: 'Projeto de desenvolvimento',
    atividades: 'atividade',
    status: 'Concluído',
  },
  {
    key: '3',
    fases: 'Projeto Conceitual',
    descricao: 'Projeto de desenvolvimento  de software',
    atividades: 'atividade',
    status: 'Atrasado',
  },
];
const TableLayout = () => <Table columns={columns} dataSource={data} />;
export default TableLayout;