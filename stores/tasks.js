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
        prosjektID: '0',
        step: 1,
        title: "Renovere deler",
        responsiblePerson: "Petter Tesdal",
        progress: 10,
        duration: 10,
    });
    tasks.value.push({
        ID: '00010002',
        prosjektID: '0',
        step: 2,
        title: "Syre bad",
        responsiblePerson: "Kristoffer Madsen",
        progress: 10,
        duration: 10,
    });
    tasks.value.push({
        ID: '00020003',
        prosjektID: '0',
        step: 1,
        title: "Syrebad",
        responsiblePerson: "Kristoffer Madsen",
        progress: 10,
        duration: 20,
    })
    tasks.value.push({
        ID: '00030002',
        prosjektID: '0',
        step: 1,
        title: "Syre bad",
        responsiblePerson: "Kristoffer Madsen",
        progress: 10,
        duration: 30,
    })

    // Funksjon for å legge til en task
    function addTask(ID, step, title, responsiblePerson, progress, duration) {
        const newTask = { ID, step, title, responsiblePerson, progress, duration };
        tasks.value.push(newTask);
    }

    function maxTaskDuration(projectID, gateNR) {
        let maxDuration = 0;
        //implementer logikk
        return maxDuration;
    }
    
    
    
    
    // Du oppgir gateID, så vil den filtrere ut alle gates som starter med sammeID som gateID
    function getGateTasks(gateIdPattern) {
        // Substring henter ut string fra starten og frem til lengden av gateID som ble oppgitt
        // Denne funksjonen funker nå også for prosjekt, og kan hente alle prosjektene til et prosjekt hvis man oppgir en prosjekt id
        return tasks.value.filter(task => task.ID.substring(0, gateIdPattern.length) === gateIdPattern);
    }

    return { tasks, addTask, getGateTasks, maxTaskDuration };
});
