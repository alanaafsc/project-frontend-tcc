'use client'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';

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
        title: 'Data inicial',
        dataIndex: 'datainicial',
        key: 'datainicial',
        render: (datainicial) => dayjs(datainicial).format('DD/MM/YY')
    },
    {
        title: 'Data final',
        dataIndex: 'datafinal',
        key: 'datafinal',
        render: (datafinal) => dayjs(datafinal).format('DD/MM/YY')
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

const TableLayout = ( {projects} ) => {
    const [projectsData, setProjectsData] = useState([]); // Estado para armazenar dados dos projetos

    // useEffect(() => {
    //     // Recupera a lista de projetos da API ao carregar a página


    //     setProjectsData(data);
    //     console.log(projectsData)
    // }, []);

    const data = projects.map(project => ({
        key: project.id.toString(),
        projetos: project.name,
        descricao: project.description,
        faseatual: project.current_phase_name, // Substitua pelo valor correto
        datainicial: project.prazo_inicial, // Substitua pelo campo correto da data inicial no seu objeto
        datafinal: project.prazo_final,
        status: 'Não iniciado', // Substitua pelo valor correto
    }));

    return <Table columns={columns} dataSource={data} />;
};

export default TableLayout;