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
        title: "gate 1",
        progress: 10,
        plannedDate: "2024-05-12",
        remaining: 12,
        daysToEnd: 12,
        completionDate: "2024-03-02"
    });
    gates.value.push({
        projectID: 0,
        ID:'0002',
        title: "gate 2",
        progress: 20,
        plannedDate: "2024-07-07",
        remaining: 12,
        daysToEnd: 12,
        completionDate: "2024-06-07"
    });

    // Funksjon for å legge til gates, ikke testet
    function addGate(projectID, gateID, title, progress, plannedDate, remaining, daysToEnd, completion) {
        const newGate = { projectID, gateID, title, progress, plannedDate, remaining, daysToEnd, completion };
        gates.value.push(newGate);
    }
    
    // Computed property to get gates belonging to a specific project
    function getProjectGates(projectID) {
        return gates.value.filter(gate => gate.projectID === projectID);
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


    return { gates, addGate, getProjectGates, getGateProgress };
});
