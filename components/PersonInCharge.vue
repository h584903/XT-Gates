<template>
  <span> {{ name }}</span>
</template>

<script setup>
import { abrName } from '~/utils/abrName'; //Importerer funksjonen for å forkorte et navn

const fullName = "Kristoffer Fjeldstad Madsen"; // Må endres til dynamisk senere
const name = abrName(fullName);
</script>

<style>

</style>
