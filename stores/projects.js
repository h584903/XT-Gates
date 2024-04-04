import { ref, computed } from 'vue';
import { packProject } from '@/utils/packProject.js';
import { defineStore } from "pinia";


export const useProjectsStore = defineStore('projects', () => {
	// denne brukes hvis man vil hente et spesifikt object, må implementere metode for det da
	const project = ref();
	// listen av prosjekter
	const projects = ref([]);
	const index = ref (0)
	
	function getProjectById(projectId) {
		console.log(projectId)
		return projects.value.find(project => parseInt(project.id, 10) === projectId);
		
	}
	// Funksjon for å legge til et prosjekt i listen
	
	async function addProject(title, progress, plannedDate, PODate, status, person, comment) {
		this.projects.push(packProject(title, progress, plannedDate, PODate, status, person, comment))
		index.value++;
		const data = await $fetch('/projects', {
			method: 'GET'
		});

		console.log("This is the data");
		console.log(data);

	};
	return { project, projects, getProjectById, addProject }
});
