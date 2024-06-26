import { defineStore } from 'pinia';

export const useUserRequestsStore = defineStore('userRequests', {
  state: () => ({
    requests: [],
  }),
  actions: {
    async submitRequest({ username, selectedTeam }) {
      try {
        const response = await fetch('/api/userRequest', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, selectedTeam }),
        });

        if (!response.ok) {
          throw new Error(`Failed to submit request: ${response.statusText}`);
        }

        const responseData = await response.json();
        console.log('Request submitted successfully:', responseData);

        // Optionally, update local state or perform additional actions
        this.requests.push(responseData); // Example: Store submitted requests locally

        return responseData; // Return response data if needed
      } catch (error) {
        console.error('Error submitting request:', error);
        throw error; // Propagate the error for handling in the component
      }
    },
  },
});
