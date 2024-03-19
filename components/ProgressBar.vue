<script setup>
  // Henter ut progressnumber fra kallet av komponenten
  defineProps({
    progressNumber: Number
  });
</script>

<template>
  <!--Dette er baren under progress-->
  <div class="bar">
    <!--Dette er baren for progress som har en dynamisk størrelse med tallet som er hentete-->
    <div class="bar progress" :style="{ width: progressNumber + '%' }"></div>
  </div>
</template>
<style>
.bar {
  width: 100%;
  height: 20px;
  background-color: grey;
  border-radius: 13px;
}

.bar.progress {
  /*Gjør borderen rund på venstresiden men rett på midten*/
  /*Dette burde forandres når den blir 100%*/
  border-radius: 13px 0px 0px 13px;
  width: var(--progress);
  background-color: green;
}
</style>
