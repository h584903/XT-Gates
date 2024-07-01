<template>
  <!-- Lager en komponent som kan motta en boolsk verdi, og oppretter en sirkel basert -->
  <span :class="{ 'statusCircle': true, 'onSchedule': onSchedule.valueOf, 'error': !onSchedule }"></span>
</template>

<!-- Default export for enkelt eksportere til andre filer. Sender med en boolsk verdi 
    "onSchedule" som settes til True eller False -->
<script setup>
defineProps ({
  onSchedule: {
     type: Boolean,
     default: false,
  }
})
</script>

<!-- Oppretter sirkelen -->
<style>
.statusCircle {
  height: 25px;
  width: 25px;
  border-radius: 50%;
  display: inline-block;
  border: 2px solid grey;
}
/* Hvis den er inProgress, sett fargen til grønn */
.onSchedule {
  background-color:#3CB043;
}
/* Hvis den ikke er i progress, sett fargen til gul */
.error {
  background-color: yellow;
}
</style>
