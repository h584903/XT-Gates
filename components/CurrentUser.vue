<template>
    <!-- Må etterhvert hentes ut fra bruker, attributt 'username' -->
    <label>User: {{ username }}</label>
</template>

<script setup>
    // Setter 'user' til å kunne reagere på endringer
    const username = ref(null);

    // Logikken for å hente ut brukernavn
    const getUsername  = () => {
        return "Bob";
    }
    // Setter username til navnet hentet fra getUsername, for øyeblikket 'Bob'
    username.value = getUsername();

</script>