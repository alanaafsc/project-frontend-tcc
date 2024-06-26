'use client'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { useRouter } from 'next/navigation';
import styles from './pageLayout.module.css';


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
            src="/main_icon.svg" 
            alt="Ícone"
            width={57} 
            height={57} 
          />
          <div className={styles.myButtons}>
            <Button type="button" onClick={() => router.push('/')} color="inherit">INÍCIO</Button>
            <Button type="button" onClick={() => router.push('/about')} color="inherit">SOBRE</Button>
            <Button type="button" onClick={() => router.push('/pdp')} color="inherit">FASES DO PROCESSO</Button>
            <Button type="button" onClick={() => router.push('/contato')} color="inherit">CONTATO</Button>
          </div>

        </Toolbar>
      </AppBar>
    </Box>
  );
};
