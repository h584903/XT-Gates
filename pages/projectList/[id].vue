<template class="allWrapper">
  <div> event id: {{ route.params.id}}
    <div class="wrapper" v-if="project">
      <div class="title">
        <h1>{{ project.title }}</h1>
        <!--Skal oppdateres med komponent etter merge-->
        <div class="info">
          <div v-if="editPODateMode">
            <input type="date" v-model="editedPODate" @blur="updatePODate" @keyup.enter="updatePODate" @keyup.esc="cancelEdit" />
            <button @click="cancelEdit">Cancel</button>
          </div>
          <div v-else @click="enableEditPODateMode">
            <span>PO Date: {{ formatEuropeanDate(project.POdate) }}</span>
          </div>
          
          <div v-if="editSFDateMode">
            <input type="date" v-model="editedSFDate" @blur="updateSFDate" @keyup.enter="updateSFDate" @keyup.esc="cancelEdit" />
            <button @click="cancelEdit">Cancel</button>
          </div>
          <div v-else @click="enableEditSFDateMode">
            <span>SF Date: {{ formatEuropeanDate(project.SFdate) }}</span>
          </div>

          <div>PEM: {{ project.PEM }}</div>
        </div>
      </div>
      <GateList :projectId="project.id"/>
      <!-- Brukes for å kunne ha ting på en linje etter listen -->
      <div class="semi-footer">
        <SaveButton />
      </div>
      <div>
        <ReusableModal @close="toggleModal" :modalActive="modalActive">
          <h1>Delete Project?</h1>
          <p>Deleting a project is absolute, and cannot be reversed. Make certain this is necessary before doing so.</p>
          <p>Delete project {{ project.title }}?</p>
          <button @click="deleteProjectHandler" deleteProject class="customButton">Yes</button>
          <button @click="toggleModal" class="customButton">No</button>
        </ReusableModal>
      </div>
      <button @click="toggleModal" type = "button">Delete project</button>
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
  const editPODateMode = ref(false);
  const editedPODate = ref('');
  const editSFDateMode = ref(false);
  const editedSFDate = ref('');

  const enableEditPODateMode = () => {
    editPODateMode.value = true;
  }
  function updatePODate() {
    try {
      store.updatePODate(project.value.id, editedPODate.value);
    } catch (error) {
      console.error("Failed to update the project:", error);
    } finally {
      editPODateMode.value = false;
    }
  };

  const enableEditSFDateMode = () => {
    editSFDateMode.value = true;
  }
  function updateSFDate() {
    try {
      store.updateSFDate(project.value.id, editedSFDate.value);
    } catch (error) {
      console.error("Failed to update the project:", error);
    } finally {
      editSFDateMode.value = false;
    }
  };

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

const deleteProjectHandler= () => {
  store.deleteProject(project.value.id);
  toggleModal();
  router.push('/projectlist');
}

const formatEuropeanDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

const cancelEdit = () => {
    editedPODate.value = '';
    editPODateMode.value = false;
    editedSFDate.value = '';
    editSFDateMode.value = false;
  };
</script>

<style scoped>
.wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.allWrapper {
  margin:auto;
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

textarea {
    width: 100%;
    min-height: 80px;
    resize: vertical;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
</style>
