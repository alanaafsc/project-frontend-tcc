'use client'

import PageLayout from '../pageLayout';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React, { useState } from 'react';
import Table from '../table';
import { CardActionArea, CardActions, Card } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import styles from './page.module.css'; 
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuLateral from '../menu';

export default function PageOverview() { 
    return (
    <>
    <PageLayout> </PageLayout>
    <div className={ styles.container } >
        <MenuLateral/>
        <div className={styles.table}>
            <Card>
                <CardContent>
                    <Table></Table>
                </CardContent>
                <CardActionArea>
                    <CardActions className={styles.buttons}>
                        <Fab color="primary" aria-label="add">
                            <AddIcon />
                        </Fab>
                        <Fab color="secondary" aria-label="edit">
                            <EditIcon />
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