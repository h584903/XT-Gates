import { ref, computed } from 'vue';
import { packProject } from '@/utils/packProject.js';
import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', () => {

    const username = ref('---');
    const adminName = ref('---');
    const isNewAdmin = ref(false);
    const role = ref('---');

    function getUsername() {
        return username.value;
    }


    /**
     * Login Function, that is the enterance to the login handeling
     * It checks if there is a password, and if there is, it reroutes to the correct
     *
     */

    /**
     * Checks a username if it is valid, if the fetched role, isn't normal then it asks for more info
     * @param {string} username - The username to be checked
     * @returns {boolean}
     */
    async function validUsername(newUsername) {
        try {
            const fetchedRole = await fetchAccess(newUsername);
            console.log("Fetched role:", fetchedRole);
            if (!fetchedRole) {
                console.log("not valid: " + newUsername)
                adminName.value = '---';
                isNewAdmin.value = false;
                return false
            }
            else if (fetchedRole == 1) {
                console.log("Valid: " + fetchedRole);
                role.value=fetchedRole.role
                adminName.value = '---';
                isNewAdmin.value = false;
                return true;
            }
            else if (fetchedRole) {
                // Now checking if they have password
                adminName.value = newUsername;
                isNewAdmin.value = true;
                console.log("Valid but needs admin password");
                return false;
            }
            else
            adminName.value = '---';
            isNewAdmin.value = false;
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

        if(role.value == 2) {
            return true;
        } else {
            return false;
        }
    }

    return {username, role, getUsername, setUsername, isAdmin, isNewAdmin, adminName}
})
