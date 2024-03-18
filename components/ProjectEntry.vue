<script setup>
  import { ref } from 'vue'
  
  const dates = ref([
    '2024-03-18',
    '2024-03-19',
    '2024-03-28'
  ])

  const sortDates = () => {
    dates.value.sort((a, b) => new Date(a) - new Date(b))
  }
</script>

<template>
  <!-- Følger prototypen til figma -->
  <div class="list" v-for="(dateString, index) in dates" :key="inex">
  <span>Example Project</span>
  <ProgressBar />
  <DateEntry :dateString="dateString"/>
  <DateEntry :dateString="dateString"/>
  <PlanStatus />
  <PersonInCharge />
  </div>
</template>
<style>

.list {
  display: flex;
  justify-content: space-evenly;
}
</style>
