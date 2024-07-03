<template>
    <div v-if="admin">
        <h1>Administrator page:</h1>
        <div class="link-wrapper">
            <NuxtLink to="admin/users" class="buttonStyling">Users</NuxtLink>
            <NuxtLink to="admin/user_requests" class="buttonStyling">Incoming user requests ({{ reqnr }})</NuxtLink>
            <NuxtLink to="admin/teams" class="buttonStyling">Teams</NuxtLink>
            <div v-if="superadmin" class="link-wrapper">
                <button class="buttonStyling" @click="toggleAdmModal">
                    Change admin password
                </button>
                <button class="buttonStyling" @click="toggleSuperModal">
                    Change super admin password
                </button>
            </div>
        </div>
    </div>
    <div v-else>
        This is an admin only page, please do not attempt to access it without being logged in as an admin.
    </div>

    <Modal :modal-active="admModalActive" @close="toggleAdmModal">
        <template v-slot:default>
            <h2>Change Admin Password</h2>
            <form @submit.prevent="changeAdminPassword">
                <label>Old password:</label><br />
                <input type="password" v-model="adminOldPassword" placeholder="Enter old password" required /><br />
                <label>New password:</label><br />
                <input type="password" v-model="adminNewPassword" placeholder="Enter new password" required /><br />
                <label>Repeat new password:</label><br />
                <input type="password" v-model="adminRepeatPassword" placeholder="Repeat new password" required /><br />
                <button type="submit" class="basicButton">Change Password</button>
            </form>
            <button @click="toggleAdmModal" class="basicButton">Close window</button>
        </template>
    </Modal>

    <Modal :modal-active="superModalActive" @close="toggleSuperModal">
        <template v-slot:default>
            <h2>Change Super Admin Password</h2>
            <form @submit.prevent="changeSuperAdminPassword">
                <label>Old password:</label><br />
                <input type="password" v-model="superAdminOldPassword" placeholder="Enter old password"
                    required /><br />
                <label>New password:</label><br />
                <input type="password" v-model="superAdminNewPassword" placeholder="Enter new password"
                    required /><br />
                <label>Repeat new password:</label><br />
                <input type="password" v-model="superAdminRepeatPassword" placeholder="Repeat new password"
                    required /><br />
                <button type="submit" class="basicButton">Change Password</button>
            </form>
            <button @click="toggleSuperModal" class="basicButton">Close window</button>
        </template>
    </Modal>
</template>

<script setup>
import { ref, computed } from 'vue';
import Modal from '~/components/ReusableModal.vue';

const authStore = useAuthStore();
const projectStore = useProjectsStore();
const requestStore = useUserRequestsStore();

const admin = computed(() => authStore.isAdmin());
const superadmin = computed(() => authStore.isSuperAdmin());

await requestStore.fetchRequests();
const reqnr = requestStore.reqCount();

projectStore.fetchProjects();

const admModalActive = ref(false);
const toggleAdmModal = () => {
    admModalActive.value = !admModalActive.value;
};

const superModalActive = ref(false);
const toggleSuperModal = () => {
    superModalActive.value = !superModalActive.value;
};

const adminOldPassword = ref('');
const adminNewPassword = ref('');
const adminRepeatPassword = ref('');

const superAdminOldPassword = ref('');
const superAdminNewPassword = ref('');
const superAdminRepeatPassword = ref('');

async function changeAdminPassword() {
    const correctPass = await authStore.checkPass(adminOldPassword.value, 2);

    if (adminNewPassword.value !== adminRepeatPassword.value) {
        alert('New passwords do not match!');
        return;
    } else if (!correctPass) {
        alert('Current password incorrect!');
        return;
    }

    await authStore.updatePass(adminNewPassword.value, 2);
    toggleAdmModal();
    console.log('Admin password changed');
}

async function changeSuperAdminPassword() {
    const correctPass = await authStore.checkPass(superAdminOldPassword.value, 3);

    if (superAdminNewPassword.value !== superAdminRepeatPassword.value) {
        alert('New passwords do not match!');
        return;
    } else if (!correctPass) {
        alert('Current password incorrect!');
        return;
    }

    await authStore.updatePass(superAdminNewPassword.value, 3);
    toggleSuperModal();
    console.log('Super Admin password changed');
}
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

.basicButton {
    padding: 5px;
    margin-top: 5px;
}

.link-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: fit-content;
}
</style>
