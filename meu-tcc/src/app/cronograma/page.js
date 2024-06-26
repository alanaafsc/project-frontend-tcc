'use client'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Card } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import { Badge, Calendar } from 'antd';
import MenuLateral from '../menu';
import PageLayout from '../pageLayout';
import styles from './page.module.css';
import { useEffect, useState } from 'react';

const Cronograma = () => {
    const [projectData, setProjectData] = useState([]);

    useEffect(() => {
        fetch('/api/projects/get')
            .then((response) => response.json())
            .then((data) => {
                if (data.projects && data.projects.rows) {
                    setProjectData(data.projects.rows);
                }
            })
            .catch((error) => console.error('Erro ao buscar dados dos projetos:', error));
    }, []);

    const getListData = (value) => {
        const formattedValueDate = `${value.year()}-${(value.month() + 1).toString().padStart(2, '0')}-${value.date().toString().padStart(2, '0')}`;

        const listData = projectData
            .filter((project) => {
                const startDate = project.prazo_inicial.split('T')[0];
                const endDate = project.prazo_final.split('T')[0];

                return startDate <= formattedValueDate && formattedValueDate <= endDate;
            })
            .map((project) => ({
                type: 'success',
                content: project.name,
            }));

        return listData || [];
    };

    const dateCellRender = (value) => {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map((item) => (
                    <li key={item.content}>
                        <Badge status={item.type} text={item.content} />
                    </li>
                ))}
            </ul>
        );
    };

    const cellRender = (current, info) => {
        if (info.type === 'date') return dateCellRender(current);
        return info.originNode;
    };

    return (
        <>
            <PageLayout> </PageLayout>
            <div className={styles.container}>
                <MenuLateral />
                <div className={styles.box}>
                    <Card style={{ overflowY: 'auto' }}>
                        <CardContent>
                            <Calendar cellRender={cellRender} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default Cronograma;