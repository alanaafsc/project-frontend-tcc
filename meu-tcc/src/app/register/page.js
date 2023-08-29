'use client'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { HowToReg } from "@mui/icons-material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
    Button,
    Card, Divider,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField
} from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React from 'react';
import PageLayout from "../pageLayout";
import styles from './page.module.css';

export default function Login() {

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <PageLayout>  </PageLayout>
            <div className={styles.boxContainer}>
                <Card style={{ width: '452px', height: '582px' }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div"
                            style={{ fontWeight: '700', color: '#474747', textAlign: 'center', padding: ' 5px' }}>
                            Registre-se
                        </Typography>
                        <Divider style={{ marginBottom: '15px' }} />
                        <Card style={{ height: '470px' }}>
                            <CardContent className={styles.button}>
                                <HowToReg fontSize="large" className={styles.button} />
                                <TextField
                                    id="outlined-input"
                                    label="E-mail"
                                    margin="dense"
                                    sx={{ width: '350px', marginTop: '40px' }}
                                />
                                <FormControl sx={{ width: '350px', marginTop: '4px' }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                </FormControl>
                                <TextField
                                    id="outlined-input"
                                    label="Telefone"
                                    margin="dense"
                                    sx={{ width: '350px' }}
                                />

                                <Button variant="contained" style={{ width: '350px', marginTop: '25px' }}>Registrar</Button>
                            </CardContent>
                        </Card>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};