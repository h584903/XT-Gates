<template>
  <div class="list-wrapper">
    <ListDesc/>
    <hr class="solid">
    <!--Oppretter et entry for hvert prosjekt i store.projects-->
    <div v-for="entry in store.projects">
      <ProjectEntry :entryData="entry"/>
      <hr class="solid">
    </div>
    <button @click="addItemToList">Press me</button>
  </div>
</template>

<script setup>

  // importerer prosjekt storeen
  import { useProjectsStore } from '@/stores/projects'
  
  // Initialiserer prosjectStore slik at man kan bruke den ved å kalle på store.
  const store = useProjectsStore();

const index = ref(0);

// Function to add a new item to the list
const addItemToList = () => {
// Legger til et static object
const project = 
  store.addProject("Hest", 50, "2024-09-14", "2024-09-15", true, "Kristoffer Madsen", "comment"); // Generate item to be added to list
  index.value++;
};

</script>


<style scoped>
.list-wrapper {
  display: flex;
  flex-direction: column;
  width: 90%
}

hr.solid {
  width: 100%;
  border-top: 1px solid grey;
}

</style>
