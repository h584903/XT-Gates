<template>
  <div> event id: {{ route.params.id}}
    <div class="wrapper" v-if="project">
      <div class="title">
        <h1>{{ project.title }}</h1>
        <!--Skal oppdateres med komponent etter merge-->
        <h2>PO Date</h2>
      </div>
      <GateList />
      <!-- Brukes for å kunne ha ting på en linje etter listen -->
      <div class="semi-footer">
        <SaveButton />
      </div>
    </div>
    <div v-else>
      loading project...
    </div>
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useProjectsStore } from '@/stores/projects';

const store = useProjectsStore();
const route = useRoute();
const project = ref(null);

onMounted(async () => {
  if (route.params.id) {
    const projectId = parseInt(route.params.id, 10); // Parse to integer
    if (isNaN(projectId)) {
  console.error('Project ID is not a valid number');
  return;
}


    if (!isNaN(projectId)) { // Check if the parsing was successful
    try {
      const fetchedProject = await store.getProjectById(0);
      if (fetchedProject) {
        project.value = fetchedProject;
      } else {
        console.error('Project not found:', route.params.id);
      }
    } catch (error) {
      console.error('Error fetching project:', error);
    }
    }else {
      console.error('Invalid project ID:', route.params.id);
    }
  }
});
</script>

<style scoped>
.wrapper {
  width: 80%;
  display: flex;
  flex-direction: column;
}

.title {
  display: flex;
  justify-content: space-between;
  /* Gjør at tittellen og datoen er så langt unna hverandre som mulig */
}

.semi-footer {
  width: 100%;
  display: flex;
  justify-content: end;
}

</style>
