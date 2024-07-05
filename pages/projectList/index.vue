<template>
  <div class="wrapper-row">
    <h1>ACTIVE PROJECTS - {{ teamName }}</h1>
    <div class="projectList">
      <ProjectList />
    </div>
  </div>
</template>

<script setup> 
import { useProjectsStore } from '@/stores/projects';
import { useAuthStore } from '@/stores/auth';
import { useTeamsStore } from '@/stores/teams';

const projectStore = useProjectsStore();
const authStore = useAuthStore();
const teamStore = useTeamsStore();

const teamName = computed(() => {
  const userTeam = authStore.getUserTeam();
  return teamStore.getTeamName(userTeam) || 'Default';
});

onMounted(async () => {
  // Fetch projects or any other initialization logic
  await projectStore.fetchProjects();
});
</script>
<style scoped>
/* Style er scoped for å beholde singleFileComponent struktur */
.wrapper {
  display: flex;
  flex-direction: row;
}


h1 {
  font-size: 200%;
}


</style>
