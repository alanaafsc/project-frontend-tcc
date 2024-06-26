'use client'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Add } from '@mui/icons-material';  
import { Card, CardActionArea, Divider, Fab, Stack } from '@mui/material';
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
import FormDialogAddFase from './addFase';
import React, { useEffect, useState } from 'react';

export default function Projects({ params }) {
    const router = useRouter();
    const id = params.id;
    const [isDialogOpen, setDialogOpen] = useState(false);

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
                        </div >
                        {/* <div >
                            <ListTasks
                                projectId={id}
                                sx={{ width: '500px' }}
                            />
                        </div> */}
                    </div>
                    <Card className={styles.cardContainer}>
                        <CardContent>
                            <div className={styles.boxFullWidth}>
                                <div>
                                    <TableLayout projectId={id} />
                                </div>
                            </div>
                        </CardContent>
                        <CardActionArea sx={{ padding: '45px' }}>
                            <Fab
                                color="primary"
                                size="medium"
                                aria-label="add"
                                onClick={() => setDialogOpen(true)}
                                style={{ position: 'absolute', right: 24, bottom: 50 }}
                            >
                                <Add />
                            </Fab>
                        </CardActionArea>
                    </Card>
                </div>
            </div>
            <FormDialogAddFase
                open={isDialogOpen}
                onClose={() => setDialogOpen(false)}
                onAdd={(newPhase) => {
                }}
                projectId={id}
            />

        </>
    );
}
