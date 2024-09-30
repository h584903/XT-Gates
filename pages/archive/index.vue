<template>
  <div>
    <u>
      <h1>ARCHIVED PROJECTS - {{ teamName }}</h1>
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
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watchEffect } from 'vue';
import { useProjectsStore } from '@/stores/projects';

const store = useProjectsStore();
const projects = ref(store.getProjects());
const authStore = useAuthStore();
const teamStore = useTeamsStore();

const teamName = computed(() => {
  const userTeam = authStore.getUserTeam();
  return teamStore.getTeamName(userTeam) || 'Default';
});

const currentPage = ref(1);
const projectsPerPage = 15;

const filteredProjects = computed(() => {
  return projects.value.filter(project => project.archive);
});

const totalPages = computed(() => Math.ceil(filteredProjects.value.length / projectsPerPage));

const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * projectsPerPage;
  const end = start + projectsPerPage;
  return filteredProjects.value.slice().reverse().slice(start, end);
});

onMounted(() => {
  if (store.getProjects().length === 1) {
    store.fetchProjects();
  }
});

watchEffect(() => {
  projects.value = store.getProjects();
});

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
  font-size: 1rem;
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

hr.solid {
  width: 100%;
  border-top: 1px solid grey;
}
</style>
