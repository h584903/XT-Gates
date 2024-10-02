<template class="allWrapper">
  <div>
    <div class="wrapper" v-if="project">
      <div class="title">
        <div v-if="!editTitleMode" class="title-wrapper" @click="enableEditTitleMode">
          <h1>{{ project.title }}</h1>
        </div>
        <div v-else class="title-wrapper edit-mode">
          <input type="text" v-model="editedTitle" @blur="updateTitle" @keyup.enter="updateTitle"
            @keyup.esc="cancelEdit" class="title-input" />
        </div>
        <div class="info-grid">
          <div class="info-item">
            <label>PO Date:</label>
            <div v-if="!admin">
              <DateEntry :dateString="project.POdate" />
            </div>
            <div v-else-if="editPODateMode">
              <input type="date" v-model="editedPODate" @blur="updatePODate" @keyup.enter="updatePODate"
                @keyup.esc="cancelEdit" />
              <button @click="cancelEdit">Cancel</button>
            </div>
            <div v-else @click="enableEditPODateMode">
              <DateEntry :dateString="project.POdate" />
            </div>
          </div>
          <div class="info-item">
            <label>Scheduled finish:</label>
            <div v-if="!admin">
              <DateEntry :dateString="project.SFdate" />
            </div>
            <div v-else-if="editSFDateMode">
              <input type="date" v-model="editedSFDate" @blur="updateSFDate" @keyup.enter="updateSFDate"
                @keyup.esc="cancelEdit" />
              <button @click="cancelEdit">Cancel</button>
            </div>
            <div v-else @click="enableEditSFDateMode">
              <DateEntry :dateString="project.SFdate" />
            </div>
          </div>
          <div class="info-item">
            <label>PEM:</label>
            <div v-if="!admin">
              <span>{{ displayedPEM }}</span>
            </div>
            <div v-else-if="editPEM_Mode">
              <input type="text" v-model="editedPEM" @blur="updatePEM" @keyup.enter="updatePEM"
                @keyup.esc="cancelEdit" />
              <button @click="cancelEdit">Cancel</button>
            </div>
            <div v-else @click="enableEditPEM_Mode">
              <span>{{ displayedPEM }}</span>
            </div>
          </div>
          <div class="info-item">
            <label>PO-Float:</label>
            <span :class="{ 'negative-float': poFloat < 0, 'positive-float': poFloat >= 0 }">
              {{ poFloat }} days
            </span>
          </div>
          <div class="info-item">
            <label>Schedule-float:</label>
            <span :class="{ 'negative-float': float < 0, 'positive-float': float >= 0 }">
              {{ float }} days
            </span>
          </div>
          <div class="info-item">
            <label>Days to PO:</label>
            <span v-if="daysToPO >= 0">{{ daysToPO }}</span>
            <span v-else-if="daysToPO <= 0">{{ -daysToPO }} days ago</span>
          </div>
        </div>
      </div>
      <GateList :projectId="project.id" />
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
      <ReusableModal @close="toggleSettingsModal" :modalActive="settingsModalActive" v-if="admin">
        <h1>Project Settings</h1>

        <!-- Label showing the amount of stages -->
        <div class="stages-count">
          <label>Amount of project stages: {{ stages.length + 1 }}</label>
        </div>


        <!-- Hide the form if edit stages is unpressed -->
        <div v-if="editStages">

          <div v-if="stages.length != 0" class="form-group">Stage 1 start gate: 1</div>

          <!-- Form for stage gates -->
          <form @submit.prevent="submitStages">
            <div class="form-group" v-for="(stage, index) in stages" :key="index">
              <label :for="'stageStart-' + (index + 2)">
                Stage {{ index + 2 }} start gate:
              </label>
              <input type="number" :id="'stageStart-' + (index + 2)" v-model="stages[index]" min="0" required />
              <button type="button" @click="removeStage(index)" class="removeButton">-</button>
            </div>

            <!-- Button to add another stage -->
            <button type="button" @click="addStage" class="customButton addButton">+</button>

            <!-- Submit button -->
            <button type="submit" class="customButton submitButton">Submit stages</button>
          </form>
        </div>

        <div class="button-container">
        <button v-if="!editStages" @click="toggleEditStages" type="button" class="customButton archiveButton">Edit Stages</button>
        <button v-else @click="toggleEditStages" type="button" class="customButton">Cancel</button>
      </div>
      <div class="separator-line"></div>

        <div class="button-container">
          <div v-if="!project.archive">
            <button v-if="admin" @click="archiveProjectHandler" type="button" class="customButton archiveButton">
              Archive project
            </button>
          </div>
          <div v-else>
            <button v-if="admin" @click="archiveProjectHandler" type="button"
              class="customButton archiveButton">Reactivate project</button>
          </div>
          <button v-if="admin" @click="toggleModal" type="button" class="customButton deleteColor">Delete
            project</button>
          <div class="separator-line"></div>
          <div class="button-container">
            <button @click="toggleSettingsModal" class="customButton settingsButton">Close</button>
          </div>
        </div>
      </ReusableModal>
      <div class="button-container">
        <button v-if="admin" @click="toggleSettingsModal" type="button" class="customButton settingsButton">
          Project Settings
        </button>
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
import { computed, watch, onMounted } from 'vue';

