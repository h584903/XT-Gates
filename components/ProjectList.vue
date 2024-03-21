<template>
  <div class="list-wrapper">
    <ListDesc/>
    <hr class="solid">
    <div v-for="entry in prosjektliste" :key="entry.id">
      <ProjectEntry :entryData="entry"/>
      <hr class="solid">
    </div>
    <button @click="addItemToList">Press me</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ProjectEntry from './ProjectEntry.vue';
import { packProject } from '~/utils/packProject';

const prosjektliste = ref([
  // Generates the list for projects
]);


// Function to add a new item to the list
const addItemToList = () => {
  const project = packProject('',50,'','','','',''); // Generate item to be added to list
  prosjektliste.value.push(project); // Add a new item to the list
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
