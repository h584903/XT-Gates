<template>
    <div class="user-card">
        <div class="username">{{ props.entryData.username }}</div>
        <div class="input-container">
            <select name="team" id="team" class="team" @change="updateTeam($event.target.value)">
                <option v-if="teamUnedited">{{ props.entryData.team }}</option>
                <option v-for="team in filteredTeams" :key="team.id">{{ team.team }}</option>
            </select>
        </div>
        <div class="input-container">
            <select name="role" id="role" class="role" @change="updateRole($event.target.value)" v-if="superadmin">
                <option v-if="roleUnedited">{{ props.entryData.role }}</option>
                <option v-for="role in filteredRoles" :key="role.id">{{ role.role }}</option>
            </select>
            <div class="role-text" v-else>
                {{ props.entryData.role }}
            </div>
        </div>
        <div class="delete" @click.stop="toggleModal" v-if="superadmin">
            <img src="/assets/x.svg" alt="Delete" />
        </div>
        <Modal @close="toggleModal" :modalActive="modalActive" v-if="superadmin">
            <p>Delete user "{{ props.entryData.username }}"?</p>
            <button @click="deleteUserHandler" class="deleteButton">Yes</button>
            <button @click="toggleModal" class="cancelButton">No</button>
        </Modal>
    </div>
</template>

<script setup>
import Modal from "@/components/ReusableModal.vue";

const authStore = useAuthStore();
const teamStore = useTeamsStore();
const roleStore = useRolesStore();
const userStore = useUsersStore();

const superadmin = ref(authStore.isSuperAdmin());
const teams = ref([]);
const roles = ref([]);
const teamUnedited = ref(true);
const roleUnedited = ref(true);

const props = defineProps({
    entryData: {
        type: Object,
        required: true
    }
});

const filteredTeams = computed(() => {
    return teams.value.filter(team => team.team !== props.entryData.team);
});

const filteredRoles = computed(() => {
    return roles.value.filter(role => role.role !== props.entryData.role);
});

onMounted(async () => {
    await teamStore.fetchTeams();
    teams.value = teamStore.teams;

    await roleStore.fetchRoles();
    roles.value = roleStore.roles;
});


const modalActive = ref(false);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};

function updateTeam(teamName) {
    const teamId = teamStore.getTeamId(teamName);
    teamUnedited.value = false; // Update the reactive flag
    if (teamId !== null) {
        userStore.updateTeam(teamId, props.entryData.id);
    }
}

function updateRole(roleName) {
    const roleId = roleStore.getRoleId(roleName);
    roleUnedited.value = false; // Update the reactive flag
    if (roleId !== null) {
        userStore.updateRole(roleId, props.entryData.id)
    }
}

function deleteUserHandler() {
    const userId = props.entryData.id;
    userStore.deleteUser(userId);
    toggleModal();
}
</script>

<style scoped>
.user-card {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 5px;
    background-color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.username {
    flex: 2;
    padding-right: 10px;
}

.input-container {
    flex: 1;
    display: flex;
    align-items: center;
}

.team, .role, .role-text {
    width: 100%;
    padding-left: 5px;
    padding-right: 5px;
}

.role-text {
    display: flex;
    align-items: center;
    height: 100%;
    padding-left: 5px; /* Adjust for consistent padding */
}

.delete {
    cursor: pointer;
    width: 10px;
    margin-left: 5px;
    margin-right: 2px;
}

@media (max-width: 768px) {
    .user-card {
        flex-direction: column;
    }

    .username, .input-container {
        width: 100%;
    }
}
</style>
