import { ref, computed } from 'vue';
import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', () => {

    const username = ref('---');
    const role = ref('---');

    function getUsername() {
        return username.value;
    }

    /**
     * Checks a username if it is valid and sets the role if found valid.
     * @param {string} username - The username to be checked
     * @returns {boolean}
     */
    async function validUsername(newUsername) {
        try {
            const fetchedRole = await fetchAccess(newUsername);
            console.log("Fetched role:", fetchedRole);
            if (!fetchedRole) {
                console.log("not valid: " + newUsername)
                return false
            }
            if (fetchedRole) {
                console.log("Valid: " + fetchedRole);
                role.value=fetchedRole.role
                return true;
            }
            return false;

        } catch (error) {
            console.error("Error during fetch:", error);

        }
        return false;

    }

    /**
     * Checks a username if it's valid in the database
     * Returns the role if found
     * @param {string} username - The username to be checked
     * @returns {string} - The role of the user
     */
    async function fetchAccess(newUsername) {

        const requestBody = {
            username: newUsername
        };

        try {
            const response = await $fetch('/users/validUser', {
                method: 'POST',
                body: JSON.stringify(requestBody)
            });

            return response;
        } catch (error) {
            console.log("Error during fetch: " + error)
            return createError({
                statusCode: 500,
                statusMessage: 'Internal Server Error',
                data: 'Failed to check username in DB'
            });
        }

    }

    /**
     * Sets a new name if it is valid.
     * @param {string} newName - The new name to be set.
     * @returns {boolean} - If set true, if notset false.
     */
    async function setUsername(newName) {
        console.log("checking new name: " + newName)
        if (await validUsername(newName)) {
            console.log("Valid, and setting name")
            username.value = newName;
            return true;
        }
        const projectStore = useProjectsStore();
        projectStore.setProjects([]);
        username.value = "---";
        role.value = "---";
        return false;
    }

    //Metode som returnerer true om en innlogget bruker er en administratorbruker
    //Må kobles mot databasen senere, foreløpig veldig enkel.
    function isAdmin() {
        let user = username.value;

        if(role.value == 2 || role.value == 3) {
            return true;
        } else {
            return false;
        }
    }

    function isSuperAdmin() {
        let user = username.value;

        if(role.value == 3) {
            return true;
        } else {
            return false;
        }
    }

    return {
        username,
        role,
        getUsername,
        setUsername,
        isAdmin,
        isSuperAdmin
    }
})
