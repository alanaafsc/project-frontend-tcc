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
                        CONTATO
                    </Typography>
                </div>
                <Divider variant="middle" />
                <div className={styles.boxContainer}>
                    <div className={styles.leftBox}>
                        <img
                            src="/pana.svg" 
                            alt="Ícone"
                            width={389} 
                            height={394}
                        />
                    </div>
                    <div className={styles.rightBox}>
                        <Typography variant="h4" gutterBottom color={"#4D4D4D"}>
                            CONTATE-NOS
                        </Typography>
                        <Typography variant="body1" gutterBottom color={"#717171"}>
                            E-mail: alana.ingrid@ufpe.br
                        </Typography>
                        <Typography variant="body1" gutterBottom color={"#717171"}>
                            Endereço: Av. da Arquitetura, s/n - Cidade Universitária, Recife - PE, 50740-550
                            CTG - Centro de Tecnologia e Geociências - UFPE
                        </Typography>

                    </div>
                </div>
            </div>
        </>
    );
};