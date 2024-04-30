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
        gateNR: '1',
        step: 1,
        title: "Renovere deler",
        responsiblePerson: "Petter Tesdal",
        progress: 10,
        duration: 10,
    });
    tasks.value.push({
        ID: '00010002',
        prosjektID: '0',
        gateNR: '1',
        step: 2,
        title: "Syre bad",
        responsiblePerson: "Kristoffer Madsen",
        progress: 10,
        duration: 10,
    });
    tasks.value.push({
        ID: '00020003',
        prosjektID: '0',
        gateNR: '2',
        step: 1,
        title: "Syrebad",
        responsiblePerson: "Kristoffer Madsen",
        progress: 10,
        duration: 20,
    })
    tasks.value.push({
        ID: '00030002',
        prosjektID: '0',
        gateNR: '3',
        step: 1,
        title: "Syre bad",
        responsiblePerson: "Kristoffer Madsen",
        progress: 10,
        duration: 137,
    })

    // Funksjon for å legge til en task
    function addTask(ID, step, title, responsiblePerson, progress, duration) {
        const newTask = { ID, step, title, responsiblePerson, progress, duration };
        tasks.value.push(newTask);
    }

    function maxTaskDuration(prosjektID, gateNR) {
        let maxDuration = 0;
        for (let i = 0; i<tasks.value.length; i++) {
            let rettGate = false;
            let rettProsjekt = false;
            rettProsjekt = (Number(tasks.value[i].prosjektID) === prosjektID) 
            rettGate = (Number(tasks.value[i].gateNR) === (gateNR+1))
            if(tasks.value[i].duration>maxDuration && rettGate && rettProsjekt) {
                maxDuration = tasks.value[i].duration
            }
        }
        return maxDuration;
    }




    // Du oppgir gateID, så vil den filtrere ut alle gates som starter med sammeID som gateID
    function getGateTasks(gateIdPattern) {
        // Substring henter ut string fra starten og frem til lengden av gateID som ble oppgitt
        // Denne funksjonen funker nå også for prosjekt, og kan hente alle prosjektene til et prosjekt hvis man oppgir en prosjekt id
        return tasks.value.filter(task => task.ID.substring(0, gateIdPattern.length) === gateIdPattern);
    }


    function updateTaskProgress(taskID, newProgress) {
        const taskIndex = tasks.value.findIndex(t => t.ID === taskID);
        if (taskIndex !== -1) {
            tasks.value[taskIndex].progress = newProgress;
        }
    }

    function updateTaskDuration() {
        const taskIndex = tasks.value.findIndex(t => t.ID === taskID);
        if (taskIndex !== -1) {
            tasks.value[taskIndex].duration = newDuration;
        }
    }

    function setTasks(newTasks) {
        tasks.value = newTasks;
    }
    async function fetchTasks(taskID) {
        console.log('Fetching tasks...');
        try {
            const response = await $fetch('/tasks/' + taskID, {
                method: 'GET'
            });

            const taskArray = response.map(task => ({
                ID: task.ID.toString(),
                prosjektID: task.prosjektID,
                step: task.step,
                title: task.title,
                responsiblePerson: task.responsiblePerson,
                onTime: task.onTime,
                progress: task.progress,
                duration: task.duration
            }));

            setTasks(taskArray)
            console.log(tasks.value);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }


    return { tasks, addTask, getGateTasks, updateTaskProgress, updateTaskDuration, maxTaskDuration, fetchTasks };
});
