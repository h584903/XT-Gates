<template>
  <div class="list-wrapper">
    <ListDesc/>
    <hr class="solid">
    <div v-for="entry in prosjektliste" :key="entry.id">
      <ProjectEntry :entryData="entry"/>
      <hr class="solid">
    </div>
    <button v-on:click="addItemToList">Press me</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ProjectEntry from './ProjectEntry.vue';

const prosjektliste = ref([
  {}, // Initial items
  {}, // Initial items
  {}, // Initial items
  {}  // Initial items
]);

// Function to add a new item to the list
const addItemToList = () => {
  prosjektliste.value.push({}); // Add a new item to the list
  console.log(prosjektliste.value.length); // Log the length of prosjektliste
};
</script>


<style>
.list-wrapper {
  display: flex;
  flex-direction: column;
  width: 80%
}

hr.solid {
  width: 100%;
  border-top: 1px solid grey;
}
</style>
