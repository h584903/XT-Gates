import { ref, computed } from 'vue';
import { packProject } from '@/utils/packProject.js';
import { defineStore } from "pinia";


export const useProjectsStore = defineStore('projects', () => {
    // denne brukes hvis man vil hente et spesifikt object, må implementere metode for det da
    const project = ref();
    // listen av prosjekter
    const projects = ref([]);
    const template = ref(1);
    projects.value.push({
        id: "0",
        title: "Test Project",
        progress: 50,
        SFdate: "2024-12-12",
        POdate: "2024-12-12",
        onTime: 1,
        PEM: "Petter Tesdal",
        comment: "This is a test project"
    });
    const index = ref (0)

    function setProjects(newProjects) {
        projects.value = newProjects;
    }

    // hente og oppdatere prosjekter
    async function fetchProjects() {
        try {
            const response = await $fetch('/projects', {
                method: 'GET'
            });
            console.log('Response Data:', response.data);
            const data = response.data;
            const projectsArray = Object.values(data).map(project => ({
                id: project.ID,
                title: project.title,
                progress: project.progress,
                onTime: project.onTime,
                PEM: project.PEM,
                comment: project.comment,
                POdate: project.POdate,
                SFdate: project.SFdate,
                archive: project.archive,
                gates: project.gates
            }));
            
            console.log('Projects Array:', projectsArray);   
            setProjects(projectsArray);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    }

    async function updateProjectTitle(projectID, newTitle) {
        const projectIndex = projects.value.findIndex(project => project.id === projectID);
        if (projectIndex !== -1) {
            projects.value[projectIndex].title = newTitle;
        }
        
        try {
            const response = await fetch(`/projects/title/${projectID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    projectID: projectID,
                    newTitle: newTitle
                })
            });
        } catch (error) {
            console.error('Error updating project title:', error);
        }
    }

    function getTemplate() {
        return template.value;
    }

    const filteredProjects = computed(() => {
        return projects.value.filter(project => project.id != template.value);
    });

    function getProjects() {
        return filteredProjects.value;
    }

    function getPODate(projectID) {
        let pro;
        for (let i = 0; i<projects.value.length; i++) {
            if(projects.value[i].id === projectID) {
                pro = projects.value[i]
            }
        }
        return computed(() => {
            return pro.POdate
        })
    }

    function getProjectById(projectId) {
        return projects.value.find(project => project.id === projectId);
      }

    function getSFDate(projectID) {
        let pro;
        for (let i = 0; i<projects.value.length; i++) {
            if(projects.value[i].id === projectID) {
                pro = projects.value[i]
            }
        }
        return computed(() => {
            return pro.SFdate
        })
    }



    // Funksjon for å legge til et prosjekt i listen
    async function addProject(ID, title, progress, plannedDate, PODate, status, PEM, comment) {


        const requestBody = {
            ID: ID,
            title: title,
            progress: progress,
            plannedDate: plannedDate,
            PODate: PODate,
            status: status,
            PEM: PEM,
            comment: comment
        };

        try {
            const response = await $fetch('/projects', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            this.fetchProjects();

            index.value++;
        } catch (error) {
            return createError({
                statusCode: 500,
                statusMessage: 'Internal Server Error',
                data: 'Failed to create project'
            });
        }
    }

    async function deleteProject(deleteID) {
        try {
            const response = await $fetch(`/projects/${deleteID}`, {
                method: 'DELETE'
            });
            // If the deletion from the backend is successful, remove the project from the store
            projects.value = projects.value.filter(project => project.id !== deleteID);
            
        } catch (error) {
            console.error("Failed to delete project:", error);
        }
    }     
    
    async function updateProjectComment(projectID, newComment) {
        const projectIndex = projects.value.findIndex(project => project.id === projectID);
        if (projectIndex !== -1) {
            projects.value[projectIndex].comment = newComment;
        }
    
        try {
            const response = await fetch(`/projects/comment/${projectID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    projectID: projectID,
                    newComment: newComment
                })
            });
            // Assuming the backend successfully updates the comment, no further action is needed here.
        } catch (error) {
            console.error('Error updating project comment:', error);
        }
    }

    async function updatePODate(projectID, newPODate) {
        // Find the project by ID
        const projectIndex = projects.value.findIndex(project => project.id === projectID);
        if (projectIndex !== -1) {
            // Update the POdate property of the project
            projects.value[projectIndex].POdate = newPODate;
        }
    
        try {
            // Make a PUT request to update the POdate in the backend
            const response = await fetch(`/projects/POdate/${projectID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    projectID: projectID,
                    newPODate: newPODate
                })
            });
            // Handle response if needed
        } catch (error) {
            console.error('Error updating project POdate:', error);
        }
    }
    
    async function updatePEM(projectID, newPEM) {
        // Find the project by ID
        const projectIndex = projects.value.findIndex(project => project.id === projectID);
        if (projectIndex !== -1) {
            // Update the POdate property of the project
            projects.value[projectIndex].PEM = newPEM;
        }
    
        try {
            // Make a PUT request to update the POdate in the backend
            const response = await fetch(`/projects/PEM/${projectID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    projectID: projectID,
                    newPEM: newPEM
                })
            });
            // Handle response if needed
        } catch (error) {
            console.error('Error updating project PEM:', error);
        }
    }
    
    

  return { getTemplate, filteredProjects, template, project, projects, getProjects, getProjectById, addProject, setProjects, fetchProjects, getPODate, deleteProject, getSFDate, updateProjectTitle, updateProjectComment, updatePODate, updatePEM}

});
