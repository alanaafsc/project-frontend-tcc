import PageLayout from "./pageLayout";
import styles from './page.module.css'; 
import React from 'react';
import { Button } from 'antd';
import { FormOutlined, LoginOutlined } from '@ant-design/icons';
import Typography from '@mui/material/Typography';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


export default function Home() { 
  return (
    <>
    <PageLayout> 
    </PageLayout>
      <div className={ styles.container } >
          <div className={ styles.leftcolumn }>
              <div className={ styles.topbox }>
                <img
                  src="/Illustration.svg" // Caminho para a imagem na pasta public
                  alt="Ícone"
                  width={389} // Largura do ícone
                  height={394} // Altura do ícone
                />
              </div>
              <div className={ styles.bottombox }>
              <Button block type="primary" shape="round" icon={<FormOutlined />} size={"large"}>
                Cadastre-se
              </Button>
              <Button block shape="round" icon={<LoginOutlined />} size={"large"}>
                Entrar
              </Button>
              </div>
          </div>
          <div className={ styles.rightcolumn }>
            <Typography variant="h1" gutterBottom fontSize={65} fontWeight={700} mt={12} color={"#333333"}>
             PROCESSO DE DESENVOLVIMENTO DE PRODUTO
            </Typography>
            <Typography variant="h5" gutterBottom color={"#686363"}>
            Plataforma de Suporte Integral ao Desenvolvimento de Produtos e Criação de Projetos: Gerencie Cronogramas, Fases do PDP e Atividades.
            </Typography>
          </div>
      </div>
    </>
  );
};