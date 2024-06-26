import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useUserRequestsStore = defineStore('user_requests', () => {
    const user_requests = ref([])

    async function fetchRequests() {
        try {
            const response = await $fetch('/user_requests', {
                method: 'GET'
            });
            const data = response.data;
            const RequestArray = Object.values(data).map(request => ({
                id: request.ID,
                username: request.username,
                team: request.team
            }));
            user_requests.value = RequestArray;
        } catch (error) {
            console.error('Error fetching user requests', error);
        }
        console.log(user_requests.value)
    }
    
    function getRequests() {
        return user_requests.value;
    }

    return {
        user_requests,
        fetchRequests,
        getRequests
    }
})