import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import PageLayout from '../pageLayout';
import styles from './page.module.css';


export default function PDPphases() {
    return (
        <>
            <PageLayout> </PageLayout>
            <div className={styles.container}>
                <div className={styles.titleBox}>
                    <Typography variant="h3" gutterBottom fontWeight={500} fontSize={40}>
                        PROCESSO DE DESENVOLVIMENTO DE PRODUTO
                    </Typography>
                </div>
                <div className={styles.divider}>
                    <Divider variant="middle" />
                </div>
                <Card className={styles.boxContainer} elevation={3}>
                    <CardContent>
                        <Typography variant="h4" gutterBottom>
                            <LightbulbIcon color="primary" fontSize="large" sx={{ marginRight: 1 }} />
                            O que é?
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            O PDP, ou Processo de Desenvolvimento de Produto, é uma abordagem sistemática e organizada para criar, projetar e desenvolver produtos desde a concepção até a produção e lançamento no mercado. Ele é uma metodologia que guia equipes de desenvolvimento, engenheiros, designers, especialistas em marketing e outros profissionais na jornada de criar novos produtos ou aprimorar produtos existentes.
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            O objetivo do PDP é garantir que o desenvolvimento do produto seja eficiente, eficaz e bem-sucedido, atendendo aos requisitos dos clientes, considerando a viabilidade técnica e econômica, e alcançando os objetivos de negócios da empresa. Ele também visa minimizar riscos, custos e retrabalho ao longo do processo de desenvolvimento.
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            O PDP envolve várias etapas sequenciais, cada uma com um foco específico, incluindo pesquisa de mercado, geração de ideias, design conceitual, prototipagem, desenvolvimento, testes, validações e lançamento. As etapas exatas podem variar dependendo da empresa, do setor e das práticas adotadas, mas o PDP geralmente abrange as seguintes áreas:
                        </Typography>
                    </CardContent>
                    <CardMedia
                        sx={{ height: 1150, width: 1150 }}
                        image="/div.svg"
                        title="Fases do PDP"
                    />
                </Card>
            </div>
        </>
    );
};