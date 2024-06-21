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

    //Metode som returnerer true om en innlogget bruker er en administratorbruker
    //Må kobles mot databasen senere, foreløpig veldig enkel.
    function isAdmin() {
        let user = username.value;

        //Array over de brukernavn som skal godkjennes som administratorer
        let acceptedAdmins = [
            "Kristoffer Madsen",
            "Petter Tesdal",
            "Eirik Sangiorgi",
            "Morten Wilhelmsen",
            "admin",
            "Admin",
            "ADMIN"
        ]
        if(acceptedAdmins.includes(user)) {
            return true;
        } else {
            return false;
        }
    }

    return {username, 
        getUsername, 
        setUsername, 
        isAdmin}
})