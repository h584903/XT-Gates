<script setup>
  import { ref } from 'vue'
  
  const plannedDate = "2024-03-18"
  const PODate = "2024-03-19"

  const sortDates = () => {
    dates.value.sort((a, b) => new Date(a) - new Date(b))
  }
</script>

<template>
  <!-- Følger prototypen til figma -->
  <div class="list">
  <span>Example Project</span>
  <ProgressBar />
  <DateEntry :dateString = plannedDate />
  <DateEntry :dateString = PODate />
  <PlanStatus/>
  <PersonInCharge />
  </div>
</template>
<style>

.list {
  display: flex;
  justify-content: space-evenly;
}
</style>
