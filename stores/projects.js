import { ref, computed } from 'vue';
import { packProject } from '@/utils/packProject.js';
import { defineStore } from "pinia";


export const useProjectsStore = defineStore('projects', () => {
	// denne brukes hvis man vil hente et spesifikt object, må implementere metode for det da
	const project = ref();
	// listen av prosjekter
	const projects = ref([]);
    projects.value.push({
        id: 0,
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
		console.log("Legger til alt i store igjen")
		projects.value = newProjects;
	  }

	// hente og oppdatere prosjekter
  async function fetchProjects() {
		console.log('Fetching projects...');
    try {
      const response = await $fetch('/projects', {
        method: 'GET'
      });

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

      setProjects(projectsArray);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  }
  
  function getProjects() {
		return projects.value;
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
      console.log(projectId)
      return projects.value.find(project => parseInt(project.id, 10) === projectId);
  }

  async function deleteProject(deleteID) {
    console.log(`Store attempting to delete project with ID ${deleteID}`)
    try {
      console.log("Store sending deletion to back-end")
      const response = await $fetch(`/projects/${deleteID}`, {
        method: 'DELETE'
      })
    } catch (error) {
      console.log("Failed")
    }
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

            // Assuming successful response, add project to the store
            projects.value.push(requestBody);

            index.value++;
        } catch (error) {
            return createError({
                statusCode: 500,
                statusMessage: 'Internal Server Error',
                data: 'Failed to create project'
            });
        }
    }

	return { project, projects, getProjects,getProjectById, addProject, setProjects, fetchProjects, getPODate, deleteProject}
    
});
