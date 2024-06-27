<template>
    <div>
        <select name="team" id="team" @change="updateTeam($event.target.value)">
            <option v-if="teamUnedited" selected>{{ teamStore.getTeamName(currentUserTeam) }}</option>
            <option v-for="team in filteredTeams" :key="team.id">{{ team.team }}</option>
        </select>
    </div>
</template>

<script setup>

const teamStore = useTeamsStore();
const authStore = useAuthStore();

const teams = ref([]);
const teamUnedited = ref(true);
const currentUserTeam = computed(() => {
    return authStore.getUserTeam();
});

const filteredTeams = computed(() => {
    const currentTeamName = teamStore.getTeamName(currentUserTeam.value);
    return teams.value.filter(team => team.team !== currentTeamName);
});

onMounted(async () => {
    await teamStore.fetchTeams();
    teams.value = teamStore.getTeams();
});
</script>

<style scoped>
</style>
