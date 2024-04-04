import { ref, computed } from 'vue';
import { packProject } from '@/utils/packProject.js';
import { defineStore } from "pinia";

export const useGatesStore = defineStore('gates', () => {
    // State for defining data accessible through all components
    const gates = ref([]);

    // Function to add a gate to the gates array
    function addGate(projectID, title, progress, plannedDate, remaining, daysToEnd, completion) {
        const newGate = { projectID, title, progress, plannedDate, remaining, daysToEnd, completion };
        gates.value.push(newGate);
    }
    
    // Computed property to get gates belonging to a specific project
    const getProjectGates = (projectID) => {
        return computed(() => gates.value.filter(gate => gate.projectID === projectID));
    };

    // Example usage to console log the result of getProjectGates


    return { gates, addGate, getProjectGates };
});
