import { ref, computed } from 'vue';
import { packProject } from '@/utils/packProject.js';
import { defineStore } from "pinia";

export const useTasksStore = defineStore('tasks', () => {
    // Vanlig Ref
    const tasks = ref([]);
    
    // Pusher opp noen eksempel tasks
    tasks.value.push({
        // ID er nå en string, siden det er enklest å behandle og gir mest mening
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

    // Funksjon for å legge til en task
    function addTask(ID, step, title, responsiblePerson, progress, duration) {
        const newTask = { ID, step, title, responsiblePerson, progress, duration };
        tasks.value.push(newTask);
    }
    
    // Du oppgir gateID, så vil den filtrere ut alle gates som starter med sammeID som gateID
    function getGateTasks(gateIdPattern) {
        // Substring henter ut string fra starten og frem til lengden av gateID som ble oppgitt
        // Denne funksjonen funker nå også for prosjekt, og kan hente alle prosjektene til et prosjekt hvis man oppgir en prosjekt id
        return tasks.value.filter(task => task.ID.substring(0, gateIdPattern.length) === gateIdPattern);
    }

    return { tasks, addTask, getGateTasks };
});
