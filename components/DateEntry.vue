<script setup>
  import { defineProps } from 'vue'
  // Får komponenten til å ta imot en String for datoen
  const props = defineProps({
    dateString: String
  })
</script>
<template>
  <div>
    <!-- Her oversettes datoen og gjøres om til riktig format ut ifra lokalet -->
    {{ new Date(props.dateString).toLocaleDateString() }}
  </div>
</template>
