'use client'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Card, Stack, Typography, Avatar, Divider} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
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
                    <div className={styles.title}>
                        <Stack direction="row" justifyContent="space-between" alignItems="end" sx={{
                            marginBottom: '10px', marginTop: '13px',
                            marginLeft: '10px', marginRight: '10px'
                        }}>
                            <Typography variant="h1" gutterBottom style={{
                                fontSize: '20px', fontWeight: '900', color: 'grey',
                                paddingTop: '10px'
                            }}>
                                Atividades
                            </Typography>
                            <Avatar>
                                <PersonIcon />
                            </Avatar>
                        </Stack>
                        <Divider />
                    </div >
                    <Card className={styles.card}>
                        <CardContent>
                            <div className={styles.flexboxUpper}>
                                <TableLayout />
                            </div>
                        </CardContent>
                    </Card>
                    {/* <div className={styles.flexboxRow}>
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
                    </div> */}
                </div>
            </div>
        </>
    );
};