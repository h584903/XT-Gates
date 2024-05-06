<template>
    <div>
        <label>User:</label>
        <button @click="toggleModal">{{ username }}</button>
    </div>
    <ReusableModal @close="toggleModal" :modalActive="modalActive">
        <div>Enter username:</div>
        <input type="text" v-model="inputText" placeholder="Enter text" />
        <div>
            <button @click="saveUsername">Save</button>
            <button @click="toggleModal">Cancel</button>
        </div>
    </ReusableModal>
</template>


<script setup>
    import Modal from "@/components/ReusableModal.vue"
    const authStore = useAuthStore();
    const modalActive = ref(false);
    const inputText = ref('');

    // Define a computed property to get the username from the store
    const username = computed(() => authStore.getUsername());

    // Function to toggle the modal
    const toggleModal = () => {
        modalActive.value = !modalActive.value;
    };
    
    // Function to save the username
    const saveUsername = () => {
        authStore.setUsername(inputText.value);
        toggleModal();
    };
</script>
