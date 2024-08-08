<template>
  <div class="ProjectNameList">
    <!-- Vise listene i sidebar -->
    <NuxtLink v-for="(project, index) in limitedProjects" :key="project.id" :to="`/projectList/${project.id}`" class="Thin-Line">
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

const orderedProjects = computed(() => {
  return filteredProjects.value.sort((a, b) => false ? a['SFdate'] - b['SFdate'] : a['SFdate'].localeCompare(b['SFdate']));
})

const limitedProjects = computed(() => {
  return orderedProjects.value.slice(0, 30);
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
  font-size: 1rem;
}

.Thin-Line{
  display: inline-block;
  text-decoration: none;
  color: inherit;
  position: relative; 
  padding: 2px;
}
.Thin-Line::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: #ccc; /* Color of the line */
}

.ProjectNameList a {
  text-decoration: none;
  color: black;
  max-width: 90%;
  word-wrap: break-word;
  white-space: normal;
  display: inline-block;
}

.ProjectNameList a:hover {
  text-decoration: none;
  color: grey;
}
</style>
