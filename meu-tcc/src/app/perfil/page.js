'use client'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {
    Button,
    Card, Divider,
    FormControl,
    Input,
    InputAdornment,
    InputLabel,
    TextField
} from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import MenuLateral from "../menu";
import PageLayout from "../pageLayout";
import styles from './page.module.css';


export default function Perfil() {

    return (
        <>
            <PageLayout>  </PageLayout>
            <div className={styles.boxContainer}>
                <MenuLateral />
                <Card style={{ height: '100vh', width: 'auto', marginLeft: '15px', marginTop: '15px' }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div"
                            style={{ fontWeight: '700', color: '#474747', textAlign: 'start', padding: ' 5px' }}>
                            Perfil
                        </Typography>
                        <Divider style={{ marginBottom: '15px' }} />
                        <Card style={{ height: '470px' }}>
                            <CardContent className={styles.button}>
                                <FormControl variant="standard">
                                    <InputLabel htmlFor="input-with-icon-adornment">
                                        Nome Completo
                                    </InputLabel>
                                    <Input
                                        id="input-with-icon-adornment"
                                        sx={{ width: '932px' }}
                                        defaultValue="Fulano"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <AccountCircle />
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                <TextField
                                    id="standard-helperText"
                                    label="E-mail"
                                    defaultValue="exemplo@gmail.com"
                                    variant="standard"
                                    sx={{ width: '932px' }}
                                />
                                <TextField
                                    id="standard-password-input"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    variant="standard"
                                    sx={{ width: '932px' }}
                                />
                                <div className={styles.buttonAtt}>
                                    <Button variant="contained"
                                        style={{ width: '150px', marginTop: '150px' }}>
                                        Atualizar
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};