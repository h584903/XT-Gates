<template>
    <div v-if="admin">
        <h1>Administrator page:</h1>
        <div class="link-wrapper">
            <NuxtLink to="admin/users" class="buttonStyling">Users</NuxtLink>
            <NuxtLink to="admin/user_requests" class="buttonStyling">Incoming user requests ({{ reqnr }})</NuxtLink>
            <NuxtLink to ="admin/teams" class="buttonStyling">Teams</NuxtLink>
            <div v-if="superadmin" class="link-wrapper">
                <button class="buttonStyling">Change admin password</button><!--Button for admin password change-->
                <button class="buttonStyling">Change super adminpassword</button><!--Button for superadmin passwordchange-->
            </div>
        </div>
    </div>
    <div v-else>
        This is an admin only page, please do not attempt to access it without being logged in as an admin.
    </div>
</template>

<script setup>
//imports
import ReusableModal from "@/components/ReusableModal.vue";
//...

//init stores
const authStore = useAuthStore();
const projectStore = useProjectsStore();
const requestStore = useUserRequestsStore();

const admin = computed(() => authStore.isAdmin());
const superadmin = computed(() => authStore.isSuperAdmin())
await requestStore.fetchRequests();
const reqnr = requestStore.reqCount();

console.log(reqnr + " requests in store")

projectStore.fetchProjects();

</script>

<style scoped>
.buttonStyling {
    display: inline-block;
    padding: 10px 20px;
    font-size: 16px;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.buttonStyling:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
}

.buttonStyling:active {
    background-color: #004085;
    transform: translateY(0);
}

.link-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
    /* Adds space between the links */
    width: fit-content;
}
</style>