import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useUsersStore = defineStore('users', () => {
    const user = ref();
    const users = ref([]);

    async function fetchUsers() {
        try {
            const response = await $fetch('/users', {
                method: 'GET'
            });
            const data = response.data;
            const usersArray = Object.values(data).map(user => ({
                id: user.ID,
                username: user.username,
                team: user.team,
                role: user.role
            }));
            users.value = usersArray;
        } catch (error) {
            console.error('Error fetching users', error);
        }
        sortUsersAlphabetically();
    }

    function getUsers() {
        return users.value;
    }

    function sortUsersAlphabetically() {
        users.value.sort((a, b) => {
            if (a.username < b.username) return -1;
            if (a.username > b.username) return 1;
            return 0;
        });
    }

    return {
        users,
        fetchUsers,
        getUsers,
        sortUsersAlphabetically
    };
});
