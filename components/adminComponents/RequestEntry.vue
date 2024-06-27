<template>
    <div class="req-card">
        <div class="username">{{ props.entryData.username }}</div>
        <div class="team">{{ props.entryData.team }}</div>
        <div class="flex1">
            <button class="approve" @click="toggleApproveModal">Approve</button>
            <button class="decline" @click="toggleDeclineModal">Decline</button>
        </div>

        <Modal @close="toggleApproveModal" :modalActive="approveModalActive">
            <p>Approve user "{{ props.entryData.username }}"?</p>
            <button @click="approveUserHandler" class="approveButton">Yes</button>
            <button @click="toggleApproveModal" class="cancelButton">No</button>
        </Modal>

        <Modal @close="toggleDeclineModal" :modalActive="declineModalActive">
            <p>Decline user "{{ props.entryData.username }}"?</p>
            <button @click="declineUserHandler" class="declineButton">Yes</button>
            <button @click="toggleDeclineModal" class="cancelButton">No</button>
        </Modal>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Modal from "@/components/ReusableModal.vue";

const authStore = useAuthStore();
const teamStore = useTeamsStore();
const userStore = useUsersStore();
const requestStore = useUserRequestsStore();

const props = defineProps({
    entryData: {
        type: Object,
        required: true
    }
});

const approveModalActive = ref(false);
const declineModalActive = ref(false);

const toggleApproveModal = () => {
    approveModalActive.value = !approveModalActive.value;
};

const toggleDeclineModal = () => {
    declineModalActive.value = !declineModalActive.value;
};

const approveUserHandler = () => {

    // Implement the logic to approve the user
    requestStore.approveUser(props.entryData.id)

    console.log(`Approving user: ${props.entryData.username}`);
    toggleApproveModal();
};

const declineUserHandler = () => {

    // Implement the logic to decline the user
    requestStore.declineUser(props.entryData.id);

    console.log(`Declining user: ${props.entryData.username}`);
    toggleDeclineModal();
};
</script>

<style scoped>
.req-card {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 5px;
    background-color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 5px;
}

.flex1 {
    flex: 1;
}

.username, .team {
    flex: 2;
    font-size: 1rem;
    color: #333;
}

.approve, .decline {
    padding: 8px 15px;
    border: none;
    border-radius: 5px;
    font-size: 0.9rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    margin: 0 5px;
}

.approve {
    background-color: #4CAF50;
    color: white;
}

.approve:hover {
    background-color: #45a049;
    transform: translateY(-2px);
}

.decline {
    background-color: #f44336;
    color: white;
}

.decline:hover {
    background-color: #e53935;
    transform: translateY(-2px);
}

.approveButton, .declineButton, .cancelButton {
    padding: 8px 15px;
    border: none;
    border-radius: 5px;
    font-size: 0.9rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    margin: 10px 5px;
}

.approveButton {
    background-color: #4CAF50;
    color: white;
}

.approveButton:hover {
    background-color: #45a049;
    transform: translateY(-2px);
}

.declineButton {
    background-color: #f44336;
    color: white;
}

.declineButton:hover {
    background-color: #e53935;
    transform: translateY(-2px);
}

.cancelButton {
    background-color: #9e9e9e;
    color: white;
}

.cancelButton:hover {
    background-color: #757575;
    transform: translateY(-2px);
}
</style>
