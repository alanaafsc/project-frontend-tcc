'use client'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Card } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import MenuLateral from '../menu';
import PageLayout from '../pageLayout';
import styles from './page.module.css';
import TableLayout from './tableActivities';
import TableAtividade from './tableAtividade';
import TableFase from './tableFase';


export default function Activities() {
    return (
        <>
            <PageLayout> </PageLayout>
            <div className={styles.appContainer}>
                <MenuLateral />
                <div className={styles.contentContainer}>
                    <Card className={styles.card}>
                        <CardContent>
                            <div className={styles.flexboxUpper}>
                                <TableLayout />
                            </div>
                        </CardContent>
                    </Card>
                    <div className={styles.flexboxRow}>
                        <Card className={styles.card}>
                            <CardContent>
                                <div className={styles.box}>
                                    <TableAtividade />
                                </div>
                            </CardContent>
                        </Card>
                        <Card className={styles.card}>
                            <CardContent>
                                <div className={styles.box}>
                                    <TableFase />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
};