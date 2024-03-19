<template>
  <div class="list-wrapper" v-for="entry in prosjektliste">
    <ProjectEntry :entryData="entry"/>
    <hr class="solid">
  </div>
</template>


<script setup>
import ProjectEntry from './ProjectEntry.vue';

const prosjektliste = [];

prosjektliste.push({});
prosjektliste.push({});
prosjektliste.push({});
prosjektliste.push({});
prosjektliste.push({});
prosjektliste.push({});
prosjektliste.push({});

</script>


<style>
.list-wrapper {
  display: flex;
  flex-direction: column;
}
hr.solid {
  width: 100%;
  border-top: 1px solid grey;
}
</style>
