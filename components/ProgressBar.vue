<script setup>
  // Henter ut progressnumber fra kallet av komponenten
  const props = defineProps({
    progressNumber: Number
  });

</script>


<template>
    <!--Dette er baren under progress-->
  <div class="bar">
    <!--Dette er baren for progress som har en dynamisk størrelse med tallet som er hentet-->
    <div class="bar progress" :style="{ width: props.progressNumber + '%' }"></div>
  </div>
</template>


<style>
.bar {
  width: 100%;
  height: 20px;
  background-color: white;
  border:1px solid black;
  border-radius: 13px; /*legg denne til for runde kanter*/
}

.bar.progress {
  border: 0px;
  width: var(--progress);
  background-color: #A5CCFF;
}
</style>
