import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useRolesStore = defineStore('roles', () => {
    
    const roles = ref([]);

    const fetchRoles = async () => {
        try {
            const response = await $fetch('/roles', {
                method: 'GET'
            });
            const data = response.data;
            const rolesArray = Object.values(data).map(role => ({
                id: role.ID,
                role: role.role
            }));
            roles.value = rolesArray;
        } catch (error) {
            console.error('Error fetching roles', error);
        }
    }

    function getRoles() {
        return roles.value;
    }

    function getRoleId(roleName) {
        const role = roles.value.find(r => r.role === roleName);
        return role ? role.id : null;
    }

    return {
        roles,
        fetchRoles,
        getRoles,
        getRoleId
    };
});
