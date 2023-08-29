'use client'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Card } from '@mui/material';
import { useRouter } from 'next/navigation';
import CardContent from '@mui/material/CardContent';
import MenuLateral from '../../menu';
import PageLayout from '../../pageLayout';
import styles from './page.module.css';
import TableAtividade from './tableAtividade';
import TableLayout from './tableFases';

export default function Projects({ params }) {

    const router = useRouter();
    const id = params.id; // a partir desse id, renderiza essa pag de acordo com projeto com esse id
    console.log(id)

// Aqui = pode buscar os detalhes do projeto com base no "id" e renderizar as informações

    return (
        <>
            <PageLayout> </PageLayout>
            <div className={styles.container} >
                <MenuLateral />
                <div className={styles.content}>
                    <Card>
                        <CardContent>
                            <div className={styles.boxFullWidth}>
                                <div>
                                    <TableAtividade />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <div className={styles.boxFullWidth}>
                                <div>
                                    <TableLayout />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
};