'use client'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import Edit from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import { Table, Tag } from 'antd';

const handleEdit = (record) => {
    // Lógica para lidar com a edição do item com base no "record"
    console.log('Editar item:', record);
};

const handleUpload = (record) => {
    // Lógica para lidar com o upload de arquivos do item com base no "record"
    console.log('Upload de arquivos para o item:', record);
};

const columns = [
    {
        title: 'Atividades',
        dataIndex: 'atividades',
        key: 'atividades',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Descrição',
        dataIndex: 'descricao',
        key: 'descricao',
    },
    {
        title: 'Fase do PDP',
        dataIndex: 'fases',
        key: 'fases',
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
        title: 'Ações',
        dataIndex: 'key', // Use um identificador exclusivo da linha como dataIndex
        key: 'actions',
        render: (key, record) => (
            <div>
                <Button type="primary" onClick={() => handleEdit(record)}><Edit /></Button>
                <Button type="default" onClick={() => handleUpload(record)}><DriveFolderUploadIcon /></Button>
            </div>
        ),
    },
];
const data = [
    {
        key: '1',
        atividades: 'Atividade 1',
        descricao: 'Projeto de desenvolvimento  de software',
        fases: 'fase 1',
        status: 'Em andamento',
    },
    {
        key: '2',
        atividades: 'Atividade 2',
        descricao: 'Projeto de desenvolvimento  de software',
        fases: 'fase 1',
        status: 'Em andamento',
    },
    {
        key: '3',
        atividades: 'Atividade 3',
        descricao: 'Projeto de desenvolvimento  de software',
        fases: 'fase 1',
        status: 'Em andamento',
    },
];
// O record é o objeto que contém os dados da linha atual da tabela. 
// Ele é passado automaticamente para a função de renderização que você define na propriedade render da coluna. 
const TableLayout = () => {


    return <Table columns={columns} dataSource={data} style={{ width: '990px' }} />;
};

export default TableLayout;