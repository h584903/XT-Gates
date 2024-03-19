<template>
  <div class="ProjectNameList"><!--Liste som displayer navn på aktive prosjekt. Må endres senere.-->
    <NuxtLink to="project_1">Project 1</NuxtLink>
    <NuxtLink to="project_2">Project 2</NuxtLink>
  </div>
</template>

<script lang="ts" setup>

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