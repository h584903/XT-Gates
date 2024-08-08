<template>
  <div v-if="admin">
    <div>
      <h1>Teams:</h1>
    </div>
    <div v-for="team in filteredTeams" :key="team.id">
      <TeamEntry :entryData="team" />
    </div>
    <div class="bottom-spacer"></div>
    <button class="addButton" @click="toggleAddTeamModal">Add Team</button>

    <ReusableModal @close="toggleAddTeamModal" :modalActive="addTeamModalActive">
      <h2>Add New Team</h2>
      <input type="text" v-model="newTeamName" class="team-input" placeholder="Enter team name" />
      <div>
        <button class="addButton" @click="addTeam">Add</button>
        <button class="closeButton" @click="toggleAddTeamModal">Cancel</button>
      </div>
    </ReusableModal>
  </div>
  <div v-else>
    This is an admin-only page, please do not attempt to access it without being logged in as an admin.
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useProjectsStore } from '@/stores/projects';
import { useAuthStore } from '@/stores/auth';
import { useTeamsStore } from '@/stores/teams';
import ReusableModal from "@/components/ReusableModal.vue";

const projectStore = useProjectsStore();
const authStore = useAuthStore();
const teamStore = useTeamsStore();

// State for Add Team Modal
const addTeamModalActive = ref(false);
const newTeamName = ref('');

// Computed properties
const admin = computed(() => authStore.isAdmin());
const teams = computed(() => teamStore.getTeams());
const filteredTeams = computed(() => teams.value.filter(team => team.id !== 0));

// Function to toggle modal visibility
function toggleAddTeamModal() {
  addTeamModalActive.value = !addTeamModalActive.value;
}

// Fetch teams and projects on component mount
onMounted(() => {
  teamStore.fetchTeams();
  projectStore.fetchProjects();
});

// Function to add a new team
const addTeam = async () => {
  try {
    if (newTeamName.value.trim()) {
      // Calculate the new id based on current max id + 1
      const maxId = Math.max(...teams.value.map(team => team.id));
      const newId = maxId + 1;

      // Call addTeam method from store
      await teamStore.addTeam({
        id: newId,
        team: newTeamName.value,
      });

      // Close modal after successful addition
      toggleAddTeamModal();
    } else {
      alert('Please enter a valid team name');
    }
  } catch (error) {
    console.error('Error adding team:', error);
  }
};
</script>

<style scoped>

.bottom-spacer {
  height: 50px;
}

.addButton,
.closeButton {
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
.closeButton:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

.addButton:active,
.closeButton:active {
  background-color: #003f7f;
  transform: translateY(0);
}

.team-input {
  width: 90%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.row {
  display: flex;
}
</style>
