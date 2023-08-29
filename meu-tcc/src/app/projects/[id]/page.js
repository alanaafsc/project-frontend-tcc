'use client'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Add } from '@mui/icons-material'; // Importe o ícone Add do Material-UI
import { Card, CardActionArea, Fab } from '@mui/material'; // Importe o Fab do Material-UI
import CardContent from '@mui/material/CardContent';
import { useRouter } from 'next/navigation';
import MenuLateral from '../../menu';
import PageLayout from '../../pageLayout';
import styles from './page.module.css';
import TableAtividade from './tableAtividade';
import TableLayout from './tableFases';

export default function Projects({ params }) {
    const router = useRouter();
    const id = params.id;
    console.log(id)

    return (
        <>
            <PageLayout> </PageLayout>
            <div className={styles.container}>
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
                        <CardActionArea sx={{padding: '45px', marginBottom: '20px'}}>
                            <Fab 
                                color="primary"
                                size="medium"
                                aria-label="add"
                                style={{ position: 'absolute', right: 24, bottom: 50 }} // Ajuste o posicionamento conforme necessário
                            >
                                <Add />
                            </Fab>
                        </CardActionArea>
                    </Card>
                </div>
            </div>
        </>
    );
}
