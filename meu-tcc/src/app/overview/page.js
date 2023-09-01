'use client'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Card, CardActionArea, CardActions } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Fab from '@mui/material/Fab';
import { useState, useEffect } from 'react';
import MenuLateral from '../menu';
import PageLayout from '../pageLayout';
import Table from '../table';
import FormDialogAddProject from './addProject';
import DeleteProjectDialog from './deleteProjectDialog';
import EditProjectDialog from './editProject';
import styles from './page.module.css';

export default function PageOverview() {

    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [projects, setProjects] = useState([]); // Estado para armazenar a lista de projetos

    useEffect(() => {
        // Recupera a lista de projetos da API ao carregar a página
        fetch('/api/projects/get')
            .then(response => response.json())
            .then(data => {
                console.log('Data from API:', data.projects.rows);
                if (data.projects && data.projects.rows) {
                    setProjects(data.projects.rows);
                }
            })
            .catch(error => {
                console.error('Error fetching projects:', error);
            });
    }, []);
        

    const handleAddButtonClick = () => {
        setIsAddDialogOpen(true);
    };

    const handleEditButtonClick = () => {
        setIsEditDialogOpen(true);
    };

    const handleDeleteButtonClick = () => {
        setIsDeleteDialogOpen(true);
    };

    const handleCloseDialogs = () => {
        setIsAddDialogOpen(false);
        setIsEditDialogOpen(false);
        setIsDeleteDialogOpen(false);
        // Aqui você pode salvar o objeto projectData em algum estado ou realizar outra ação
        // por exemplo, setProject(projectData) ou enviar para o backend
    };

    const handleDelete = async (projectId) => {
        try {
            const updatedProjects = projects.filter((project) => project.id !== projectId);
            setProjects(updatedProjects);
        } catch (error) {
            console.error('Error handling project deletion:', error);
        }
    };

    const handleProjectAdd = (newProject) => {
        // Aqui você pode atualizar a lista de projetos com o novo projeto
        console.log('Novo projeto criado:', newProject);
            // Atualize a lista de projetos com o novo projeto
        setProjects((prevProjects) => [...prevProjects, newProject]);

        // Feche o diálogo de adição de projeto
        handleCloseDialogs();

        // Recarregue a página após adicionar o projeto
        window.location.reload();
    };

    return (
        <>
            <PageLayout> </PageLayout>
            <div className={styles.container}>
                <MenuLateral />
                <div className={styles.table}>
                    <Card>
                        <CardContent>
                            <Table></Table>
                        </CardContent>
                        <CardActionArea>
                            <CardActions className={styles.buttons}>
                                <Fab color="primary" aria-label="add" onClick={handleAddButtonClick}>
                                    <AddIcon className={styles.button} />
                                </Fab>
                                <Fab color="secondary" aria-label="edit" onClick={handleEditButtonClick}>
                                    <EditIcon />
                                </Fab>
                                <Fab color="error" aria-label="delete" onClick={handleDeleteButtonClick}>
                                    <DeleteIcon />
                                </Fab>
                            </CardActions>
                        </CardActionArea>
                    </Card>
                </div>
            </div>
            <FormDialogAddProject
                open={isAddDialogOpen}
                onClose={handleCloseDialogs}
                onAdd={handleProjectAdd} />
            <EditProjectDialog open={isEditDialogOpen} onClose={handleCloseDialogs} projects={projects} setProjects={setProjects} />
            <DeleteProjectDialog
                open={isDeleteDialogOpen}
                onClose={handleCloseDialogs}
                projects={projects}
                onDelete={handleDelete}
            />
        </>
    );
}
