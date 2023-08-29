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
import { useState } from 'react';
import EditDialogFases from './editDialogFases';
import styles from './page.module.css';
import TableLayout from './tableFases';

export default function Stages() {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const handleEditDialogOpen = () => {
        setIsEditDialogOpen(true);
    };

    const handleEditDialogClose = () => {
        setIsEditDialogOpen(false);
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
                                    Fase atual
                                </Typography>
                            </div>
                            <Divider />
                            <TableLayout />
                        </CardContent>

                        <CardActionArea>
                            <CardActions className={styles.buttons}>
                                <Fab color="primary" aria-label="add">
                                    <AddIcon />
                                </Fab>
                                <Fab color="secondary" aria-label="edit" onClick={handleEditDialogOpen}>
                                    <EditIcon />
                                </Fab>
                                <Fab color="info" aria-label="delete">
                                    <CloudUploadIcon />
                                </Fab>
                                <Fab color="error" aria-label="delete">
                                    <DeleteIcon />
                                </Fab>
                            </CardActions>
                        </CardActionArea>
                        <EditDialogFases open={isEditDialogOpen} onClose={handleEditDialogClose} />
                    </Card>
                </div>
            </div>
        </>
    );
};