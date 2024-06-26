<template>
    <div v-if="admin">
        <div v-for="req in requests" :key="req.id">
            <AdminComponentsRequestEntry :entryData="req"></AdminComponentsRequestEntry>
        </div>
    </div>
</template>

<script setup>
const projectStore = useProjectsStore();
const userStore = useUsersStore();
const requestStore = useUserRequestsStore();
const authStore = useAuthStore();

const requests = ref([])

projectStore.fetchProjects();

const admin = computed(() => authStore.isAdmin());

onMounted(() => {
    fetchRequests();
})

async function fetchRequests() {
    requestStore.fetchRequests();
    requests.value = requestStore.getRequests();
    console.log(requests.value)
}

</script>

<style scoped>

</style>