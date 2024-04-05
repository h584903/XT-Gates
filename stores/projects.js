import { ref, computed } from 'vue';
import { packProject } from '@/utils/packProject.js';
import { defineStore } from "pinia";
import { jsx } from 'vue/jsx-runtime';

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
<<<<<<< HEAD
	async function addProject(title, progress, plannedDate, PODate, status, PEM, comment) {
        const plannedDateString = plannedDate.toISOString();
        const PODateString = PODate.toISOString();

        const requestBody = {
            title: title,
            progress: progress,
            plannedDate: plannedDateString,
            PODate: PODateString,
            status: status,
            PEM: PEM,
            comment: comment
        };
=======

	async function addProject(id, title, progress, plannedDate, PODate, status, person, comment) {


		this.projects.push(packProject(id, title, progress, plannedDate, PODate, status, person, comment))
		index.value++;
		const data = await $fetch('/projects', {
			method: 'GET'
		});
>>>>>>> origin/main

        try {
            const response = await $fetch('/projects', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            // Assuming successful response, add project to the store
            projects.value.push(packProject(index.value, title, progress, plannedDateString, PODateString, status, PEM, comment));
            index.value++;
        } catch (error) {
            return createError({
                statusCode: 500,
                statusMessage: 'Internal Server Error',
                data: 'Failed to create project'
            });
        }
    }
	return { project, projects, getProjectById, addProject }
});
