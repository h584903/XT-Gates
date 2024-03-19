<template>
  <!-- Lager en komponent som kan motta en boolsk verdi, og oppretter en sirkel basert på de -->
  <span :class="{ 'statusCircle': true, 'onSchedule': onSchedule, 'error': !onSchedule }"></span>
</template>

<!-- Default export for enkelt eksportere til andre filer. Sender med en boolsk verdi 
    "onSchedule" som settes til True eller False -->
<script>
export default {
  name: 'circle',
  props: {
    onSchedule: {
      type: Boolean,
      default: false
    }
  }
}
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
.inProgress {
  background-color:chartreuse;
}
/* Hvis den ikke er i progress, sett fargen til gul */
.error {
  background-color: yellow;
}
</style>
