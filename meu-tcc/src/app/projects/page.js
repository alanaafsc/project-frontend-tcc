'use client'

import PageLayout from '../pageLayout';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React, { useState } from 'react';
import { CardActionArea, CardActions, Card } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import styles from './page.module.css'; 
import MenuLateral from '../menu';
import TableLayout from './tableFases';
import TableAtividade from './tableAtividade';

export default function Projects() { 
    return (
        <>
        <PageLayout> </PageLayout>
        <div className={ styles.container } >
            <MenuLateral/>
            <div className={styles.content}>
                <div className={styles.boxContainer}>
                    <Card>
                        <CardContent>
                            <div className={styles.box} style={{ width: '300px', height: '300px' }}>
                                <div className={styles.scrollableContent}>
                                    <TableAtividade />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <div className={styles.box} style={{ width: '600px', height: '300px' }}>
                            <div className={styles.scrollableContent}>
                                <TableLayout />
                            </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <Card>
                    <CardContent>
                        <div className={styles.boxFullWidth} style={{ width: '100%', height: '250px' }}>
                        Box 3
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </>
    );
};