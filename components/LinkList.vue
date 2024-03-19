<template>
  <div class="ProjectNameList">
    <NuxtLink to="project_1">Project 1</NuxtLink>
    <NuxtLink to="project_2">Project 2</NuxtLink>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.ProjectNameList{
    display: flex;
    flex-direction: column;
    margin: 0;
    margin-left: 10px;
    font-size: 20px;
}
</style>