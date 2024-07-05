<template>
    <div v-if="isLoggedIn">
      Team:
      <div class="dropdown">
        <div class="dropdown-selected" @click="toggleDropdown">
          <span>{{ currentUserTeamName }}</span>
        </div>
        <div class="dropdown-menu" v-if="dropdownOpen">
          <div class="dropdown-item" v-for="team in filteredTeams" :key="team.id" @click="selectTeam(team.id)">
            {{ team.team }}
          </div>
        </div>
      </div>
    </div>
  </template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useTeamsStore } from '@/stores/teams';
import { useAuthStore } from '@/stores/auth';
import {useProjectsStore} from '@/stores/projects'

const router = useRouter();
const authStore = useAuthStore();
const teamStore = useTeamsStore();
const projectStore = useProjectsStore();

const dropdownOpen = ref(false);
const teams = ref([]);
const currentUserTeam = computed(() => authStore.getUserTeam());
const currentUserTeamName = computed(() => {
  const teamName = teamStore.getTeamName(currentUserTeam.value);
  return teamName || 'Default';
});

const filteredTeams = computed(() => {
    const currentTeamName = teamStore.getTeamName(currentUserTeam.value);
 return teams.value.filter(team => team.team !== currentTeamName && team.id !== 0);
});

const isLoggedIn = authStore.isLoggedIn();

onMounted(async () => {
    await teamStore.fetchTeams();
    teams.value = teamStore.getTeams();
    
});

function toggleDropdown() {
    dropdownOpen.value = !dropdownOpen.value;
}

function selectTeam(teamId) {
    authStore.setUserTeam(teamId);
    projectStore.fetchProjects();
    toggleDropdown();
}
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

button.admin {
    background-color: #28a745;
}

button.admin:hover {
    background-color: #218838;
}

button.admin:active {
    background-color: #1e7e34;
}

.dropdown {
    position: relative;
    margin: 10px;
    display: inline-block;
}

.dropdown-selected {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #007BFF;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;
}

.dropdown-selected:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
}

.dropdown-menu {
    position: absolute;
    width: 100%;
    border: 1px solid #000;
    border-radius: 5px;
    background-color: #d3e5fc;
    margin-top: 5px;
    z-index: 1000;
    width: fit-content;
}

.dropdown-item {
    padding: 10px 20px;
    font-size: 16px;
    color: #333;
    text-align: center;
    cursor: pointer;
    user-select: none;
}

.dropdown-item:hover {
    background-color: rgba(0, 0, 0, 0.1);
}
</style>
