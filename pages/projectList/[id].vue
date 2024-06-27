<template class="allWrapper">
  <div>
    <div class="wrapper" v-if="project">
      <div class="title">
        <h1>{{ project.title }}</h1>
        <div class="info-grid">
          <div class="info-item">
            <label>PO Date:</label>
            <div v-if="!admin">
              <DateEntry :dateString = project.POdate />
            </div>
            <div v-else-if="editPODateMode">
              <input type="date" v-model="editedPODate" @blur="updatePODate" @keyup.enter="updatePODate" @keyup.esc="cancelEdit" />
              <button @click="cancelEdit">Cancel</button>
            </div>
            <div v-else @click="enableEditPODateMode">
              <DateEntry :dateString = project.POdate />
            </div>
          </div>
          <div class="info-item">
            <label>Scheduled finish:</label>
            <div v-if="!admin">
              <DateEntry :dateString = project.SFdate />
            </div>
            <div v-else-if="editSFDateMode">
              <input type="date" v-model="editedSFDate" @blur="updateSFDate" @keyup.enter="updateSFDate" @keyup.esc="cancelEdit" />
              <button @click="cancelEdit">Cancel</button>
            </div>
            <div v-else @click="enableEditSFDateMode">
              <DateEntry :dateString = project.SFdate />
            </div>
          </div>
          <div class="info-item">
            <label>PEM:</label>
            <div v-if="!admin">
              <span>{{ displayedPEM }}</span>
            </div>
            <div v-else-if="editPEM_Mode">
              <input type="text" v-model="editedPEM" @blur="updatePEM" @keyup.enter="updatePEM" @keyup.esc="cancelEdit" />
              <button @click="cancelEdit">Cancel</button>
            </div>
            <div v-else @click="enableEditPEM_Mode">
              <span>{{ displayedPEM }}</span>
            </div>
          </div>
          <div class="info-item">
            <label>PO-Float:</label>
            <span :class="{'negative-float': poFloat < 0, 'positive-float': poFloat >= 0}">
              {{ poFloat}} days
            </span>
          </div>
          <div class="info-item">
            <label>Schedule-float:</label>
            <span :class="{'negative-float': float < 0, 'positive-float': float >= 0}">
              {{ float}} days
            </span>
          </div>
          <div class="info-item">
            <label>Days to PO:</label>
            <span v-if="daysToPO>=0">{{ daysToPO }}</span>
            <span v-else-if="daysToPO<=0">{{ -daysToPO }} days ago</span>
          </div>
        </div>
      </div>
      <GateList :projectId="project.id"/>
      <div class="semi-footer"></div>
      <div>
        <ReusableModal @close="toggleModal" :modalActive="modalActive" v-if="admin">
          <h1>Delete Project?</h1>
          <p>Deleting a project is absolute, and cannot be reversed. Make certain this is necessary before doing so.</p>
          <p>Delete project {{ project.title }}?</p>
          <button @click="deleteProjectHandler" deleteProject class="deleteButton">Yes</button>
          <button @click="toggleModal" class="cancelButton">No</button>
        </ReusableModal>
      </div>
      <div class="button-container">
        <button v-if="admin" @click="toggleModal" type="button" class="customButton deleteColor">Delete project</button>
        <div v-if="!project.archive">
          <button v-if="admin" @click="archiveProjectHandler" type="button" class="customButton archiveButton">Archive project</button>
        </div>
        <div v-else>
          <button v-if="admin" @click="archiveProjectHandler" type="button" class="customButton archiveButton">Reactivate project</button>
        </div>
      </div>
    </div>
    <div v-else>
      Loading project...
      If this takes more than a few seconds, try returning to the project page.
    </div>
  </div>
</template>




