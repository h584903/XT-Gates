import { ref, computed } from 'vue';
import { packProject } from '@/utils/packProject.js';
import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', () => {

    const username = ref('---');

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

    return {username, getUsername, setUsername}
})