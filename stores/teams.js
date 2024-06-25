import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useTeamsStore = defineStore('teams', () => {
    
    const team = ref();
    const teams = ref([]);

    const fetchTeams = async () => {
        try {
            const response = await $fetch('/teams', {
                method: 'GET'
            });
            const data = response.data;
            const teamsArray = Object.values(data).map(team => ({
                id: team.ID,
                team: team.team
            }));
            teams.value = teamsArray;
        } catch (error) {
            console.error('Error fetching teams', error);
        }
    }

    function getTeams() {
        return teams.value;
    }

    return {
        teams,
        fetchTeams,
        getTeams
    };
});
