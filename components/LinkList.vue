<template>
  <div class="ProjectNameList">
    <!-- Vise listene i sidebar -->
    <NuxtLink v-for="project in projects" :key="project.id" :to="`/projectList/${project.id}`">
      {{ project.title }}
    </NuxtLink>
  </div>
</template>

<script setup>
import { useProjectsStore } from '@/stores/projects';
import { ref, watchEffect } from 'vue';

const store = useProjectsStore();
const projects = ref([]);

// ser etter endringer i projects tabell og legger deretter til ref([])
watchEffect(() => {
  projects.value = store.getProjects();
});

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
