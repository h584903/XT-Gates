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

    // Funksjon for å legge til gates, ikke testet
    function addGate(projectID, gateID, title, progress, plannedDate, remaining, daysToEnd, completion) {
        const newGate = { projectID, gateID, title, progress, plannedDate, remaining, daysToEnd, completion };
        gates.value.push(newGate);
    }

    function calculateDate(prosjektID, nr){
        const projectStore = useProjectsStore();
        let index;
        for (let i = 0; i < gates.value.length; i++) {
            if (gates.value[i].projectID === prosjektID && gates.value[i].gateNR === nr) {
                index = i;
            }
        }
        if (lastGate(prosjektID, nr)) {
            gates.value[index].plannedDate = projectStore.getPODate(prosjektID)
            return projectStore.getPODate(prosjektID)
        } else {
            return computed(() => {
                gates.value[index].plannedDate = getNextGateDate(prosjektID, nr)
                return (getNextGateDate(prosjektID, nr))
            })
        }
    }

    function setGates(newGates) {
        gates.value = newGates;
    }

    async function fetchGates(projectID) {
        console.log('Fetching gates...');
        try {
            const response = await $fetch('/gates/' + projectID, {
                method: 'GET'
            });

            const gateArray = response.map(gate => ({
                ID: gate.ID.toString(),
                projectID: gate.prosjektID,
                gateNR: gate.gateNR,
                title: gate.gateTitle,
                plannedDate: "2024-07-07",
                completionDate: "2024-06-07"
            }));

            console.log(gateArray);
            setGates(gateArray);
            console.log(gates.value);
        } catch (error) {
            console.error('Error fetching gates:', error);
        }
    }


    function getNextGateDate(prosjektID, nr) {
        const taskStore = useTasksStore();
        for (let i = 0; i < gates.value.length; i++) {
            if ((gates.value[i].projectID == prosjektID) && (gates.value[i].gateNR-1 === nr)) {
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



    return { gates, addGate, getProjectGates, calculateDate, lastGate, substractDays, getGateProgress, fetchGates, getGateNR };

});
