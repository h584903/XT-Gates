<template>
  <div>
    <!-- <label>User:</label> -->
    <button :class="{ admin: isAdmin }" @click="toggleUsernameModal">{{ username }}</button>

    <ReusableModal @close="toggleUsernameModal" :modalActive="usernameModalActive">
      <div>Enter username:</div>
      <input type="text" v-model="usernameInput" placeholder="Enter text" />
      <div>
        <input type="checkbox" id="acceptCookies" v-model="acceptCookies">
        <label for="acceptCookies">
          I accept the 
          <nuxt-link to="/cookiepolicy" @click="toggleUsernameModal">cookie policy</nuxt-link>
        </label>
      </div>
      <div>
        <button @click="saveUsername" :disabled="!acceptCookies">Save</button>
        <button @click="toggleUsernameModal">Cancel</button>
        <button @click="clearUsername">Logout</button>
      </div>
    </ReusableModal>
    <ReusableModal @close="toggleLoginModal" :modalActive="loginModalActive">
      <div>Enter admin password:</div>
      <input type="password" v-model="passwordInput" placeholder="Enter password" />
      <div>
        <button @click="loginAuthentication">Login</button>
        <button @click="toggleLoginModal">Cancel</button>
      </div>
    </ReusableModal>
    <ReusableModal @close="toggleRequestModal" :modalActive="requestModalActive">
      <div>Username not found</div>
      <div>Do you want to request a new user?</div>
      <div>
        Username: {{ usernameInput }}
      </div>
      <div>
        <label for="teamSelect">Select Team:</label>
        <select id="teamSelect" v-model="selectedTeam">
          <option v-for="team in teams" :key="team.id" :value="team.id">{{ team.team }}</option>
        </select>
      </div>
      <div>
        <button @click="sendRequest" :disabled="!selectedTeam">Send request</button>
        <button @click="toggleRequestModal">Cancel</button>
      </div>
    </ReusableModal>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useAuthStore } from '@/stores/auth'; // Import the auth store
import { useUsersStore } from '@/stores/users';
import { useUserRequestsStore } from '@/stores/user_requests';
import { useTeamsStore } from '@/stores/teams';
import ReusableModal from "@/components/ReusableModal.vue";
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const usersStore = useUsersStore();
const teamsStore = useTeamsStore();
const userRequestsStore = useUserRequestsStore();
const selectedTeam = ref(null);
const username = computed(() => {
  return authStore.getUsername() === '' ? 'log in' : authStore.getUsername();
});
const usernameInput = ref('');
const passwordInput = ref('');
const acceptCookies = ref(false);
const newAdmin = ref(false);
const admin = useCookie('admin')
const teams = computed(()  => teamsStore.getTeams());

const usernameModalActive = ref(false);
const loginModalActive = ref(false);
const requestModalActive = ref(false);
const toggleUsernameModal = () => {
  usernameModalActive.value = !usernameModalActive.value;
};
const toggleLoginModal = () => {
  loginModalActive.value = !loginModalActive.value;
};
const toggleRequestModal = () => {
  requestModalActive.value = !requestModalActive.value;
};

const isNewAdmin = computed(() => authStore.isNewAdmin);
const invalidUsername = computed(() => authStore.invalidUsername);

watch(isNewAdmin, () => {
  if (isNewAdmin.value == true) {
    loginModalActive.value = true;
    authStore.isNewAdmin = false;
  }
});
watch(invalidUsername, () => {
  if (invalidUsername.value == true) {
    requestModalActive.value = true;
    authStore.invalidUsername = false;
  }
});

const saveUsername = () => {
  if (acceptCookies.value) {
    authStore.setUsername(usernameInput.value);
    document.cookie = `username=${usernameInput.value}; path=/; max-age=${60 * 60 * 24 * 365}`; // Cookie expires in 1 year
    toggleUsernameModal();
  }
};

const loginAuthentication = () => {
  authStore.login(usernameInput.value, passwordInput.value, 1);
  toggleLoginModal();
};


const clearUsername = () => {
  authStore.logout();
  document.cookie = `username=${'---'}; path=/; max-age=${60 * 60 * 24 * 365}`; // Cookie expires in 1 year
  admin.value = null
  toggleUsernameModal();
};

// Sende en ny request
const sendRequest = async () => {
  try {
    // Ensure selectedTeam has a valid value
    if (selectedTeam.value !== null) {
      await userRequestsStore.submitRequest({
        username: usernameInput.value,
        selectedTeam: selectedTeam.value,
      });
      console.log('Request sent successfully');
      toggleRequestModal();
    } else {
      console.error('No team selected');
    }
  } catch (error) {
    console.error('Error sending request:', error);
  }
};

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

onMounted(() => {
  // Check for username cookie and set it in the store
  authStore.tokenCheck();
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
