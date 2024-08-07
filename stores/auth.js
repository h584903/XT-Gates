import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useCookie } from '#app';

export const useAuthStore = defineStore('auth', () => {
    const username = ref('---');
    const invalidUsername = ref(false);
    const userTeam = ref('1');
    const adminName = ref('---');
    const isNewAdmin = ref(false);
    const role = ref('---');
    const token = ref(null);

    function getUsername() {
        return username.value;
    }
    

    async function login(newName, password) {
        const admin = useCookie('admin');
        let token = '';
        switch (role.value) {
            case 1:
                console.log('Something went wrong, role is normal user');
                return false;
            case 2:
                token = await verifyPass(newName, password, 2);
                if (!token) {
                    console.log('Invalid password');
                    clearUserData();
                    return false;
                } else {
                    username.value = uppercaseName(newName);
                    role.value = 2;
                    admin.value = token;
                    return true;
                }
            case 3:
                token = await verifyPass(newName, password, 3);
                if (!token) {
                    console.log('Invalid password');
                    clearUserData();
                    return false;
                } else {
                    username.value = uppercaseName(newName);
                    role.value = 3;
                    admin.value = token;
                    return true;
                }
        }
        return false;
    }

    async function checkPass(pass, role) {
        const requestBody = { pass, role };
        try {
            const response = await $fetch('/users/changeAdminPass', {
                method: 'POST',
                body: JSON.stringify(requestBody),
            });
            console.log('response:', response);
            return response;
        } catch (error) {
            console.log(error);
            return createError({
                statusCode: 500,
                statusMessage: 'Internal Server Error',
                data: 'Failed to verify pass',
            });
        }
    }

    async function updatePass(newPass, role) {
        const requestBody = { newPass, role };
        try {
            const response = await $fetch('/users/changePassword', {
                method: 'POST',
                body: JSON.stringify(requestBody),
            });
            return response;
        } catch (error) {
            console.error('error updating password');
            return createError({
                statusCode: 500,
                statusMessage: 'Internal Server Error',
                data: 'Failed to update pass',
            });
        }
    }

    async function verifyPass(newName, pass, userRole) {
        const requestBody = {
            username: newName,
            pass,
            userRole,
            userTeam: userTeam.value,
        };
        try {
            const response = await $fetch('/users/adminPass', {
                method: 'POST',
                body: JSON.stringify(requestBody),
            });
            return response;
        } catch (error) {
            console.log('Error during fetch:', error);
            return createError({
                statusCode: 500,
                statusMessage: 'Internal Server Error',
                data: 'Failed to verify pass',
            });
        }
    }

    async function tokenCheck() {
        const admin = useCookie('admin');
        if (!admin.value) {
            return false;
        }
        const decryptedToken = await verifyToken(admin.value);
        if (!decryptedToken) {
            clearUserData();
            return false;
        } else {
            username.value = uppercaseName(decryptedToken.user);
            role.value = decryptedToken.userRole;
            userTeam.value = decryptedToken.team;
        }
        return true;
    }

    async function validUsername(newUsername) {
        if (!newUsername) {
            return false;
        }
        try {
            let response = await fetchAccess(newUsername);
            if (!response) {
                clearUserData();
                console.log('We are here');
                invalidUsername.value = true;
                return false;
            } else if (response.role == 1) {
                clearUserData();
                role.value = response.role;
                userTeam.value = response.team;
                return true;
            } else if (Number.isInteger(response.role)) {
                clearUserData();
                role.value = response.role;
                userTeam.value = response.team;
                adminName.value = newUsername;
                isNewAdmin.value = true;
                return true;
            } else {
                clearUserData();
                return false;
            }
        } catch (error) {
            console.error('Error during fetch:', error);
        }
        return false;
    }

    async function fetchToken(newUsername, newPassword, userRole, _userTeam) {
        const requestBody = {
            password: newPassword,
            username: newUsername,
            userRole,
            userTeam: _userTeam,
        };
        try {
            const response = await $fetch('/users/createToken', {
                method: 'POST',
                body: JSON.stringify(requestBody),
            });
            return response;
        } catch (error) {
            console.log('Error during fetch:', error);
            return createError({
                statusCode: 500,
                statusMessage: 'Internal Server Error',
                data: 'Failed to create token',
            });
        }
    }

    async function verifyToken(token) {
        const requestBody = { token };
        try {
            const response = await $fetch('/users/verifyToken', {
                method: 'POST',
                body: JSON.stringify(requestBody),
            });
            return response;
        } catch (error) {
            console.log('Error during fetch:', error);
            return createError({
                statusCode: 500,
                statusMessage: 'Internal Server Error',
                data: 'Failed to verify token',
            });
        }
    }

    async function fetchAccess(newUsername) {
        const requestBody = { username: newUsername };
        try {
            const response = await $fetch('/users/validUser', {
                method: 'POST',
                body: JSON.stringify(requestBody),
            });
            return response;
        } catch (error) {
            console.log('Error during fetch:', error);
            return createError({
                statusCode: 500,
                statusMessage: 'Internal Server Error',
                data: 'Failed to check username in DB',
            });
        }
    }

    async function setUsername(newName) {
        const projectStore = useProjectsStore();
        if (await validUsername(newName)) {
            if (role.value != 1) {
                projectStore.setProjects([]);
                return false;
            }
            username.value = uppercaseName(newName);
            return true;
        }
        projectStore.setProjects([]);
        clearUserData();
        return false;
    }

    function isAdmin() {
        return role.value == 2 || role.value == 3;
    }

    function isLoggedIn() {
        return computed(() => username.value !== 'John Doe' && username.value !== '---');
    }

    function clearUserData() {
        username.value = '---';
        adminName.value = '---';
        isNewAdmin.value = false;
        role.value = '---';
    }

    function logout() {
        clearUserData();
        const projectStore = useProjectsStore();
        projectStore.setProjects([]);
    }

    function isSuperAdmin() {
        return role.value == 3;
    }

    function getUserTeam() {
        return userTeam.value;
    }

    function setUserTeam(t) {
        userTeam.value = t;
    }

    function uppercaseName(name) {
        let words = name.split(" ");
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1).toLowerCase()
        }
        return words.join(" ");
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
        invalidUsername,
        login,
        tokenCheck,
        isSuperAdmin,
        logout,
        getUserTeam,
        setUserTeam,
        isLoggedIn,
        checkPass,
        updatePass,
    };
});
