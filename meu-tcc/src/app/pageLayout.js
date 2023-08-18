import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import styles from './pageLayout.module.css'; 

export default function PageLayout() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className={styles.toolbar}>
            <div>
            <div className={styles.elements}> 
            <IconButton
                size="large"
                edge="start"
                color="primary"
                aria-label="menu"
                sx={{ mr: 1 }}
            >
                <MenuIcon />
            </IconButton>
            <img
                src="/main_icon.svg" // Caminho para a imagem na pasta public
                alt="Ícone"
                width={55} // Largura do ícone
                height={55} // Altura do ícone
            />
            </div>
            <div className={styles.buttons}> 
                <Button className={styles.button} color="primary">INÍCIO</Button>
                <Button className={styles.button} color="primary">SOBRE</Button>
                <Button className={styles.button} color="primary">FASES DO PROCESSO</Button>
                <Button className={styles.button} color="primary">CONTATO</Button>
            </div>
            </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