const store = useProjectsStore();
const gateStore = useGatesStore();
const taskStore = useTasksStore();
const authStore = useAuthStore();

const route = useRoute();
const router = useRouter();
const project = ref(null);
const editTitleMode = ref(false);
const editedTitle = ref('');
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
const editStages = ref(false);

const enableEditTitleMode = () => {
  editTitleMode.value = true;
  editedTitle.value = project.value.title;
};

const updateTitle = async () => {
  if (editedTitle.value)
    try {
      await store.updateProjectTitle(project.value.id, editedTitle.value);
      project.value.title = editedTitle.value;
    } catch (error) {
      console.error("Failed to update the project title:", error);
    } finally {
      editTitleMode.value = false;
    }
};

const enableEditPODateMode = () => {
  editPODateMode.value = true;
  editSFDateMode.value = false;
  editPEM_Mode.value = false;
};

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
};

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
};

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
    await gateStore.fetchGates(projectId);
  } catch (error) {
    console.error('Error fetching gates:', error);
  }
  try {
    await taskStore.fetchTasks(projectId);
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
  try {
    gateStore.calculateDate();
  } catch (error) {
    console.error('Error calculating Date:', error);
  }

  await updatePOFloat();
  await updateFloat();
});

// Stage management
const stages = ref([]);


// Function to add a new stage
const addStage = () => {
  stages.value.push(0); // Adds a stage with a default value of 0
};

// Function to remove a stage
const removeStage = (index) => {
  if (stages.value.length > 0) {
    stages.value.splice(index, 1); // Removes the stage at the specified index
  }
};

// Submit form logic
const submitStages = () => {
  console.log('Submitted stages:', stages.value);
  // Further submission handling can be added here
};

const modalActive = ref(false);
const toggleModal = () => {
  settingsModalActive.value = false;
  modalActive.value = !modalActive.value;
};

const toggleEditStages = () => {
  editStages.value = !editStages.value;
}

const settingsModalActive = ref(false);
const toggleSettingsModal = () => {
  settingsModalActive.value = !settingsModalActive.value;
};

function deleteProjectHandler() {
  try {
    store.deleteProject(project.value.id);
    router.push('/projectList');
  } catch (error) {
    console.error('Failed to delete project:', error);
  }
}

function archiveProjectHandler() {
  try {
    store.archiveProject(project.value.id);
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
  editedTitle.value = '';
  editTitleMode.value = false;
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
      await updatePOFloat();
    }
  }
);
// Watch for changes in SF date and update float
watch(
  () => project.value && project.value.SFdate,
  async (newSFDate) => {
    if (newSFDate) {
      await updateFloat();
    }
  }
);

watch(
  () => project.value && store.calculateWorkDuration(project.value.id), // Check project.value before accessing id
  async (newWorkDuration) => {
    if (newWorkDuration !== undefined) {
      await updatePOFloat();
      await updateFloat();
    }
  }
);

const updatePOFloat = async () => {
  poFloat.value = await store.calculatePOFloat(project.value.id);
};

const updateFloat = async () => {
  float.value = await store.calculateFloat(project.value.id);
};

