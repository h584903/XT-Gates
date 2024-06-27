import { ref, computed } from 'vue';
import { defineStore } from "pinia";
import { H3Event, getCookie } from 'h3'; 

export const useAuthStore = defineStore('auth', () => {

    const username = ref('---');
    const userTeam = ref('');
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
    async function login(newName, password, team) {
        const admin = useCookie('admin');
        let token = '';
        let fetchedRole;
        switch(role.value) {
            case 1: // Normal user
                console.log("Something went wrong, role is normal user")
                return false;
            case 2:
                token = await verifyPass(newName, password, 2);
                if (token == false) {
                    console.log("Invalid password")
                    clearUserData();
                    return false;
                } else {
                    username.value = newName;
                    role.value = 2;
                    userTeam.value = team;
                    admin.value = token;
                    return true;
                }
            case 3:
                token = await verifyPass(newName, password, 3);
                if (token == false) {
                    console.log("Invalid password")
                    clearUserData();
                    return false;
                } else {
                    username.value = newName;
                    role.value = 3;
                    userTeam.value = team;
                    admin.value = token;
                    return true;
                }
            
        }
        return false;
    }


    async function verifyPass(newName, pass, userRole) {
        const requestBody = {
            username: newName,
            pass: pass,
            userRole: userRole
        };
        try {
            const response = await $fetch('/users/adminPass', {
                method: 'POST',
                body: JSON.stringify(requestBody)
            });
            return response;
        } catch (error) {
            console.log("Error during fetch: " + error)
            return createError({
                statusCode: 500,
                statusMessage: 'Internal Server Error',
                data: 'Failed to verify pass'
            });
        }
    }

    async function tokenCheck() {
        const admin = useCookie('admin');
        if (!admin.value) {
            return false
        }
        const decryptedToken = await verifyToken(admin.value);
        if (decryptedToken == false) {
            clearUserData();
            return false;
        } else {
            username.value = decryptedToken.user;
            role.value = decryptedToken.userRole;
            userTeam.value = decryptedToken.team;
        }
        return true;
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
                role.value=fetchedRole.role
                adminName.value = newUsername;
                isNewAdmin.value = true;
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

    async function fetchToken(newUsername, newPassword, userRole) {

        const requestBody = {
            password: newPassword,
            username: newUsername,
            userRole: userRole
        };

        try {
            const response = await $fetch('/users/createToken', {
                method: 'POST',
                body: JSON.stringify(requestBody)
            });

            return response;
        } catch (error) {
            console.log("Error during fetch: " + error)
            return createError({
                statusCode: 500,
                statusMessage: 'Internal Server Error',
                data: 'Failed to create token'
            });
        }
    }
    async function verifyToken(token) {
        const requestBody = {
            token: token
        };
        try {
            const response = await $fetch('/users/verifyToken', {
                method: 'POST',
                body: JSON.stringify(requestBody)
            });
            return response;
        } catch (error) {
            console.log("Error during fetch: " + error)
            return createError({
                statusCode: 500,
                statusMessage: 'Internal Server Error',
                data: 'Failed to verify token'
            });
        }
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
        if (await validUsername(newName)) {
            if (role.value != 1) {
                projectStore.setProjects([]);
                return false
            }
            username.value = newName;
            return true;
        }

        projectStore.setProjects([]);
        clearUserData();
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


    const clearUserData = () => {
        username.value = '---';
        adminName.value = '---';
        isNewAdmin.value = false;
        role.value = '---';
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
        isNewAdmin,
        adminName,
        validUsername,
        login,
        tokenCheck,
        isSuperAdmin
    }
})
