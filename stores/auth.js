import { ref, computed } from 'vue';
import { packProject } from '@/utils/packProject.js';
import { defineStore } from "pinia";
import { H3Event, getCookie } from 'h3'; 


export const useAuthStore = defineStore('auth', () => {

    const username = ref('---');
    const adminName = ref('---');
    const isNewAdmin = ref(false);
    const role = ref('---');
    const token = ref(null);
    const newName = ref(true); // variable to determine if the name is unknown in the database


    function getUsername() {
        return username.value;
    }


    /**
     * Login Function, that is the enterance to the login handeling
     * It checks if there is a password, and if there is, it reroutes to the correct
     *
     */
    async function login(newName, password) {
      
        if (await validUsername(newName)) {
            username.value = newName;
            const newToken = await createToken(newName);
            console.log('Token successfully created:', newToken);
            token.value = newToken; 
            return true;
        } else {
            clearUserData();
            return false;
        }
    }

    /**
     * Checks a username if it is valid, if the fetched role, isn't normal then it asks for more info
     * @param {string} username - The username to be checked
     * @returns {boolean}
     */
    async function validUsername(newUsername) {
        if (newUsername === '') {
            return false
        }
        try {
            const fetchedRole = await fetchAccess(newUsername);
            if (!fetchedRole) {
                clearUserData();
                return false
            }
            else if (fetchedRole.role == 1) {
                clearUserData();
                role.value=fetchedRole.role
                return true;
            }
            else if (Number.isInteger(fetchedRole.role)) {
                // Now checking if they have password
                clearUserData();
                adminName.value = newUsername;
                isNewAdmin.value = true;
                console.log("Valid but needs admin password");
                return true;
            }
            else
            clearUserData();
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
        const projectStore = useProjectsStore();
        const isValid = await validUsername(newName);
    
        if (isValid) {
            if (role.value != 1) {
                projectStore.setProjects([]);
                return false;
            }
            username.value = newName;
            console.log('Username set in authStore for:', username.value);
            return true;
        } else {
            username.value = newName; // Set username regardless of validity
            console.log('Username set in authStore for:', username.value);
            projectStore.setProjects([]);
            clearUserData();
            return false;
        }
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

    const verifyCurrentUserToken = async () => {
        try {
            const storedToken = token.value;
            if (storedToken) {
                const decoded = await verifyToken(storedToken);
                if (decoded) {
                    username.value = decoded.id;
                } else {
                    console.error("Token verification failed");
                    clearUserData();
                }
            } else {
                clearUserData();
            }
        } catch (error) {
            console.error("Error verifying current user token:", error);
            clearUserData();
        }
    };

    const clearUserData = () => {
        // username.value = '---';
        adminName.value = '---';
        isNewAdmin.value = false;
        role.value = '---';
    }

    verifyCurrentUserToken();

    function isSuperAdmin() {
        let user = username.value;

        if(role.value == 3) {
            return true;
        } else {
            return false;
        }
    }


    return {username, role, getUsername, setUsername, isAdmin, isNewAdmin, adminName, validUsername, login, isSuperAdmin}

})
