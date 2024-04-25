<template>
  <div class="wrapper-row">
    <h1>ACTIVE PROJECTS</h1>
    <div class="projectList">
      <ProjectList />
    </div>
  </div>
</template>

<script setup> 
import { useProjectsStore } from '@/stores/projects';

const store = useProjectsStore();

onMounted(() => {
  // Må endres til 0 hvis testprosjekt fjernes
  if (store.getProjects().length === 1) {
    console.log('Projectlist mounted');
    store.fetchProjects();
  }
  });
</script>
<style scoped>
/* Style er scoped for å beholde singleFileComponent struktur */
.wrapper {
  display: flex;
  flex-direction: row;
}

h1 {
  text-decoration: underline;
}


</style>
