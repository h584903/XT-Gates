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

    const addTeam = async (newTeam) => {
        try {
            const response = await $fetch('/teams', {
                method: 'POST',
                body: JSON.stringify(newTeam),
                headers: { 'Content-Type': 'application/json' },
            });
            const addedTeam = response.data;
            teams.value.push({
                id: addedTeam.id,
                team: addedTeam.team,
            });
        } catch (error) {
            console.error('Error adding team:', error);
        }
    };

    async function deleteTeam(deleteID) {
        try {
            await $fetch(`/teams/${deleteID}`, {
                method: 'DELETE'
            });
            teams.value = teams.value.filter(team => team.id !== deleteID);
        } catch (error) {
            console.error('Error deleting team', error)
        }
    }

    return {
        teams,
        currentteam,
        fetchTeams,
        getTeams,
        getTeamId,
        getTeamName,
        addTeam,
        deleteTeam
    };
});