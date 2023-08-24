'use client'

import React, { useState } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Space, Table, Tag } from 'antd';

const columns = [
  {
    title: 'Projetos',
    dataIndex: 'projetos',
    key: 'projetos',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Descrição',
    dataIndex: 'descricao',
    key: 'descricao',
  },
  {
    title: 'Fase atual',
    dataIndex: 'faseatual',
    key: 'faseatual',
  },
  {
    title: 'Data final',
    dataIndex: 'datafinal',
    key: 'datafinal',
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
    projetos: 'Projeto 1',
    descricao: 'Projeto de desenvolvimento  de software',
    faseatual: 'Projeto Informacional',
    datafinal: '23/08/2023',
    status: 'Em andamento',
  },
  {
    key: '2',
    projetos: 'Projeto 1',
    descricao: 'Projeto de desenvolvimento  de software Projeto de desenvolvimento de software	 Projeto de desenvolvimento de software	 Projeto de desenvolvimento de software	 Projeto de desenvolvimento de software	 Projeto de desenvolvimento de software	',
    faseatual: 'Projeto Informacional',
    datafinal: '23/08/2023',
    status: 'Concluído',
  },
  {
    key: '3',
    projetos: 'Projeto 1',
    descricao: 'Projeto de desenvolvimento  de software',
    faseatual: 'Projeto Informacional',
    datafinal: '23/08/2023',
    status: 'Atrasado',
  },
];
const TableLayout = () => <Table columns={columns} dataSource={data} />;
export default TableLayout;