<template>
    <div class="list-wrapper">
        <ListDesc />
        <hr class="solid">
        <!-- Create an entry for each project in store.projects -->
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
</template>

<script setup>
import Modal from "@/components/ReusableModal.vue";
import { ref, onMounted, computed, watchEffect } from 'vue';
import { useProjectsStore } from '@/stores/projects';
import { useAuthStore } from '@/stores/auth';
import { v4 as uuid } from 'uuid';
import { useIntervalFn } from '@vueuse/core';

const store = useProjectsStore();
const authStore = useAuthStore();

const projects = ref([]);
const index = ref(0);

const currentPage = ref(1);
const projectsPerPage = 25;

const admin = computed(() => authStore.isAdmin());

useIntervalFn(() => {
    fetchProjects();
}, 120000);

const fetchProjects = () => {
    store.fetchAllProjects().then(() => {
        projects.value = store.getManagerProjects();
    });
    store.fetchProjects();
};

const filteredProjects = computed(() => {
    const today = new Date();
    return projects.value.filter(project => {
        const poDate = new Date(project.POdate);
        const onTimeDate = new Date(project.onTimeDate);
        const sfDate = new Date(project.SFdate);
        const progress = project.progress;

        // Check if any of the criteria are met
        const isPoDatePassed = poDate < today;
        const isOnTimeDatePassed = onTimeDate < today;
        const isSfDateMoreThan30DaysAfterPo = (sfDate - poDate) / (1000 * 60 * 60 * 24) > 30;

        return !project.archive && !project.template && progress < 100 &&
            (isPoDatePassed || isOnTimeDatePassed || isSfDateMoreThan30DaysAfterPo);
    });
});

const totalPages = computed(() => Math.ceil(filteredProjects.value.length / projectsPerPage));

const paginatedProjects = computed(() => {
    const start = (currentPage.value - 1) * projectsPerPage;
    const end = start + projectsPerPage;
    return filteredProjects.value.slice(start, end);
});

onMounted(() => {
    fetchProjects();
});

watchEffect(() => {
    projects.value = store.getManagerProjects();
});

const formData = ref({
    title: '',
    PO: '',
    SF: '',
    PEM: ''
});


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

.addButton,
.closeButton,
.add-project-button,
.pagination-button {
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

.addButton:hover,
.closeButton:hover,
.add-project-button:hover,
.pagination-button:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
}

.addButton:active,
.closeButton:active,
.add-project-button:active,
.pagination-button:active {
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