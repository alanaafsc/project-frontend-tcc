'use client'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { HowToReg } from "@mui/icons-material";
import Link from 'next/link';
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
import Alert from '@mui/material/Alert';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import PageLayout from "../pageLayout";
import styles from './page.module.css';

export default function Register() {

    const [showPassword, setShowPassword] = React.useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleRegister = async () => {
        try {
            const response = await fetch('/api/user/add-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });

            if (response.ok) {
                setRegistrationSuccess(true);
            } else {
                setRegistrationSuccess(false);
            }
        } catch (error) {
            console.error('Error registering user:', error);
        }
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
                                    id="outlined-email"
                                    label="E-mail"
                                    margin="dense"
                                    sx={{ width: '350px', marginTop: '40px' }}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </FormControl>
                                <TextField
                                    id="outlined-name"
                                    label="Nome"
                                    margin="dense"
                                    sx={{ width: '350px' }}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                {registrationSuccess === true && (
                                    <Alert severity="success" style={{ marginTop: '10px' }}>
                                        Registro bem-sucedido! Você pode fazer{' '}
                                        <Link href="/login" style={{ textDecoration: 'underline' }}>
                                            login
                                        </Link>{' '}
                                        agora.
                                    </Alert>
                                )}
                                {registrationSuccess === false && (
                                    <Alert severity="error" style={{ marginTop: '10px' }}>
                                        Ocorreu um erro ao registrar. Por favor, tente novamente.
                                    </Alert>
                                )}
                                <Button
                                    variant="contained"
                                    style={{ width: '350px', marginTop: '25px' }}
                                    onClick={handleRegister}
                                >
                                    Registrar
                                </Button>
                            </CardContent>
                        </Card>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}