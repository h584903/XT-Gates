<template>
    <div class="dropdown">
        <div class="dropdown-selected" @click="toggleDropdown">
            <span>TEAM {{ currentUserTeamName }}</span>
        </div>
        <div class="dropdown-menu" v-if="dropdownOpen">
            <div class="dropdown-item" v-for="team in filteredTeams" :key="team.id" @click="selectTeam(team.id)">
                TEAM {{ team.team }}
            </div>
        </div>
    </div>
</template>


<script setup>
const projectStore = useProjectsStore();
const teamStore = useTeamsStore();
const authStore = useAuthStore();

let nonchecked = true
const teams = ref([]);
const teamUnedited = ref(true);
const dropdownOpen = ref(false);

const currentUserTeam = computed(() => authStore.getUserTeam());
const currentUserTeamName = computed(() => teamStore.getTeamName(currentUserTeam.value));
const selectedTeamName = ref(currentUserTeamName.value);

const filteredTeams = computed(() => {
    const currentTeamName = teamStore.getTeamName(currentUserTeam.value);
    return teams.value.filter(team => team.team !== currentTeamName && team.id !== 0);
});

onMounted(async () => {
    await teamStore.fetchTeams();
    teams.value = teamStore.getTeams();
    selectTeam(Number(currentUserTeam.value));
    nonchecked = false
    toggleDropdown();
});

async function updateUserTeam(newTeamId) {
    authStore.setUserTeam(newTeamId);
    await projectStore.fetchProjects();
}

function selectTeam(teamId) {
    console.log("Set team to: " + teamId + ".");
    console.log(typeof teamId)
    teamUnedited.value = false;
    selectedTeamName.value = teamStore.getTeamName(teamId);
    updateUserTeam(teamId);
    toggleDropdown();
}

function toggleDropdown() {
    dropdownOpen.value = !dropdownOpen.value;
}
</script>



<style scoped>
.dropdown {
    position: relative;
    width: 35%;
    /* Adjust width to make it smaller */
    margin: 0 auto;
    /* Center the dropdown */
}

.dropdown-selected {
    padding: 8px 10px;
    /* Smaller padding for a smaller element */
    border: 1px solid #000;
    border-radius: 0px;
    background-color: #d3e5fc;
    font-size: 30px;
    /* Smaller font size */
    color: #333;
    cursor: pointer;
    user-select: none;
    display: flex;
    justify-content: center;
    /* Center text horizontally */
    align-items: center;
    /* Center text vertically */
    position: relative;
    /* To position the arrow absolutely */
}

.dropdown-selected-text {
    flex-grow: 1;
    /* Allow text to take available space */
    text-align: center;
    /* Center text horizontally */
}

.dropdown-menu {
    position: absolute;
    width: 100%;
    border: 1px solid #000;
    border-radius: 0px;
    background-color: #d3e5fc;
    margin-top: 5px;
    z-index: 1000;
}

.dropdown-item {
    padding: 8px 10px;
    /* Smaller padding for a smaller element */
    font-size: 16px;
    /* Smaller font size */
    color: #333;
    text-align: center;
    /* Center text */
    cursor: pointer;
    user-select: none;
}

.dropdown-item:hover {
    background-color: rgba(0, 0, 0, 0.1);
}
</style>