function calculateDaysToPO() {
  if (!project.value || !project.value.POdate) return null;

  const poDate = new Date(project.value.POdate);
  const today = new Date();

  const differenceInMs = today - poDate;
  const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
  console.log('Difference in days:', differenceInDays);
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

h1 {
  font-size: 200%;
  margin: 0;
}

.allWrapper {
  margin: auto;
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title-wrapper {
  position: relative;
  width: 100%;
}

.title-wrapper.edit-mode {
  border: 2px solid #007bff;
  padding: 4px;
  margin: 10px;
  border-radius: 4px;
}

.title-input {
  width: 100%;
  font-size: 200%;
  padding: 0;
  margin: 0;
  border: none;
  outline: none;
  background: none;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  padding: 8px;
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.info-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 0.9rem;
}

.info-item label {
  font-weight: bold;
  font-size: 0.85rem;
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

/* Sleek, Uniform Button Styles */
.customButton {
  margin: 0px 0;
  padding: 6px 12px;
  border: 1px solid #009688;
  /* Turquoise border */
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  background-color: #4db6ac;
  /* Light turquoise */
  color: #fff;
  /* White text */
  transition: background-color 0.2s ease, color 0.2s ease, transform 0.1s;
}

.customButton:hover {
  background-color: #26a69a;
  /* Darker turquoise on hover */
  color: #fff;
}

.customButton:active {
  transform: scale(0.98);
  background-color: #00796b;
  /* Dark turquoise on active */
}

/* Stacked Modal Button Styles */
.deleteColor,
.archiveButton,
.cancelButton {
  border-color: #009688;
  /* Turquoise border */
  background-color: #4db6ac;
  /* Light turquoise */
  color: #fff;
  /* White text */
}

.deleteColor:hover,
.archiveButton:hover,
.cancelButton:hover {
  background-color: #26a69a;
  /* Darker turquoise on hover */
}

/* Settings button styles */
.settingsButton {
  border-color: #009688;
  /* Turquoise border */
  background-color: #4db6ac;
  /* Light turquoise */
  color: #fff;
  /* White text */
}

.settingsButton:hover {
  background-color: #26a69a;
  /* Darker turquoise on hover */
}

/* Stacked Buttons inside Modal */
.button-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.button-container button {
  margin-top: 10px;
  width: auto;
}

/* Archive Button Styles */
.archiveButton {
  border-color: #ccc;
  /* Grey border */
  background-color: #f0f0f0;
  /* Grey background */
  color: #333;
  /* Dark text */
}

.archiveButton:hover {
  background-color: #e0e0e0;
  /* Darker grey on hover */
}

/* Delete Button Styles */
.deleteColor {
  border-color: #d9534f;
  /* Red border */
  background-color: #f44336;
  /* Slight red background */
  color: #fff;
  /* White text */
}

/* Separator line between the buttons */
.separator-line {
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
  /* Light grey separator */
  margin: 15px 0;
  /* Adds space above and below the line */
}

/* Hover state for delete button */
.deleteColor:hover {
  background-color: #d32f2f;
  /* Darker red on hover */
}


.addButton {
  margin-top: 10px;
  background-color: #4caf50;
  /* Green background */
  display: block;
}

.submitButton {
  margin-top: 10px;
  background-color: #2196f3;
  /* Blue background */
}

.addButton:hover {
  background-color: #388e3c;
  /* Darker green on hover */
}

.submitButton:hover {
  background-color: #1976d2;
  /* Darker blue on hover */
}

.allWrapper {
  padding: 20px;
}

.stages-count {
  margin-bottom: 10px;
  margin-top: 10px;
  font-weight: bold;
}


.form-group {
  margin-bottom: 10px;
}

.addButton {
  margin-top: 10px;
  background-color: #4caf50;
  /* Green background */
  color: white;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.removeButton {
  margin-left: 10px;
  background-color: #f44336;
  /* Red background */
  color: white;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.addButton:hover {
  background-color: #388e3c;
  /* Darker green on hover */
}

.removeButton:hover {
  background-color: #d32f2f;
  /* Darker red on hover */
}

.submitButton {
  margin-top: 15px;
  background-color: #2196f3;
  /* Blue background */
  color: white;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.submitButton:hover {
  background-color: #1976d2;
  /* Darker blue on hover */
}

.settingsButton {
  margin-top: 10px;
  background-color: #607d8b;
  /* Greyish background */
  color: white;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.settingsButton:hover {
  background-color: #455a64;
  /* Darker grey on hover */
}

.button-container {
  margin-top: 0px;
  text-align: right;
}
</style>
