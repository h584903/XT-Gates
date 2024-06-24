<template>
  <div>
    <label>User:</label>
    <button :class="{ admin: isAdmin }" @click="toggleModal">{{ username }}</button>
    
    <ReusableModal @close="toggleModal" :modalActive="modalActive">
      <div>Enter username:</div>
      <input type="text" v-model="inputText" placeholder="Enter text" />
      <div>
        <input type="checkbox" id="acceptCookies" v-model="acceptCookies">
        <label for="acceptCookies">
          I accept the 
          <nuxt-link to="/cookiepolicy" @click="toggleModal">cookie policy</nuxt-link>
        </label>
      </div>
      <div>
        <button @click="saveUsername" :disabled="!acceptCookies">Save</button>
        <button @click="toggleModal">Cancel</button>
      </div>
    </ReusableModal>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useAuthStore } from '@/stores/auth'; // Import the auth store
import ReusableModal from "@/components/ReusableModal.vue";
import { useRouter } from 'vue-router';

const authStore = useAuthStore();

const username = computed(() => authStore.getUsername());
const inputText = ref('');
const acceptCookies = ref(false);

const modalActive = ref(false);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};

const saveUsername = () => {
  if (acceptCookies.value) {
    authStore.setUsername(inputText.value);
    document.cookie = `username=${inputText.value}; path=/; max-age=${60 * 60 * 24 * 365}`; // Cookie expires in 1 year
    toggleModal();
  }
};

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

onMounted(() => {
  // Check for username cookie and set it in the store
  const cookieUsername = getCookie("username");
  if (cookieUsername) {
    authStore.setUsername(cookieUsername);
  }
});

// Computed property to check if the user is an admin
const isAdmin = computed(() => authStore.isAdmin());
</script>

<style scoped>
button {
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

button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

button:disabled {
  background-color: #888;
  cursor: not-allowed;
}

button:active {
  background-color: #003f7f;
  transform: translateY(0);
}

/* Admin button styling */
button.admin {
  background-color: #28a745;
}

button.admin:hover {
  background-color: #218838;
}

button.admin:active {
  background-color: #1e7e34;
}

input[type="checkbox"] {
  margin-right: 10px;
}
</style>
