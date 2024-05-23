import { ref, computed } from 'vue';
import { defineStore } from "pinia";

export const useTasksStore = defineStore('tasks', () => {
    const tasks = ref([]);

    async function addTask(gateID, step, title, responsiblePerson, duration) {
        const gateStore = useGatesStore();
        const projectID = gateStore.getProjectID(gateID);
        console.log("Making Task: " + title + " with step: " + step + " in project: " + projectID + "and gate: " + gateID);

        const requestBody = {
            projectID: projectID,
            gateID: gateID,
            step: step,
            title: title,
            responsiblePerson: responsiblePerson,
            duration: duration,
            completeDate: null
        };
        console.log(requestBody);

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
            });
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
        const gates = useGatesStore();
        for (let i = 0; i < tasks.value.length; i++) {
            let rettGate = false;
            let rettProsjekt = false;

            rettProsjekt = (tasks.value[i].prosjektID === Number(prosjektID));
            rettGate = (gates.getGateNR(tasks.value[i].gateID) === (gateNR + 1));
            if (tasks.value[i].duration > maxDuration && rettGate && rettProsjekt) {
                maxDuration = tasks.value[i].duration;
            }
        }
        return maxDuration;
    }

    function getGateTasks(gateID) {
        const filteredTasks = tasks.value.filter(task => task.gateID == gateID);
        filteredTasks.sort((a, b) => a.step - b.step);
        return filteredTasks;
    }

    async function updateTaskProgress(taskID, newProgress) {
        const taskIndex = tasks.value.findIndex(t => t.ID === taskID);
        console.log("This is newProgress: " + newProgress);
        if (taskIndex !== -1) {
            tasks.value[taskIndex].progress = newProgress;
        }

        try {
            const response = await fetch(`/tasks/progress/` + taskID, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    taskID: taskID,
                    newProgress: newProgress
                })
            });
            const gateStore = useGatesStore();
            console.log("Starting up updateGateProgress");
            gateStore.updateGateProgress(getGateID(taskID));
        } catch (error) {
            console.error('Error updating task progress:', error);
        }
    }

    async function updateTaskDuration(taskID, newDuration) {
        const taskIndex = tasks.value.findIndex(t => t.ID === taskID);
        if (taskIndex !== -1) {
            tasks.value[taskIndex].duration = newDuration;
        }

        try {
            const response = await fetch(`/tasks/` + taskID, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    taskID: taskID,
                    newDuration: newDuration
                })
            });
            const gateStore = useGatesStore();
            gateStore.updateGateProgress(getGateID(taskID));
        } catch (error) {
            console.error('Error updating task duration:', error);
        }
    }

    async function updateTasksOrder(newTasks) {
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
        let remainderTime = duration - (duration * progress / 100);
        let SF = new Date(today.getTime() + (remainderTime * 86400000));
        let PF = gateStore.getSFG(getGateID(taskID));

        onTime = (PF >= SF.toISOString());

        return onTime;
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

    async function updateDate(taskID) {
        const authStore = useAuthStore();
        var today = new Date();
        var username = authStore.getUsername();
        var formattedDate = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
        try {
            const response = await $fetch('/tasks/completeDate/' + taskID, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    taskID: taskID,
                    newDate: formattedDate
                })
            });
            const taskIndex = tasks.value.findIndex(t => t.ID === taskID);
            if (taskIndex !== -1) {
                tasks.value[taskIndex].completeDate = formattedDate;
            }
        } catch (error) {
            console.error('Error updating date', error);
        }

        try {
            const response = await $fetch('/tasks/updateUser/' + taskID, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    taskID: taskID,
                    newUser: username
                })
            });
            console.log("USERNAME: " + username);
            const taskIndex = tasks.value.findIndex(t => t.ID === taskID);
            if (taskIndex !== -1) {
                tasks.value[taskIndex].updateUser = username;
            }
        } catch (error) {
            console.error('Error updating user', error);
        }
    }

    async function maxTaskWorkDuration(prosjektID, gateID) {
        let maxWork = 0;
        const filteredTasks = getGateTasks(gateID)

        filteredTasks.forEach(task => {
            if(task.duration - (task.duration * task.progress/100) > maxWork) {
                maxWork = task.duration - (task.duration * task.progress/100);
            }
        });

        return maxWork;
    }

    async function updateTaskResponsiblePerson(taskID, newResponsiblePerson) {
        const taskIndex = tasks.value.findIndex(t => t.ID === taskID);
        if (taskIndex !== -1) {
            tasks.value[taskIndex].responsiblePerson = newResponsiblePerson;
        }

        try {
            const response = await fetch(`/tasks/responsiblePerson/${taskID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    taskID: taskID,
                    newResponsiblePerson: newResponsiblePerson
                })
            });

            // Handle response if needed
        } catch (error) {
            console.error('Error updating task responsible person:', error);
        }
    }

    function setTasks(newTasks) {
        tasks.value = newTasks;
    }

    async function fetchTasks(projectID) {
        try {
            const response = await $fetch('/tasks/' + projectID, {
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
                completeDate: task.completeDate,
                updateUser: task.updateUser
            }));
            setTasks(taskArray);
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

    async function updateTaskTitle(taskID, newTitle) {
        const taskIndex = tasks.value.findIndex(t => t.ID === taskID);
        if (taskIndex !== -1) {
            tasks.value[taskIndex].title = newTitle;
        }

        try {
            const response = await fetch(`/tasks/title/${taskID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    taskID: taskID,
                    newTitle: newTitle
                })
            });
        } catch (error) {
            console.error('Error updating task title:', error);
        }
    }

    async function deleteTask(taskID, step) {
        try {
            const response = await $fetch(`/tasks/${taskID}`, {
                method: 'DELETE'
            });
            fetchTasks(getProjectID(taskID));
        } catch (error) {
            console.error("Failed to delete task:", error);
        }
    }

    return { 
        tasks,
        addTask, 
        updateDate, 
        getGateID, 
        getProjectID, 
        getGateTasks, 
        getTaskProgress, 
        getTaskDuration, 
        inTime, 
        updateTaskProgress, 
        updateTaskDuration,
        updateTasksOrder, 
        maxTaskDuration, 
        fetchTasks,
        updateTaskComment,
        completedInTime,
        deleteTask,
        updateTaskResponsiblePerson,
        updateTaskTitle,
        maxTaskWorkDuration
    };
});
