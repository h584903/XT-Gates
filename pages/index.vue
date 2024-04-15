<template>
  <div>
    <h1>Welcome to the dashboard</h1>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useProjectsStore } from '@/stores/projects';

const store = useProjectsStore();

onMounted(() => {
  if (store.projects.length === 0) {
    console.log('Dashboard mounted');
    store.fetchProjects();
  }
  });
  watchEffect(() => {
  console.log(store.projects);
  });
</script>