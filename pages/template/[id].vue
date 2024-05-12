<template>
  <div>
    <div class="wrapper" v-if="project">
      <div class="title">
        <h1>{{ project.title }}</h1>
        <!--Skal oppdateres med komponent etter merge-->
        <h2>PO Date</h2>
      </div>
      <GateList :projectId="project.id"/>
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
  import ReusableModal from '~/components/ReusableModal.vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useProjectsStore } from '@/stores/projects';
  import { useGatesStore } from '@/stores/gates';
  import { useTasksStore } from '@/stores/tasks';

  const store = useProjectsStore();
  const gateStore = useGatesStore();
  const taskStore = useTasksStore();
  const route = useRoute();
  const router = useRouter();
  const project = ref(null);

  onMounted(async () => {
    const projectId = route.params.id; // parser routen til en int og spesifiserer base 10 
    if (!projectId) {
      console.error('Project ID is not provided');
      return;
    }
    
    try {
      // Henter prosjekt info
      const fetchedProject = await store.getProjectById(projectId);
      if (fetchedProject) {
        project.value = fetchedProject;
      } else {
        console.error('Project not found:', route.params.id);
        return;
      }

    } catch (error) {
      console.error('Error fetching project:', error);
    }
    try {

      gateStore.fetchGates(projectId);
    } catch (error) {
      console.error('Error fetching gates:', error);
    }
    try {

      taskStore.fetchTasks(projectId);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  });

// Metode for toggle modalen - settes til false by default
const modalActive = ref(false);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};

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
  justify-content: flex-end;
}

.customButton {
  margin: 10px;
}
</style>
