import { ref, computed } from 'vue';
import { packProject } from '@/utils/packProject.js';
import { defineStore } from "pinia";

export const useTasksStore = defineStore('tasks', () => {
    // Vanlig Ref
    const tasks = ref([]);

    // Pusher opp noen eksempel tasks

    // Funksjon for å legge til en task
    async function addTask(taskID, gateID, step, title, responsiblePerson, duration) {

        const projectID = getProjectID(taskID);
        console.log("Making Task: " + title + " with step: " + step + " in project: " + projectID + "and gate: " + gateID)

        const requestBody = {
            projectID: projectID,
            gateID: gateID,
            step: step,
            title: title,
            responsiblePerson: responsiblePerson,
            duration: duration
        };

        try {
            const response = await $fetch('/tasks', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            await fetchTasks(projectID);

            let sortedTasks = getGateTasks(gateID).sort((a, b) => a.step - b.step);
            sortedTasks.forEach((task, index) => {
                task.step = index + 1;
            })
            updateTasksOrder(sortedTasks);
            await fetchTasks(projectID);
        } catch (error) {
            return createError({
                statusCode: 500,
                statusMessage: 'Internal Server Error',
                data: 'Failed to create project'
            });
        }
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
        console.log("This is newProgress: " + newProgress)
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

    function inTime(taskID) {
        const gateStore = useGatesStore();
        let onTime = false;
        let today = new Date();
        let duration = getTaskDuration(taskID);
        let progress = getTaskProgress(taskID);
        let remainderTime = duration - (duration * progress / 100)
        let SF = new Date(today.getTime() + (remainderTime * 86400000));
        let PF = gateStore.getSFG(getGateID(taskID))

        onTime = (PF >= SF.toISOString())

        return onTime
    }

    function getTaskDuration(taskID) {
        const task = tasks.value.find(task => task.ID === taskID);
        return task ? task.duration : null;
    }

    function getTaskProgress(taskID) {
        const task = tasks.value.find(task => task.ID === taskID);
        return task ? task.progress : null;
    }

    
    function getProjectID(taskID) {
        const task = tasks.value.find(task => task.ID === taskID);
        return task ? task.prosjektID : null;
    }

    function getGateID(taskID) {
        const task = tasks.value.find(task => task.ID === taskID);
        return task ? task.gateID : null;
    }

    function completedInTime(date, taskID) {
        const gateStore = useGatesStore();
        let inTime = false;
    
        const task = tasks.value.find(task => task.ID === taskID);
    
        if (task) {
            const gateID = task.gateID;
            const supposedDate = gateStore.getSFG(gateID);
            if (date >= supposedDate) {
                inTime = true;
            }
        }
    
        return inTime;
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
                comment: task.comment,
                completeDate: task.completeDate
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
        } catch (error) {
            console.error('Error updating task comment:', error);
        }
    }
    
    async function deleteTask(taskID) {
        try {
            const response = await $fetch(`/tasks/${taskID}`, {
                method: 'DELETE'
            });
            // If the deletion from the backend is successful, remove the project from the store
            tasks.value = tasks.value.filter(task => task.ID !== taskID);
            
        } catch (error) {
            console.error("Failed to delete task:", error);
        }
    }

    return { tasks, addTask, getGateID, getProjectID, getGateTasks, getTaskProgress, getTaskDuration, inTime, updateTaskProgress, updateTaskDuration, updateTasksOrder, maxTaskDuration, fetchTasks,updateTaskComment, completedInTime, deleteTask };
});
