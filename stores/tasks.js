import { ref, computed } from 'vue';
import { packProject } from '@/utils/packProject.js';
import { defineStore } from "pinia";

export const useTasksStore = defineStore('tasks', () => {
    // Vanlig Ref
    const tasks = ref([]);

    // Pusher opp noen eksempel tasks

    // Funksjon for å legge til en task
    function addTask(ID, step, title, responsiblePerson, progress, duration) {
        const newTask = { ID, step, title, responsiblePerson, progress, duration };
        tasks.value.push(newTask);
    }

    function maxTaskDuration(prosjektID, gateNR) {
        let maxDuration = 0;
        const gates = useGatesStore()
        for (let i = 0; i<tasks.value.length; i++) {
            let rettGate = false;
            let rettProsjekt = false;

            rettProsjekt = (tasks.value[i].prosjektID === Number(prosjektID))
            rettGate = (gates.getGateNR(tasks.value[i].gateID) === (gateNR+1))
            if(tasks.value[i].duration>maxDuration && rettGate && rettProsjekt) {
                maxDuration = tasks.value[i].duration
            }
        }
        return maxDuration;
    }




    // Du oppgir gateID, så vil den filtrere ut alle gates som starter med sammeID som gateID
    function getGateTasks(gateID) {
        // Substring henter ut string fra starten og frem til lengden av gateID som ble oppgitt
        // Denne funksjonen funker nå også for prosjekt, og kan hente alle prosjektene til et prosjekt hvis man oppgir en prosjekt id
        const filteredTasks = tasks.value.filter(task => task.gateID == gateID);
        filteredTasks.sort((a, b) => a.step - b.step);
        return filteredTasks;
    }


    async function updateTaskProgress(taskID, newProgress) {
        const taskIndex = tasks.value.findIndex(t => t.ID === taskID);
        if (taskIndex !== -1) {
            tasks.value[taskIndex].progress = newProgress;
        }
        // Her oppdaterer jeg tasken i databasen gjennom PUT api
        try {
            const response = await fetch(`/tasks/progress/`+taskID, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    taskID: taskID,
                    newProgress: newProgress
                })
            });
        } catch (error) {
            console.error('Error updating task progress:', error);
        }
    }

    async function updateTaskDuration(taskID, newDuration) {
        const taskIndex = tasks.value.findIndex(t => t.ID === taskID);
        if (taskIndex !== -1) {
            tasks.value[taskIndex].duration = newDuration;
        }

        // Her oppdaterer jeg tasken i databasen gjennom PUT api
        try {
            const response = await fetch(`/tasks/`+taskID, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    taskID: taskID,
                    newDuration: newDuration
                    })
            });
        } catch (error) {
            console.error('Error updating task duration:', error);
        }
    }

    async function updateTasksOrder(newTasks) {

        // Sender de nye stepsene til databasen
        try {
            const response = await fetch(`/tasks/order`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tasks: newTasks
                })
            });
        } catch (error) {
            console.error('Error updating tasks order:', error);
        }
    }


    function setTasks(newTasks) {
        tasks.value = newTasks;
    }
    async function fetchTasks(taskID) {
        try {
            const response = await $fetch('/tasks/' + taskID, {
                method: 'GET'
            });

            const taskArray = response.map(task => ({
                ID: task.ID.toString(),
                prosjektID: task.prosjektID,
                gateID: task.gateID,
                step: task.step,
                title: task.title,
                responsiblePerson: task.responsiblePerson,
                onTime: task.onTime,
                progress: task.progress,
                duration: task.duration,
                comment: task.comment
            }));

            setTasks(taskArray)
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }

    async function updateTaskComment(taskID, newComment) {
        const taskIndex = tasks.value.findIndex(t => t.ID === taskID);
        if (taskIndex !== -1) {
            tasks.value[taskIndex].comment = newComment;
        }
    
        try {
            const response = await fetch(`/tasks/comment/${taskID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    taskID: taskID,
                    newComment: newComment
                })
            });
            
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error updating task comment:', error);
        }
    }
    

    return { tasks, addTask, getGateTasks, updateTaskProgress, updateTaskDuration, updateTasksOrder, maxTaskDuration, fetchTasks,updateTaskComment };
});
