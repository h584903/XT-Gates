<template>
    <div v-if="admin">
        <AdminComponentsRequestListDesc></AdminComponentsRequestListDesc>
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
    await requestStore.fetchRequests();
    requests.value = requestStore.getRequests();
}

</script>

<style scoped>

</style>