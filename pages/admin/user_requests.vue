<template>
    <div v-if="admin">
        <div>
            <h1>User requests:</h1>
        </div>
        <AdminComponentsRequestListDesc></AdminComponentsRequestListDesc>
        <div v-for="req in requests" :key="req.id">
            <AdminComponentsRequestEntry :entryData="req"></AdminComponentsRequestEntry>
        </div>
        <div class="bottom-spacer"></div>
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

watchEffect(() => {
    requests.value = requestStore.getRequests();
})

async function fetchRequests() {
    await requestStore.fetchRequests();
    requests.value = requestStore.getRequests();
}

</script>

<style scoped>

.bottom-spacer {
    height: 10vh;
}
</style>