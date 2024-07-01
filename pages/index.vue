<template>
  <div class="dashboard">
    <div class="welcome-section">
      <h1 v-if="isLoggedIn">Welcome back, {{ username }}!</h1>
      <h1 v-else>Welcome to the XT Gates Dashboard</h1>
      <p v-if="!isLoggedIn">Please register a username to ensure proper logging of work.</p>
    </div>
    
    <div class="links-section" v-if="isLoggedIn">
      <NuxtLink to="/projectList" class="link-button">View Active Projects</NuxtLink>
      <NuxtLink to="/cookiepolicy" class="link-button">Cookie Policy</NuxtLink>
    </div>
    
    <ReusableModal @close="toggleModal" :modalActive="modalActive">
      <div class="modal-content">
        <h2>Warning</h2>
        <p>You are about to edit the template. This action can affect the entire system configuration and changes are final. Are you sure you want to proceed?</p>
        <div class="modal-actions">
          <button @click="confirmEditTemplate" class="confirm-button">Yes, proceed</button>
          <button @click="toggleModal" class="cancel-button">Cancel</button>
        </div>
      </div>
    </ReusableModal>
    
    <button v-if="admin" @click="toggleModal" class="edit-button">Edit Template</button>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useProjectsStore } from '@/stores/projects';
import { useAuthStore } from '@/stores/auth';
import ReusableModal from "@/components/ReusableModal.vue";
import { useRouter } from 'vue-router';

const store = useProjectsStore();
const authStore = useAuthStore();
const router = useRouter();

const admin = computed(() => authStore.isAdmin());
const username = computed(() => authStore.getUsername());
const isLoggedIn = authStore.isLoggedIn();

onMounted(() => {
  store.fetchProjects();
});

const modalActive = ref(false);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};

const confirmEditTemplate = () => {
  router.push(`/template/${store.getTemplate()}`);
};

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};
</script>

<style scoped>

.dashboard {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  position: relative; /* Ensure relative positioning for the absolute edit button */
}

.welcome-section {
  margin-bottom: 30px;
}

.links-section {
  margin-bottom: 30px;
}

.link-button {
  display: inline-block;
  margin: 10px;
  padding: 10px 20px;
  background-color: #007BFF;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.3s;
}

.link-button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

.edit-button {
  background-color: #FF5733;
  color: white;
  cursor: pointer;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.3s;
  position: fixed; /* Fixed positioning */
  bottom: 20px; /* Position from the bottom */
  right: 20px; /* Position from the right */
}

.edit-button:hover {
  background-color: #C70039;
  transform: translateY(-2px);
}

.modal-content {
  text-align: center;
}

.modal-actions {
  margin-top: 20px;
}

.confirm-button, .cancel-button {
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

.confirm-button:hover, .cancel-button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}
</style>