<script setup>
  import ReusableModal from '~/components/ReusableModal.vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useProjectsStore } from '@/stores/projects';
  import { useGatesStore } from '@/stores/gates';
  import { useTasksStore } from '@/stores/tasks';
  import { ref, computed, watch, onMounted } from 'vue';

  const store = useProjectsStore();
  const gateStore = useGatesStore();
  const taskStore = useTasksStore();
  const authStore = useAuthStore();

  const route = useRoute();
  const router = useRouter();
  const project = ref(null);
  const editPODateMode = ref(false);
  const editedPODate = ref('');
  const editSFDateMode = ref(false);
  const editedSFDate = ref('');
  const editPEM_Mode = ref(false);
  const editedPEM = ref('');
  const float = ref(0);
  const poFloat = ref(0);
  const daysToPO = computed(() => calculateDaysToPO());
  const admin = computed(() => authStore.isAdmin());

  const enableEditPODateMode = () => {
    editPODateMode.value = true;
    editSFDateMode.value = false;
    editPEM_Mode.value = false;
  }

  function updatePODate() {
    try {
      store.updatePODate(project.value.id, editedPODate.value);
    } catch (error) {
      console.error("Failed to update the project:", error);
    } finally {
      editPODateMode.value = false;
    }
  }

  const enableEditSFDateMode = () => {
    editSFDateMode.value = true;
    editPODateMode.value = false;
    editPEM_Mode.value = false;
  }

  function updateSFDate() {
    try {
      store.updateSFDate(project.value.id, editedSFDate.value);
    } catch (error) {
      console.error("Failed to update the project:", error);
    } finally {
      editSFDateMode.value = false;
    }
  }

  const enableEditPEM_Mode = () => {
    editedPEM.value = project.value.PEM;
    editPEM_Mode.value = true;
    editPODateMode.value = false;
    editSFDateMode.value = false;
  }

  function updatePEM() {
    try {
      store.updatePEM(project.value.id, editedPEM.value);
    } catch (error) {
      console.error("Failed to update the project:", error);
    } finally {
      editPEM_Mode.value = false;
    }
  }

  onMounted(async () => {
    const projectId = route.params.id;
    if (!projectId) {
      console.error('Project ID is not provided');
      return;
    }

    try {
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

  const modalActive = ref(false);
  const toggleModal = () => {
    modalActive.value = !modalActive.value;
  }

  const deleteProjectHandler = () => {
    store.deleteProject(project.value.id);
    toggleModal();
    router.push('/projectlist');
  }

  const archiveProjectHandler = async () => {
    try {
      await store.archiveProject(project.value.id);
    } catch (error) {
      console.error('Failed to archive the project:', error);
    }
  }

  const displayedPEM = computed(() => {
    if (!project.value || !project.value.PEM || !project.value.PEM.trim()) {
      return "No PEM";
    } else {
      return project.value.PEM;
    }
  });

  const cancelEdit = () => {
    editedPODate.value = '';
    editPODateMode.value = false;
    editedSFDate.value = '';
    editSFDateMode.value = false;
    editedPEM.value = '';
    editPEM_Mode.value = false;
  }

// Watch for changes in PO date and update poFloat
watch(
  () => project.value && project.value.POdate,
  async (newPODate) => {
    if (newPODate) {
      poFloat.value = await calculatePOFloat();
    }
  }
);

// Watch for changes in SF date and update float
watch(
  () => project.value && project.value.SFdate,
  async (newSFDate) => {
    if (newSFDate) {
      float.value = await calculateFloat();
    }
  }
);

const calculateFloat = async () => {
  if (!project.value) return null;
  const sfDate = new Date(project.value.SFdate);
  const workDuration = await store.calculateWorkDuration(project.value.id);
  if (workDuration == 0) {
    return 0;
  }
  const newDate = new Date(sfDate);
  newDate.setDate(sfDate.getDate() - workDuration);
  newDate.setHours(23, 59, 0, 0);

  const today = new Date();
  const diffTime = Math.abs(newDate - today);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (today > newDate) {
    return -diffDays + 1;
  }
  return diffDays;
};

const calculatePOFloat = async () => {
  if (!project.value) return null;
  const poDate = new Date(project.value.POdate);
  const workDuration = await store.calculateWorkDuration(project.value.id);
  if (workDuration == 0) {
    return 0;
  }
  const newDate = new Date(poDate);
  newDate.setDate(poDate.getDate() - workDuration);
  newDate.setHours(23, 59, 0, 0);

  const today = new Date();
  const diffTime = Math.abs(newDate - today);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (today > newDate) {
    return -diffDays + 1;
  }
  return diffDays;
};

function calculateDaysToPO() {
  if (!project.value || !project.value.POdate) return null;

  const poDate = new Date(project.value.POdate);
  const today = new Date();

  const differenceInMs = today - poDate;
  const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
  return -differenceInDays;
}
</script>



<style scoped>
.wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.allWrapper {
  margin: auto;
}

.title {
  display: flex;
  justify-content: space-between;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px; /* Reduced gap */
  padding: 8px; /* Reduced padding */
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.info-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 0.9rem; /* Reduced font size */
}

.info-item label {
  font-weight: bold;
  font-size: 0.85rem; /* Reduced label font size */
}

.info-item div, .info-item span {
  margin-top: 3px; /* Reduced margin */
}

.negative-float {
  color: red;
}

.positive-float {
  color: green;
}

.semi-footer {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.customButton {
  margin: 8px; /* Reduced margin */
  padding: 8px 16px; /* Reduced padding */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: #fff;
  font-size: 0.9rem; /* Reduced font size */
}

.deleteColor {
  background-color: rgb(255, 140, 140);
}

.deleteButton {
  margin: 8px; /* Reduced margin */
  padding: 8px 16px; /* Reduced padding */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: #000000;
  background-color: #ffdada;
  font-size: 0.9rem; /* Reduced font size */
}

.archiveButton {
  background-color: #4caf50;
}

.cancelButton {
  margin: 8px; /* Reduced margin */
  padding: 16px 32px; /* Reduced padding */
  border: none;
  border-radius: 10px;
  cursor: pointer;
  color: #fff;
  background-color: #00a2ff;
  font-size: 0.9rem; /* Reduced font size */
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 15px; /* Reduced margin */
}

textarea {
  width: 100%;
  min-height: 70px; /* Reduced height */
  resize: vertical;
  padding: 6px; /* Reduced padding */
  font-size: 0.9rem; /* Reduced font size */
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>
