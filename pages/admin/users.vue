<template>
    <div v-if="admin">
        <div>
            <h1>Users:</h1>
        </div>
        <AdminComponentsUserListDesc></AdminComponentsUserListDesc>
        <div v-for="user in users" :key="user.id">
            <AdminComponentsUserEntry :entryData="user"></AdminComponentsUserEntry>
        </div>
    </div>
    <div v-else>This is an admin only page, please do not attempt to access it without being logged in as an admin.</div>
</template>

<script setup>
const projectStore = useProjectsStore();
const userStore = useUsersStore();
const authStore = useAuthStore();
const teamStore = useTeamsStore();

const admin = computed(() => authStore.isAdmin());
const users = ref([])
const roles = ref([])
const teams = ref([])

teamStore.fetchTeams();
projectStore.fetchProjects();

onMounted(() => {
    fetchUsers();
    fetchTeams();
    fetchRoles();
})

watchEffect(() => {
    users.value = userStore.getUsers();
})

async function fetchUsers() {
    userStore.fetchUsers();
    users.value = userStore.getUsers();
}

async function fetchTeams() {
    teamStore.fetchTeams();
    teams.value = teamStore.getTeams();
}

async function fetchRoles() {

}
</script>

<style scoped>
.w40 {
    width: 40%;
}


</style>