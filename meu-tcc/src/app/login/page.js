'use client'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import LoginIcon from '@mui/icons-material/Login';
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

export default function Login() {

    const [showPassword, setShowPassword] = React.useState(false);
    const [userExists, setUserExists] = useState(true); // Change to false if user doesn't exist

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleLogin = async () => {
        // Check if user exists (Replace this with your API call)
        // Assume the API endpoint is http://localhost:3000/api/user/get
        try {
            const response = await fetch('/api/user/get');
            const data = await response.json();
            const users = data.users.rows; // Make sure this matches the structure of the API response

            // Replace this logic with your actual user check
            const userExists = users.some(user => user.email === userEmail && user.password_hash === userPasswordHash);
            setUserExists(userExists);

            // If user exists, store user login in cache
            if (userExists) {
                // Store user login details in cache
                localStorage.setItem('userLoggedIn', true);
                // Redirect to dashboard or wherever you want
                window.location.href = '/overview'; // Replace with your route
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const userEmail = ''; // Set user email
    const userPasswordHash = ''; // Set user password hash

    return (
        <>
            <PageLayout>  </PageLayout>
            <div className={styles.boxContainer}>
                <Card style={{ width: '452px', height: '582px' }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div"
                            style={{ fontWeight: '700', color: '#474747', textAlign: 'center', padding: ' 5px' }}>
                            Entrar
                        </Typography>
                        <Divider style={{ marginBottom: '15px' }} />
                        <Card style={{ height: '470px' }}>
                            <CardContent className={styles.button}>
                                <LoginIcon className={styles.button} />
                                <Typography gutterBottom variant="h6" component="div"
                                    style={{ color: '#181E25', textAlign: 'center', padding: ' 5px', fontSize: '18px' }}>
                                    Entre com seu e-mail Google
                                </Typography>
                                <Typography variant="body2" gutterBottom style={{ fontSize: '12px', color: '#788BA5' }}>
                                    Use seu e-mail pessoal para fazer login no espaço de trabalho.
                                </Typography>
                                <Button variant="outlined" style={{ gap: '13px', marginTop: '10px', width: '300px', marginBottom: '25px' }}>
                                    <img
                                        src="/SVG.svg" // Caminho para a imagem na pasta public
                                        alt="Ícone"
                                        width={20} // Largura do ícone
                                        height={20} // Altura do ícone
                                        style={{ marginBottom: '4px' }}
                                    />
                                    Entre com o Google
                                </Button>
                                <Divider style={{ marginBottom: '20px' }}>
                                    Ou
                                </Divider>
                                <TextField
                                    id="outlined-input"
                                    label="E-mail"
                                    margin="dense"
                                    sx={{ width: '350px' }}
                                />
                                <FormControl sx={{ m: 1, width: '350px' }} variant="outlined">
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
                                {!userExists && (
                                    <Alert severity="error" style={{ marginTop: '10px' }}>
                                        Usuário não encontrado. Verifique suas credenciais.
                                    </Alert>
                                )}
                                <Button variant="contained" style={{ width: '350px', marginTop: '25px' }} onClick={handleLogin}>Entrar</Button>
                            </CardContent>
                        </Card>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};