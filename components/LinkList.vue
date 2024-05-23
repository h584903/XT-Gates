<template>
  <div class="ProjectNameList">
    <!-- Vise listene i sidebar -->
    <NuxtLink v-for="(project, index) in limitedProjects" :key="project.id" :to="`/projectList/${project.id}`">
      {{ truncateTitle(project.title) }}
    </NuxtLink>
    <NuxtLink v-if="filteredProjects.length > 30" to="/projectList">...</NuxtLink>
  </div>
</template>

<script setup>
import { useProjectsStore } from '@/stores/projects';
import { ref, watchEffect, computed } from 'vue';

const store = useProjectsStore();
const projects = ref([]);

// ser etter endringer i projects tabell og legger deretter til ref([])
watchEffect(() => {
  projects.value = store.getProjects();
});

const filteredProjects = computed(() => {
  return projects.value.filter(project => !project.archive);
});

const limitedProjects = computed(() => {
  return filteredProjects.value.slice(0, 30);
});

// Function to truncate project titles
const truncateTitle = (title) => {
  return title.length > 22 ? title.slice(0, 22) + '...' : title;
};
</script>

<style scoped>
.ProjectNameList {
  display: flex;
  flex-direction: column;
  margin: 0;
  margin-left: 10px;
  font-size: 20px;
}

.ProjectNameList a {
  text-decoration: none;
  color: black;
  /* Set maximum width and allow wrapping */
  max-width: 130px; /* Adjust the value as needed */
  word-wrap: break-word;
  white-space: normal;
  display: inline-block;
}

.ProjectNameList a:hover {
  text-decoration: none;
  color: grey;
}
</style>
