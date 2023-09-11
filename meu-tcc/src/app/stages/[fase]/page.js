'use client'

import MenuLateral from '@/app/menu';
import PageLayout from '@/app/pageLayout';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AddIcon from '@mui/icons-material/Add';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Card, CardActionArea, CardActions, Divider } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import styles from './page.module.css';
import TableLayout from './tableFases';
import AddDialogAtividades from './addDialogAtividade';
import DeleteDialogFases from './deleteDialogActivity';
import DeleteActivityDialog from './deleteDialogActivity';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import EditDialogAtividades from './editDialogAtividade';
import { Faster_One } from 'next/font/google';

export default function Stages({ params }) {
    const fase = params.fase;
    const [faseAtual, setFaseAtual] = useState([]);


    useEffect(() => {
        if (fase) {
            fetch(`/api/phase/get/phase?phaseId=${fase}`)
                .then((response) => response.json())
                .then((data) => {
                    setFaseAtual(data.phase.rows[0]);
                })
                .catch((error) => console.error('Erro ao buscar a fase:', error));
        }
    }, [fase]);

    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [activities, setActivities] = useState([]);

    const handleDeleteDialogOpen = () => {
        setIsDeleteDialogOpen(true);
    };

    const handleDeleteDialogClose = () => {
        setIsDeleteDialogOpen(false);
    };

    const handleEditDialogOpen = () => {
        setIsEditDialogOpen(true);
    };

    const handleEditDialogClose = () => {
        setIsEditDialogOpen(false);
    };

    const handleAddDialogOpen = () => {
        setIsAddDialogOpen(true);
    };

    const handleAddDialogClose = () => {
        setIsAddDialogOpen(false);
    };


    return (
        <>
            <PageLayout> </PageLayout>
            <div className={styles.container} >
                <MenuLateral />
                <div className={styles.content}>
                    <Card>
                        <CardContent>
                            <div className={styles.boxFullWidth} style={{ width: '100%' }}>
                                <Typography gutterBottom variant="h5" component="div">
                                    <Link href={`/projects/${faseAtual.project_id}`} passHref>
                                        {faseAtual.name}
                                    </Link>
                                </Typography>
                            </div>
                            <Divider />
                            <TableLayout phaseId={fase} />
                        </CardContent>

                        <CardActionArea>
                            <CardActions className={styles.buttons}>
                                <Fab color="primary" aria-label="add" onClick={handleAddDialogOpen}>
                                    <AddIcon />
                                </Fab>
                                <Fab color="secondary" aria-label="edit" onClick={handleEditDialogOpen}>
                                    <EditIcon />
                                </Fab>
                                <Fab color="info" aria-label="delete">
                                    <CloudUploadIcon />
                                </Fab>
                                <Fab color="error" aria-label="delete" onClick={handleDeleteDialogOpen}>
                                    <DeleteIcon />
                                </Fab>
                            </CardActions>
                        </CardActionArea>
                        <EditDialogAtividades open={isEditDialogOpen} onClose={handleEditDialogClose} phaseId={fase}/>
                        <AddDialogAtividades open={isAddDialogOpen} onClose={handleAddDialogClose} />
                        {<DeleteActivityDialog
                            open={isDeleteDialogOpen}
                            onClose={handleDeleteDialogClose}
                            phaseId={fase}
                        />}
                    </Card>
                </div>
            </div>
        </>
    );
};