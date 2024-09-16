<template>
    <div class="wrapper-row">
      <h1 class="stor">Projects at risk:</h1>
      <div class="projectList">
        <ManagerProjectList />
      </div>
    </div>
  </template>
  
  <script setup> 
  import { useProjectsStore } from '@/stores/projects';
  
  const store = useProjectsStore();
  
  
  </script>

  <style scoped>
  /* Style er scoped for å beholde singleFileComponent struktur */
  .wrapper {
    display: flex;
    flex-direction: row;
  }
  
  .stor {
    font-size: 200%;
  }
  
  h1 {
    text-decoration: underline;
  }

  </style>
  