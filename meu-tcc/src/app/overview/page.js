'use client'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Card, CardActionArea, CardActions, Stack, Typography, Avatar, Divider } from '@mui/material';
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
import PersonIcon from '@mui/icons-material/Person';

export default function PageOverview() {

    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch('/api/projects/get')
            .then(response => response.json())
            .then(async (data) => {
                if (data.projects && data.projects.rows) {
                    const updatedProjects = await Promise.all(data.projects.rows.map(async (project) => {
                        if (project.current_phase_id !== null) {
                            const phaseResponse = await fetch(`/api/phase/get/phase?phaseId=${project.current_phase_id}`);
                            const phaseData = await phaseResponse.json();
                            if (phaseData.phase) {
                                project.current_phase_name = phaseData.phase.rows[0].name;
                            }
                        }
                        return project;
                    }));
                    setProjects(updatedProjects);
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
        setProjects((prevProjects) => [...prevProjects, newProject]);

        handleCloseDialogs();
        window.location.reload();
    };

    return (
        <>
            <PageLayout> </PageLayout>
            <div className={styles.container}>
                <MenuLateral />
                <div className={styles.table}>
                    <div className={styles.title}>
                        <Stack direction="row" justifyContent="space-between" alignItems="end" sx={{ marginBottom: '10px', marginTop: '13px', 
                        marginLeft: '10px', marginRight: '10px' }}>
                            <Typography variant="h1" gutterBottom style={{
                                fontSize: '20px', fontWeight: '900', color: 'grey',
                                paddingTop: '10px'
                            }}>
                                Projetos
                            </Typography>
                            <Avatar>
                                <PersonIcon />
                            </Avatar>
                        </Stack>
                        <Divider />
                    </div >
                    <Card>
                        <CardContent>
                            <Table projects={projects} ></Table>
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
