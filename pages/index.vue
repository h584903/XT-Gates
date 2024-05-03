<template>
  <div>
    <h1>Welcome to the dashboard</h1>
    <NuxtLink :to="`/template/${template}`">Edit template</NuxtLink>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useProjectsStore } from '@/stores/projects';

const store = useProjectsStore();
const template = store.getTemplate();

onMounted(() => {
  // Må endres til 0 hvis testprosjekt fjernes
  if (store.getProjects().length === 1) {
    store.fetchProjects();
  }
  });
  watchEffect(() => {
  });
</script>
