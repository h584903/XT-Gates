<template>
    <div class="req-card">
        <div class="username">{{ props.entryData.username }}</div>
        <div class="team">{{ props.entryData.team }}</div>
        <button class="approve" @click="toggleApproveModal">Y</button>
        <button class="decline" @click="toggleDeclineModal">N</button>

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
    console.log(`Approving user: ${props.entryData.username}`);
    toggleApproveModal();
};

const declineUserHandler = () => {
    // Implement the logic to decline the user
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
}

.username {
    width: 30%;
}

.team {
    width: 20%;
}

.approve, .decline {
    margin: 0 5px;
}

.approveButton, .declineButton, .cancelButton {
    margin: 10px;
}
</style>
