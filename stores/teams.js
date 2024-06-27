import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useTeamsStore = defineStore('teams', () => {
    
    const currentteam = ref(1);
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

    function getTeamId(teamName) {
        const team = teams.value.find(t => t.team === teamName);
        return team ? team.id : null;
    }

    function getTeamName(teamID) {
        const team = teams.value.find(t => t.id === teamID)
        return team ? team.team : null
    }

    return {
        teams,
        currentteam,
        fetchTeams,
        getTeams,
        getTeamId,
        getTeamName
    };
});