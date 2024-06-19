import { ref, computed } from 'vue';
import { packProject } from '@/utils/packProject.js';
import { defineStore } from "pinia";


export const useGatesStore = defineStore('gates', () => {
    // Vanlig Ref
    const gates = ref([]);

    function calculateDate(prosjektID, nr) {
        const projectStore = useProjectsStore();
        const gateIndex = gates.value.findIndex(gate => gate.projectID === prosjektID && gate.gateNR === nr);

        if (gateIndex === -1) return null; 

        if (lastGate(prosjektID, nr)) {
            const sfDate = projectStore.getSFDate(prosjektID);
            gates.value[gateIndex].plannedDate = sfDate;
            return sfDate;
        } else {
            return computed(() => {
                const nextGateDate = getNextGateDate(prosjektID, nr);
                return nextGateDate;
            });
        }
    }

    function getSFG(gateID) {
        const gate = gates.value.find(gate => gate.ID === String(gateID));
        if (gate) {
            return gate.plannedDate;
        } else {
            console.error(`Gate with ID ${gateID} not found.`);
            return null;
        }
    }

    function setGates(newGates) {
        gates.value = newGates;
    }

    async function fetchGates(projectID) {
        try {
            const response = await $fetch('/gates/' + projectID, {
                method: 'GET'
            });

            const gateArray = response.map(gate => ({
                ID: gate.ID.toString(),
                projectID: gate.prosjektID.toString(),
                gateNR: gate.gateNR,
                title: gate.gateTitle,
                plannedDate: "1000-07-07",
                completionDate: "1000-07-07",
                progress: gate.progress
            }));

            setGates(gateArray);
        } catch (error) {
            console.error('Error fetching gates:', error);
        }
    }

    async function addGate(gateNR, projectID, title) {
        console.log("Making gate: " + title + " with id: " + gateNR + " in project: " + projectID)

        const requestBody = {
            projectID: projectID,
            gateNR: gateNR,
            title: title
        };

        try {
            const response = await $fetch('/gates', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            console.log("calling fetchgates")
            await fetchGates(projectID);

        } catch (error) {
            return createError({
                statusCode: 500,
                statusMessage: 'Internal Server Error',
                data: 'Failed to create project'
            });
        }
    }



    async function updateGateOrder(newGates) {
        try {
            const response = await fetch(`/gates/order`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    gates: newGates
                })
            });
        } catch (error) {
            console.error('Error updating gates order:', error);
        }

    }

    function getNextGateDate(prosjektID, nr) {
        const taskStore = useTasksStore();
        for (let i = 0; i < gates.value.length; i++) {
            if ((String(gates.value[i].projectID) == String(prosjektID)) && (gates.value[i].gateNR-1 === nr)) {
                let date;
                date = substractDays(gates.value[i].plannedDate, taskStore.maxTaskDuration(prosjektID, nr))
                return date;
            }
        }

        return "0000-12-24"
    }

    function substractDays(date, days) {
        const currentDate = new Date(date);
        const newDateTimestamp = currentDate.getTime() - (days * 24 * 60 * 60 * 1000);
        const newDate = new Date(newDateTimestamp);
        const formattedDate = newDate.toISOString().split('T')[0];
        return formattedDate;
    }


    function lastGate(prosjektID, nr) {
        for (let i = 0; i < gates.value.length; i++) {
            if((gates.value[i].projectID == prosjektID) && gates.value[i].gateNR>nr){
                return false
            }
        }
        return true
    }

    // Henter gates til et spesifikt prosjekt
    function getProjectGates(projectID) {
        const filteredGates = gates.value.filter(gate => gate.projectID === projectID);
        filteredGates.sort((a, b) => a.gateNR - b.gateNR);
        return filteredGates;
    }

    async function saveGateProgress(gateID, progress) {
        // Assuming you have a function to save gate progress to the database
        console.log("Saving gateprogress in database")
        try {
            const response = await fetch(`/gates/progress/${gateID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    gateID: gateID,
                    progress: progress
                })
            });
        } catch (error) {
            console.error('Error updating gateProgress:', error);
        }

    }

    function getGateProgress(gateID) {
        const taskStore = useTasksStore();
        return computed(() => {
            const tasks = taskStore.getGateTasks(gateID)
            if (!tasks.length) return 0;
            const totalWeightedProgress = tasks.reduce((total, task) => {
                return total + (task.progress / 100) * task.duration
            }, 0);
            const totalDuration = tasks.reduce((total, task) => {
                return total + task.duration
            }, 0);
            return totalDuration > 0 ? (totalWeightedProgress / totalDuration) * 100 : 0;
        });
    }


    function updateGateProgress(gateID) {
        console.log("In update gateProgress for: " + gateID);
        const taskStore = useTasksStore();

        console.log("In return");
        const tasks = taskStore.getGateTasks(gateID);

        if (tasks.length === 0) return 0;

        const totalDuration = tasks.reduce((total, task) => total + task.duration, 0);
        const totalWeightedProgress = tasks.reduce((total, task) => total + (task.progress / 100) * task.duration, 0);

        const answer = totalDuration > 0 ? (totalWeightedProgress / totalDuration) * 100 : 0;
    
        saveGateProgress(gateID, answer);
        setGateScheduleLightDate(gateID, answer);

        return answer;
    }



    async function setGateScheduleLightDate(gateID, progress) {
        const taskStore = useTasksStore();
        const PD = getPlannedDate(gateID);
        const maxTaskDur = taskStore.maxTaskDuration(getProjectID(gateID), getGateNR(gateID) - 1);
        const remainingDays = maxTaskDur - (progress / 100) * maxTaskDur;

        const PDDate = new Date(PD);
        const GSLD = new Date(PDDate.getTime() - remainingDays * 24 * 60 * 60 * 1000);


        try {
            const gslDateFormat = GSLD.toISOString().split('T')[0]; // Convert GSLD to ISO string format
            const response = await fetch(`/gates/lastdate/${gateID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    gateID: gateID,
                    lastDate: gslDateFormat
                })
            });
        } catch (error) {
            console.error('Error updating GSLD:', error);
        }
    }


    function getGateNR(searchid) {
        for(let i = 0; i<gates.value.length; i++) {
            if(searchid === Number(gates.value[i].ID)) {
                return gates.value[i].gateNR;
            }
        }
    }
    function getGateNRNew(searchID) {
        const gate = gates.value.find(gate => gate.ID === searchID.toString());
        if (gate) {
            return gate.gateNR;
        } else {
            console.error("Gate with ID " + searchID + " not found.");
            return null;
        }
    }

    function getPlannedDate(gateID) {
        const gate = gates.value.find(gate => gate.ID === gateID);
        return gate ? gate.plannedDate : null;
    }



    function getProjectID(gateID) {
        const gate = gates.value.find(gate => gate.ID === gateID);
        return gate ? gate.projectID : null;
    }


    function calculateDaysToEnd(plannedDate) {
        return computed(() => {
            let daysLeft = 0;
            let date = new Date(plannedDate.value)
            const today = new Date();
            var differenceInMs = date.getTime() - today.getTime()
            daysLeft = Math.floor(differenceInMs/(1000*60*60*24))+1
            return Math.max(daysLeft, 0);
        })
    }

    function calculateCompletionDate(gateID) {
        const taskStore = useTasksStore()
        let completionDate = "";

        const competingDates = [];
        for (const task of taskStore.tasks) {
            if (task.gateID === Number(gateID)) {
                
                if(task.completeDate === null) {
                    return "---"
                } else {
                    competingDates.push(task.completeDate);
                }
            }
        }
        if (competingDates.length === 0) {
            return "---"
        }
        for(const dato of competingDates) {
            if(completionDate === "") {
                completionDate = dato
            } else if(dato > completionDate) {
                completionDate = dato
            }
        }
        completionDate = new Date(completionDate)
        const day = completionDate.getDate().toString().padStart(2, '0');
        const month = (completionDate.getMonth() + 1).toString().padStart(2, '0');
        const year = completionDate.getFullYear();

        completionDate = `${day}.${month}.${year}`;
        return completionDate
    }

    async function updateGateTitle(gateID, newTitle) {
        const gateIndex = gates.value.findIndex(gate => gate.ID === gateID);
        if (gateIndex !== -1) {
            gates.value[gateIndex].title = newTitle;
        }
        try {
            const response = await fetch(`/gates/title/${gateID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    gateID: gateID,
                    newTitle: newTitle
                })
            });
        } catch (error) {
            console.error('Error updating gate title:', error);
        }
    }



    // Deleting a gate
    async function deleteGate(gateID, projectID) {
        try {
            const response = await $fetch(`/gates/${gateID}`, {
                method: 'DELETE'
            });
            // If the deletion from the backend is successful, remove the project from the store
            await fetchGates(projectID);

        } catch (error) {
            console.error("Failed to delete gate:", error);
        }
    }


    return { gates, getPlannedDate, calculateCompletionDate, getProjectID, setGateScheduleLightDate, calculateDaysToEnd, getSFG, addGate, getProjectGates, calculateDate, lastGate, substractDays, getGateProgress, fetchGates, getGateNR, updateGateProgress, updateGateTitle, updateGateOrder, deleteGate };

});
