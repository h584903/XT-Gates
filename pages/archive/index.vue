<template>
  <div>
    <u>
      <h1>ARCHIVED PROJECTS</h1>
    </u>
    <div class="list-wrapper">
      <ListDesc />
      <hr class="solid">
      <!--Oppretter et entry for hvert prosjekt i store.projects-->
      <div v-for="project in paginatedProjects" :key="project.id">
        <ProjectEntry :entryData="project" />
      </div> 

      <!-- Pagination Controls -->
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1" class="pagination-button">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination-button">Next</button>
      </div>

      <Modal @close="toggleModal" :modalActive="modalActive">
        <h1>New Project</h1>
        <form @submit.prevent="submitForm">
          <label>Project title: </label>
          <input type="text" id="title" v-model="formData.title" required><br>
          <label>PO-date: </label>
          <input type="date" id="PO" v-model="formData.PO" required><br>
          <label>Scheduled finish: </label>
          <input type="date" id="SF" v-model="formData.SF" required><br>
          <label>PEM: </label>
          <input type="text" id="PEM" v-model="formData.PEM" required><br>
          <button type="submit" class="addButton">Create Project</button>
        </form>
        <button class="closeButton" @click="toggleModal">Cancel</button>
      </Modal>
      <button @click="toggleModal" type="button" class="add-project-button">Add Project</button>
    </div>
  </div>
</template>

<script setup>
import Modal from "@/components/ReusableModal.vue";
import { ref, onMounted, computed, watchEffect } from 'vue';
import { useProjectsStore } from '@/stores/projects';
import { useGatesStore } from '@/stores/gates';
import { v4 as uuid } from 'uuid';

const store = useProjectsStore();
const gateStore = useGatesStore();
const projects = ref(store.getProjects());
const index = ref(0);

const currentPage = ref(1);
const projectsPerPage = 15;

const totalPages = computed(() => Math.ceil(filteredProjects.value.length / projectsPerPage));

const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * projectsPerPage;
  const end = start + projectsPerPage;
  return filteredProjects.value.slice(start, end);
});

const filteredProjects = computed(() => {
  return projects.value.filter(project => project.archive);
});

onMounted(() => {
  if (store.getProjects().length === 1) {
    store.fetchProjects();
  }
});

watchEffect(() => {
  projects.value = store.getProjects();
});

const formData = ref({
  title: '',
  PO: '',
  SF: '',
  PEM: ''
});

const submitForm = () => {
  const projectId = uuid();
  store.addProject(projectId, formData.value.title, 0, formData.value.SF.toString().replace(/-/g, ''), formData.value.PO.toString().replace(/-/g, ''), true, formData.value.PEM, "comment");
  index.value++;
  toggleModal();
};

projects.value = store.getProjects();

const modalActive = ref(false);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};
</script>

<style scoped>
.list-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.addButton, .closeButton, .add-project-button, .pagination-button {
  background-color: #007BFF;
  color: white;
  cursor: pointer;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  margin: 10px;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.3s;
}

.addButton:hover, .closeButton:hover, .add-project-button:hover, .pagination-button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

.addButton:active, .closeButton:active, .add-project-button:active, .pagination-button:active {
  background-color: #003f7f;
  transform: translateY(0);
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button:disabled {
  background-color: #888;
  cursor: not-allowed;
}
</style>
