'use client'

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import styles from './pageLayout.module.css'; 
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useRouter } from 'next/navigation'


export default function PageLayout() {

  const router = useRouter();

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static">
        <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 1 }}
            >
                <MenuIcon />
            </IconButton>
            <img
                src="/main_icon.svg" // Caminho para a imagem na pasta public
                alt="Ícone"
                width={57} // Largura do ícone
                height={57} // Altura do ícone
            />
            <div className={styles.myButtons}>
                <Button type="button" onClick={() => router.push('/')} color="inherit">INÍCIO</Button>
                <Button type="button" onClick={() => router.push('/about')} color="inherit">SOBRE</Button>
                <Button type="button" onClick={() => router.push('/pdp')} color="inherit">FASES DO PROCESSO</Button>
                <Button type="button" onClick={() => router.push('/')} color="inherit">CONTATO</Button>
            </div>

        </Toolbar>
      </AppBar>
    </Box>
  );
};
