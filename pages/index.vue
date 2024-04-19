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
  if (store.getProjects().length === 1) {
    console.log('Dashboard mounted');
    store.fetchProjects();
  }
  });
  watchEffect(() => {
  console.log(store.projects);
  });
</script>