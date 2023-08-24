'use client'

import PageLayout from '../pageLayout';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React, { useState } from 'react';
import { CardActionArea, CardActions, Card, Divider } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import styles from './page.module.css'; 
import Typography from '@mui/material/Typography';
import MenuLateral from '../menu';
import TableLayout from './tableFases';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function Stages() { 
    return (
        <>
        <PageLayout> </PageLayout>
        <div className={ styles.container } >
            <MenuLateral/>
            <div className={styles.content}>
                <Card>
                    <CardContent>
                        <div className={styles.boxFullWidth} style={{ width: '100%' }}>
                            <Typography gutterBottom variant="h5" component="div">
                                Fase atual
                            </Typography>
                        </div>
                        <Divider />
                        <TableLayout/>
                    </CardContent>

                    <CardActionArea>
                    <CardActions className={styles.buttons}>
                        <Fab color="primary" aria-label="add">
                            <AddIcon />
                        </Fab>
                        <Fab color="secondary" aria-label="edit">
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
                </Card>
            </div>
        </div>
    </>
    );
};