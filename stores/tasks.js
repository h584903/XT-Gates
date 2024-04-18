import { ref, computed } from 'vue';
import { packProject } from '@/utils/packProject.js';
import { defineStore } from "pinia";

export const useTasksStore = defineStore('tasks', () => {
    // State for defining data accessible through all components
    const tasks = ref([]);
    
    tasks.value.push({
        ID: '00010001',
        step: 1,
        title: "Renovere deler",
        responsiblePerson: "Petter Tesdal",
        progress: 10,
        duration: 10,
    });
    tasks.value.push({
        ID: '00010002',
        step: 2,
        title: "Syre bad",
        responsiblePerson: "Kristoffer Madsen",
        progress: 10,
        duration: 10,
    });

    // Function to add a task
    function addTask(ID, step, title, responsiblePerson, progress, duration) {
        const newTask = { ID, step, title, responsiblePerson, progress, duration };
        tasks.value.push(newTask);
    }
    
    // Method to get tasks belonging to a specific gate
    function getGateTasks(gateIdPattern) {
        return tasks.value.filter(task => task.ID.substring(0, gateIdPattern.length) === gateIdPattern);
    }

    return { tasks, addTask, getGateTasks };
});
