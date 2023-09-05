'use client'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Add } from '@mui/icons-material'; // Importe o ícone Add do Material-UI
import { Card, CardActionArea, Divider, Fab, Stack } from '@mui/material'; // Importe o Fab do Material-UI
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import MenuLateral from '../../menu';
import PersonIcon from '@mui/icons-material/Person';
import PageLayout from '../../pageLayout';
import Avatar from '@mui/material/Avatar';
import styles from './page.module.css';
import TableAtividade from './tableAtividade';
import TableLayout from './tableFases';
import OverviewProject from './overview';
import ListTasks from './listTasks';

export default function Projects({ params }) {
    const router = useRouter();
    const id = params.id;

    return (
        <>
            <PageLayout> </PageLayout>
            <div className={styles.container}>
                <MenuLateral />
                <div className={styles.content}>
                    <div className={styles.title}>
                        <Stack direction="row" justifyContent="space-between" alignItems="end" sx={{ marginBottom: '10px' }}>
                            <Typography variant="h1" gutterBottom style={{
                                fontSize: '20px', fontWeight: '900', color: 'grey',
                                paddingTop: '10px'
                            }}>
                                Projetos
                            </Typography>
                            <Avatar type='button' onClick={() => router.push('/perfil')}>
                                <PersonIcon />
                            </Avatar>
                        </Stack>
                        <Divider />
                    </div >
                    <div className={styles.cards}>
                        <div className={styles.overviews}>
                            <OverviewProject
                                projectId={id}
                            />
                            <OverviewProject
                                projectId={id}
                            />
                        </div >
                        <div >
                            <ListTasks
                                projectId={id}
                                sx={{ width: '500px'}}
                            />
                        </div>
                    </div>
                    <Card className={styles.cardContainer}>
                        <CardContent>
                            <div className={styles.boxFullWidth}>
                                <div>
                                    <TableLayout />
                                </div>
                            </div>
                        </CardContent>
                        <CardActionArea sx={{ padding: '45px' }}>
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
