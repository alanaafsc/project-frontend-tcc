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
    console.log(id)

    return (
        <>
            <PageLayout> </PageLayout>
            <div className={styles.container}>
                <MenuLateral />
                <div className={styles.content}>
                    <div className={styles.title}>
                        <Stack direction="row" justifyContent="space-between" alignItems="end" sx={{marginBottom: '10px'}}>
                            <Typography variant="h1" gutterBottom style={{
                                fontSize: '20px', fontWeight: '900', color: 'grey',
                                paddingTop: '10px'
                            }}>
                                Projetos
                            </Typography>
                            <Avatar>
                                <PersonIcon />
                            </Avatar>
                        </Stack>
                        <Divider />
                    </div >
                    <div className={styles.cards}>
                        <div>
                            <OverviewProject
                                difference={10}
                                positive={true}
                                sx={{ backgroundColor: 'white', width: '300px', marginBottom: '10px' }}
                                value={1000}
                            />
                            <OverviewProject
                                difference={10}
                                positive={true}
                                sx={{ backgroundColor: 'white', width: '300px' }}
                                value={1000}
                            />
                        </div >
                        <ListTasks
                            products={[
                                {
                                    id: '5ece2c077e39da27658aa8a9',
                                    image: '/assets/products/product-1.png',
                                    name: 'Healthcare Erbology',
                                    updatedAt: new Date()
                                },
                                {
                                    id: '5ece2c0d16f70bff2cf86cd8',
                                    image: '/assets/products/product-2.png',
                                    name: 'Makeup Lancome Rouge',
                                    updatedAt: new Date()
                                },
                                {
                                    id: 'b393ce1b09c1254c3a92c827',
                                    image: '/assets/products/product-5.png',
                                    name: 'Skincare Soja CO',
                                    updatedAt: new Date()
                                },
                                {
                                    id: 'a6ede15670da63f49f752c89',
                                    image: '/assets/products/product-6.png',
                                    name: 'Makeup Lipstick',
                                    updatedAt: new Date()
                                },
                                {
                                    id: 'bcad5524fe3a2f8f8620ceda',
                                    image: '/assets/products/product-7.png',
                                    name: 'Healthcare Ritual',
                                    updatedAt: new Date()
                                }
                            ]}
                            sx={{ height: '100%' }}
                        />
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
