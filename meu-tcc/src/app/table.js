'use client'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const columns = [
    {
        title: 'Projetos',
        dataIndex: 'projetos',
        key: 'projetos',
        render: (text, record) => (
            <Link href={`/projects/${record.key}`} passHref>
                {text}
            </Link>
        ),
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

// const data = [
//     {
//         key: '1',
//         projetos: 'Projeto 1',
//         descricao: 'Projeto de desenvolvimento  de software',
//         faseatual: 'Projeto Informacional',
//         datafinal: '23/08/2023',
//         status: 'Em andamento',
//     },
//     {
//         key: '2',
//         projetos: 'Projeto 1',
//         descricao: 'Projeto de desenvolvimento  de software Projeto de desenvolvimento de software	 Projeto de desenvolvimento de software	 Projeto de desenvolvimento de software	 Projeto de desenvolvimento de software	 Projeto de desenvolvimento de software	',
//         faseatual: 'Projeto Informacional',
//         datafinal: '23/08/2023',
//         status: 'Concluído',
//     },
//     {
//         key: '3',
//         projetos: 'Projeto 1',
//         descricao: 'Projeto de desenvolvimento  de software',
//         faseatual: 'Projeto Informacional',
//         datafinal: '23/08/2023',
//         status: 'Atrasado',
//     },
// ];

const TableLayout = () => {
    const [projectsData, setProjectsData] = useState([]); // Estado para armazenar dados dos projetos

    useEffect(() => {
        // Recupera a lista de projetos da API ao carregar a página
        fetch('/api/projects/get')
            .then(response => response.json())
            .then(data => {
                if (data.projects && data.projects.rows) {
                    setProjectsData(data.projects.rows);
                }
            })
            .catch(error => {
                console.error('Error fetching projects:', error);
            });
    }, []);

    const data = projectsData.map(project => ({
        key: project.id.toString(),
        projetos: project.name,
        descricao: project.description,
        // Adicione aqui a lógica para obter a fase atual e a data final do projeto
        faseatual: 'Fase Atual', // Substitua pelo valor correto
        datafinal: 'Data Final', // Substitua pelo valor correto
        status: 'Status', // Substitua pelo valor correto
    }));

    return <Table columns={columns} dataSource={data} />;
};

export default TableLayout;