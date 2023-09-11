import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import PageLayout from "../pageLayout";
import styles from './page.module.css';

export default function About() {
    return (
        <>
            <PageLayout> </PageLayout>
            <div className={styles.container}>
                <div className={styles.titleBox}>
                    <Typography variant="h3" gutterBottom fontWeight={500}>
                        SOBRE O PROJETO
                    </Typography>
                </div>
                <Divider variant="middle" />
                <div className={styles.boxContainer}>
                    <div className={styles.leftBox}>
                        <img
                            src="/pana.svg" // Caminho para a imagem na pasta public
                            alt="Ícone"
                            width={389} // Largura do ícone
                            height={394} // Altura do ícone
                        />
                    </div>
                    <div className={styles.rightBox}>
                        <Typography variant="h4" gutterBottom color={"#4D4D4D"}>
                            Impulsione seu processo de desenvolvimento de produto
                        </Typography>
                        <Typography variant="body1" gutterBottom color={"#717171"}>
                        A aplicação web MVP para gerenciamento de projetos com PDP foi concebida como uma solução que visa atender às necessidades iniciais das organizações, fornecendo as funcionalidades essenciais para o gerenciamento de projetos. Algumas das principais características 
                        e funcionalidades incluem: Criação de Projetos, Adição de Fases e Atividades e Acompanhamento de Progresso.
                        </Typography>
                    </div>
                </div>
            </div>
        </>
    );
};