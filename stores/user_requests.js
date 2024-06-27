import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useUserRequestsStore = defineStore('user_requests', () => {

    const user_requests = ref([]);

    // Fetches request from the database and adds them to the store
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
    }

    // Just a function to get the requests in the store
    function getRequests() {
        return user_requests.value;
    }

    // Function to submit a new user request to the backend
    async function submitRequest(request) {
        try {
            const response = await $fetch('/user_requests/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            });

            if (response.status === 201) {
                // Assuming the backend returns the new request data
                user_requests.value.push(response.data);
                console.log('Request submitted successfully:', response.data);
            } else {
                console.error('Error submitting request:', response);
            }
        } catch (error) {
            console.error('Error submitting request:', error);
            throw new Error(`Failed to submit request: ${error.message}`);
        }
    }

    // Function to decline a request. Deletes the request from both store and database
    async function declineUser(id) {
        try {
            await $fetch(`/user_requests/${id}`, {
                method: 'DELETE'
            });
            user_requests.value = user_requests.value.filter(request => request.id !== id);
            console.log("Declined request with id: " + id);
        } catch (error) {
            console.error('Error declining user request:', error);
        }
    }

    // Function to approve a request. Deletes the request from both store and database, but only after adding it to the user table/store
    async function approveUser(id) {
        const teamStore = useTeamsStore();
        await teamStore.fetchTeams();
        try {
            // Get the user request details
            const userRequest = user_requests.value.find(request => request.id === id);
            if (!userRequest) {
                throw new Error('User request not found');
            }

            // Make the API call to add the user to the user table
            await $fetch('/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: userRequest.username,
                    team: teamStore.getTeamId(userRequest.team)
                })
            });

            // Remove the user request from the store and the backend
            await $fetch(`/user_requests/${id}`, {
                method: 'DELETE'
            });
            user_requests.value = user_requests.value.filter(request => request.id !== id);
            console.log("Approved request with id: " + id);
        } catch (error) {
            console.error('Error approving user request:', error);
        }
    }

    function reqCount() {

        return user_requests.value.length;

    }

    return {
        user_requests,
        fetchRequests,
        getRequests,
        submitRequest,
        declineUser,
        approveUser,
        reqCount
    };

});
