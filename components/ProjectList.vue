<template>
  <div class="list-wrapper">
    <ListDesc/>
    <hr class="solid">
    <div v-for="entry in store.projects">
      <ProjectEntry :entryData="entry"/>
      <hr class="solid">
    </div>
    <button @click="addItemToList">Press me</button>
  </div>
</template>

<script setup>

  import { useProjectsStore } from '@/stores/projects'
  
  const store = useProjectsStore();


// Function to add a new item to the list
const addItemToList = () => {
  store.addProject("Hest",50,"2024-09-14","2024-09-15",true,"Kristoffer Madsen","comment"); // Generate item to be added to list
};

</script>


<style scoped>
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
