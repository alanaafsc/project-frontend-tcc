import PageLayout from "../pageLayout"
import styles from './page.module.css'; 
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

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
                        body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                        blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
                        neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
                        quasi quidem quibusdam.
                    </Typography>
                </div>
            </div>
        </div>
    </>
    );
};