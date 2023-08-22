import PageLayout from "./pageLayout";
import styles from './page.module.css'; 
import React from 'react';
import { Button } from 'antd';
import { FormOutlined, LoginOutlined } from '@ant-design/icons';
import Typography from '@mui/material/Typography';


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
            <Typography variant="h1" gutterBottom fontSize={60} fontWeight={600}>
             PROCESSO DE DESENVOLVIMENTO DE PRODUTO
            </Typography>
          </div>
      </div>
    </>
  );
};