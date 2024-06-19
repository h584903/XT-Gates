import { ref, computed } from 'vue';
import { packProject } from '@/utils/packProject.js';
import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', () => {

    const username = ref('---');

    // Sier om man er logget inn eller ikke
    const isLoggedIn = computed(() => {
        return username.value !== 'John Doe' && username.value !== '---';
    });


    function getUsername() {
        return username.value;
    }

    function setUsername(newName) {
        console.log("ASD" + newName)
        if (newName === "") {
            newName = "John Doe"
        }
        username.value = newName;
    }

    return {username, isLoggedIn, getUsername, setUsername}
})
