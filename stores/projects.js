import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useProjectsStore = defineStore('projects', () => {
    const project = ref();
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
        comment: "This is a test project",
        archive: false // Add the archive status here
    });
    const index = ref(0);

    function setProjects(newProjects) {
        projects.value = newProjects;
    }

    async function fetchNonArchivedProjects() {
        try {
            const response = await $fetch('/projects', {
                method: 'GET'
            });
            const data = response.data;
            const projectsArray = Object.values(data).map(project => ({
                id: project.ID,
                title: project.title,
                progress: project.progress,
                onTimeDate: project.onTimeDate,
                PEM: project.PEM,
                comment: project.comment,
                POdate: project.POdate,
                SFdate: project.SFdate,
                archive: project.archive,
                gates: project.gates
            }));

            setProjects(projectsArray);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    }

    async function fetchProjects() {
        try {
            const response = await $fetch('/projects', {
                method: 'GET'
            });
            const data = response.data;
            const projectsArray = Object.values(data).map(project => ({
                id: project.ID,
                title: project.title,
                progress: project.progress,
                onTimeDate: project.onTimeDate,
                PEM: project.PEM,
                comment: project.comment,
                POdate: project.POdate,
                SFdate: project.SFdate,
                archive: project.archive,
                gates: project.gates
            }));

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
            await fetch(`/projects/title/${projectID}`, {
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
        for (let i = 0; i < projects.value.length; i++) {
            if (projects.value[i].id === projectID) {
                pro = projects.value[i];
            }
        }
        return computed(() => {
            return pro.POdate;
        });
    }

    function getProjectById(projectId) {
        return projects.value.find(project => project.id === projectId);
    }

    function getSFDate(projectID) {
        let pro;
        for (let i = 0; i < projects.value.length; i++) {
            if (projects.value[i].id === projectID) {
                pro = projects.value[i];
            }
        }
        return computed(() => {
            return pro.SFdate;
        });
    }

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
            await $fetch('/projects', {
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
            await $fetch(`/projects/${deleteID}`, {
                method: 'DELETE'
            });
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
            await fetch(`/projects/comment/${projectID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    projectID: projectID,
                    newComment: newComment
                })
            });
        } catch (error) {
            console.error('Error updating project comment:', error);
        }
    }

    async function updatePODate(projectID, newPODate) {
        const projectIndex = projects.value.findIndex(project => project.id === projectID);
        if (projectIndex !== -1) {
            projects.value[projectIndex].POdate = newPODate;
        }

        try {
            await fetch(`/projects/POdate/${projectID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    projectID: projectID,
                    newPODate: newPODate
                })
            });
        } catch (error) {
            console.error('Error updating project POdate:', error);
        }
    }

    async function archiveProject(projectID) {
        const projectIndex = projects.value.findIndex(project => project.id === projectID);
        if (projectIndex !== -1) {
            // Toggle the archive status
            projects.value[projectIndex].archive = !projects.value[projectIndex].archive;

            try {
                await fetch(`/projects/archive/${projectID}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        projectID: projectID,
                        archive: projects.value[projectIndex].archive
                    })
                });
            } catch (error) {
                console.error('Error updating project archive status:', error);
            }
        }
    }

    async function updateSFDate(projectID, newSFDate) {
        const projectIndex = projects.value.findIndex(project => project.id === projectID);
        if (projectIndex !== -1) {
            projects.value[projectIndex].SFdate = newSFDate;
        }

        try {
            await fetch(`/projects/SFdate/${projectID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    projectID: projectID,
                    newSFDate: newSFDate
                })
            });
        } catch (error) {
            console.error('Error updating project SFdate:', error);
        }
    }

    async function updatePEM(projectID, newPEM) {
        const projectIndex = projects.value.findIndex(project => project.id === projectID);
        if (projectIndex !== -1) {
            projects.value[projectIndex].PEM = newPEM;
        }

        try {
            await fetch(`/projects/PEM/${projectID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    projectID: projectID,
                    newPEM: newPEM
                })
            });
        } catch (error) {
            console.error('Error updating project PEM:', error);
        }
    }

    async function calculateWorkDuration(prosjektID){
        const gateStore = useGatesStore()
        const taskStore = useTasksStore()
        let workDuration = 0
        console.log("INIT")
        let filteredGates = gateStore.getProjectGates(prosjektID)
        console.log(filteredGates)
        for (const gate of filteredGates) {
            const maxDuration = taskStore.maxTaskWorkDuration(prosjektID, gate.ID);
            console.log("Attempting to add:", maxDuration);
            workDuration += maxDuration;
        }
        return workDuration
    }

    return {
        getTemplate,
        filteredProjects,
        template,
        project,
        projects,
        getProjects,
        getProjectById,
        addProject,
        setProjects,
        fetchProjects,
        getPODate,
        deleteProject,
        getSFDate,
        updateProjectTitle,
        updateProjectComment,
        updatePODate,
        updateSFDate,
        updatePEM,
        fetchNonArchivedProjects,
        archiveProject,
        calculateWorkDuration
    };
});
