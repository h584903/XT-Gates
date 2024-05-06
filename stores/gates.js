import { ref, computed } from 'vue';
import { packProject } from '@/utils/packProject.js';
import { defineStore } from "pinia";

export const useGatesStore = defineStore('gates', () => {
    // Vanlig Ref
    const gates = ref([]);
    // Pusher opp noe eksempel gates
    gates.value.push({
        projectID: 0,
        ID:'0001',
        gateNR: 1,
        title: "RFQ",
        progress: 10,
        plannedDate: "2024-05-12",
        remaining: 12,
        daysToEnd: 12,
        completionDate: "2024-03-02"
    });
    gates.value.push({
        projectID: 0,
        ID:'0002',
        gateNR: 2,
        title: "QUOTATION",
        progress: 20,
        plannedDate: "2024-07-07",
        remaining: 12,
        daysToEnd: 12,
        completionDate: "2024-06-07"
    });
    gates.value.push({
        projectID: 0,
        ID: '0003',
        gateNR: 3,
        title: "EXAMPLE",
        progress: 20,
        plannedDate: "2024-10-10",
        remaining: 12,
        daysToEnd: 12,
        completionDate: "2024-06-07"
    })

    function calculateDate(prosjektID, nr){
        const projectStore = useProjectsStore();
        let index;
        for (let i = 0; i < gates.value.length; i++) {
            if (gates.value[i].projectID === prosjektID && gates.value[i].gateNR === nr) {
                index = i;
            }
        }
        if (lastGate(prosjektID, nr)) {
            gates.value[index].plannedDate = projectStore.getSFDate(prosjektID)
            return projectStore.getSFDate(prosjektID)
        } else {
            return computed(() => {
                gates.value[index].plannedDate = getNextGateDate(prosjektID, nr)
                return (getNextGateDate(prosjektID, nr))
            })
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
        console.log("gateStore: " + newGates)
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
                plannedDate: "2024-07-07",
                completionDate: "2024-06-07"
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
            fetchGates(projectID);
        } catch (error) {
            return createError({
                statusCode: 500,
                statusMessage: 'Internal Server Error',
                data: 'Failed to create project'
            });
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

    // Computed property to get gates belonging to a specific project
    function getProjectGates(projectID) {
        return computed(() => gates.value.filter(gate => gate.projectID === projectID));
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

    function getGateNR(searchid) {
        for(let i = 0; i<gates.value.length; i++) {
            if(searchid === Number(gates.value[i].ID)) {
                return gates.value[i].gateNR;
            }
        }
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
    async function deleteGate(gateID) {
        try {
            const response = await $fetch(`/gates/${gateID}`, {
                method: 'DELETE'
            });
            // If the deletion from the backend is successful, remove the project from the store
            gates.value = gates.value.filter(gate => gate.id !== gateID);
            
        } catch (error) {
            console.error("Failed to delete gate:", error);
        }
    }

    return { gates, calculateDaysToEnd, getSFG, addGate, getProjectGates, calculateDate, lastGate, substractDays, getGateProgress, fetchGates, getGateNR, updateGateTitle, deleteGate };

});
