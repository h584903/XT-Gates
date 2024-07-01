<template>
  <div v-if="admin">
    <div>
      <h1>Teams:</h1>
    </div>
    <div v-for="team in filteredTeams" :key="team.id" class="team-box">
      <div>{{ team.team }}</div>
    </div>
    <div class="bottom-spacer"></div>
    <button @click="addTeam">Create new team</button>
  </div>
  <div v-else>
    This is an admin-only page, please do not attempt to access it without being logged in as an admin.
  </div>
</template>

<script setup>
import { useProjectsStore } from '@/stores/projects';
import { useAuthStore } from '@/stores/auth';
import { useTeamsStore } from '@/stores/teams';

const projectStore = useProjectsStore();
const authStore = useAuthStore();
const teamStore = useTeamsStore();

const admin = computed(() => authStore.isAdmin());
const teams = computed(() => teamStore.getTeams());

// Filter teams to exclude those with id === 0
const filteredTeams = computed(() => teams.value.filter(team => team.id !== 0));

onMounted(() => {
  teamStore.fetchTeams();
  projectStore.fetchProjects();
});

function addTeam() {
  console.log('Hello from teams');
  console.log(teams.value);
}
</script>

<style scoped>
.team-box {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.team-box:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.bottom-spacer {
  height: 50px;
}
</style>
