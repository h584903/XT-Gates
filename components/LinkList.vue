<template>
  <div class="ProjectNameList" v-for = "entry in store.projects"><!--Liste som displayer navn på aktive prosjekt. Må endres senere.-->
    <NuxtLink :project="entry" :to="`/projectList/${ entry.id }`">Project {{ entry.id }}</NuxtLink>
  </div>
</template>

<script setup>
  import { useProjectsStore } from '@/stores/projects'

  const store = useProjectsStore();
</script>

<style scoped>

 /*Styling for listen.*/
.ProjectNameList{
    display: flex;
    flex-direction: column;
    margin: 0;
    margin-left: 10px;
    font-size: 20px;
}

/* Hover og tekststyling */
.ProjectNameList a{
  text-decoration: none;
  color: black;
}
.ProjectNameList a:hover{
  text-decoration: none;
  color: grey;
}
</style>
