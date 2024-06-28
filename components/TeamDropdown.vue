<template>
    <div class="dropdown">
      <div class="dropdown-selected" @click="toggleDropdown">
        <span style="flex: 1;" v-if="teamUnedited">TEAM {{ teamStore.getTeamName(currentUserTeam) }}</span>
        <span v-else>TEAM {{ selectedTeamName }}</span>
        <span class="dropdown-arrow"></span>
      </div>
      <div class="dropdown-menu" v-if="dropdownOpen">
        <div
          class="dropdown-item"
          v-if="teamUnedited"
          @click="selectTeam(currentUserTeam)"
        >
          TEAM {{ teamStore.getTeamName(currentUserTeam) }}
        </div>
        <div
          class="dropdown-item"
          v-for="team in filteredTeams"
          :key="team.id"
          @click="selectTeam(team.id)"
        >
          TEAM {{ team.team }}
        </div>
      </div>
    </div>
  </template>
  

<script setup>
const projectStore = useProjectsStore();
const teamStore = useTeamsStore();
const authStore = useAuthStore();

const teams = ref([]);
const teamUnedited = ref(true);
const dropdownOpen = ref(false);
const selectedTeamName = ref('');

const currentUserTeam = computed(() => authStore.getUserTeam());

const filteredTeams = computed(() => {
  const currentTeamName = teamStore.getTeamName(currentUserTeam.value);
  return teams.value.filter(team => team.team !== currentTeamName && team.id !== 0);
});

onMounted(async () => {
  await teamStore.fetchTeams();
  teams.value = teamStore.getTeams();
});

async function updateUserTeam(newTeamId) {
  authStore.setUserTeam(newTeamId);
  await projectStore.fetchProjects();
}

function selectTeam(teamId) {
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
  width: 30%; /* Adjust width to make it smaller */
  margin: 0 auto; /* Center the dropdown */
}

.dropdown-selected {
  padding: 8px 10px; /* Smaller padding for a smaller element */
  border: 2px solid #000;
  border-radius: 4px;
  background-color: rgb(125, 253, 227);
  font-size: 30px; /* Smaller font size */
  color: #333;
  cursor: pointer;
  user-select: none;
  display: flex;
  justify-content: center; /* Center text horizontally */
  align-items: center; /* Center text vertically */
  position: relative; /* To position the arrow absolutely */
}

.dropdown-selected-text {
  flex-grow: 1; /* Allow text to take available space */
  text-align: center; /* Center text horizontally */
}

.dropdown-arrow {
  font-size: 16px;
  position: absolute; /* Position absolutely */
  right: 10px; /* Adjust as necessary */
  pointer-events: none; /* Disable pointer events */
}

.dropdown-menu {
  position: absolute;
  width: 100%;
  border: 2px solid #000;
  border-radius: 4px;
  background-color: rgb(125, 253, 227);
  margin-top: 5px;
  z-index: 1000;
}

.dropdown-item {
  padding: 8px 10px; /* Smaller padding for a smaller element */
  font-size: 16px; /* Smaller font size */
  color: #333;
  text-align: center; /* Center text */
  cursor: pointer;
  user-select: none;
}

.dropdown-item:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
