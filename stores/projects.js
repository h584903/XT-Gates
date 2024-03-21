import { ref, computed } from 'vue';
import { packProject } from '@/utils/packProject.js';
import { defineStore } from "pinia";

export const useProjectsStore = defineStore('projects', () => {
	// denne brukes hvis man vil hente et spesifikt object, må implementere metode for det da
	const project = ref();
	// listen av prosjekter
	const projects = ref([]);
	// Get function, denne trengs kanskje ikke
	const getProjects = computed(() => projects);
	// Funksjon for å legge til et prosjekt i listen
	function addProject(title, progress, plannedDate, PODate, status, comment) {
		this.projects.push(packProject(title, progress, plannedDate, PODate, status, comment))
	};
	return { project, projects, getProjects, addProject }
});
