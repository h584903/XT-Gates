import { ref, computed } from 'vue';
import { packProject } from '@/utils/packProject.js';
import { defineStore } from "pinia";

export const useProjectsStore = defineStore('projects', () => {
	const project = ref();
	const projects = ref([]);
	const getProjects = computed(() => projects);
	function addProject(title, progress, plannedDate, PODate, status, comment) {
		this.projects.push(packProject(title, progress, plannedDate, PODate, status, comment))
	};
	return { project, projects, getProjects, addProject }
});
