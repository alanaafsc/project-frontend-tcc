import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import styles from './pageLayout.module.css'; 

export default function PageLayout() {
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
                <Button color="inherit">INÍCIO</Button>
                <Button color="inherit">SOBRE</Button>
                <Button color="inherit">FASES DO PROCESSO</Button>
                <Button color="inherit">CONTATO</Button>
            </div>

        </Toolbar>
      </AppBar>
    </Box>
  );
};
