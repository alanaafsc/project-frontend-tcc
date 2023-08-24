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

export default function Activities() { 
    return (
        <>
        <PageLayout> </PageLayout>
        <div className={ styles.container } >
            <MenuLateral/>
            <div className={styles.content}>
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