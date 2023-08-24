'use client'

import React, { useState } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Table, Tag, DatePicker } from 'antd';

const { RangePicker } = DatePicker;


const columns = [
  {
    title: 'Atividades',
    dataIndex: 'atividade',
    key: 'atividade',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Descrição',
    dataIndex: 'descricao',
    key: 'descricao',
  },
  {
    title: 'Fase do PDP',
    dataIndex: 'fase',
    key: 'fase',
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
    dataIndex: 'dataInicial',
    key: 'dataInicial',
    render: () => <RangePicker showTime />,
  },
];
const data = [
  {
    key: '1',
    atividade: 'Atividade',
    descricao: 'Projeto de desenvolvimento  de software',
    fase: 'Fase do PDP',
    status: 'Em andamento',
  },
  {
    key: '2',
    atividade: 'Atividade',
    descricao: 'Projeto de desenvolvimento',
    fase: 'Fase do PDP',
    status: 'Concluído',
  },
  {
    key: '3',
    atividade: 'Atividade',
    descricao: 'Projeto de desenvolvimento  de software',
    fase: 'Fase do PDP',
    status: 'Atrasado',
  },
];
const TableLayout = () => <Table columns={columns} dataSource={data} />;
export default TableLayout;