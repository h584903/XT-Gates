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
    <div class="titleWrapper">
      <span>Example Project</span>
    </div>
    <div class="progressWrapper">
      <ProgressBar :progressNumber="entryData.progress" />
    </div>
    <div class="dateWrapper">
      <DateEntry :dateString = plannedDate />
    </div>
    <div class="dateWrapper">
      <DateEntry :dateString = PODate />
    </div>
    <div class="statusWrapper">
      <PlanStatus />
    </div>
    <div class="personWrapper">
      <PersonInCharge />
    </div>
  </div>
</template>


<style scoped>

.list {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}
.titleWrapper {
  margin: auto;
  text-align: center;
  width: 20%;
}
.progressWrapper {
  margin: auto;
  text-align: center;
  width: 50%;
}
.dateWrapper {
  margin: auto;
  text-align: center;
  width: 10%;
}
.statusWrapper {
  margin: auto;
  text-align: center;
  width: 5%
}
.personWrapper {
  margin: auto;
  text-align: center;
  width: 15%
}
</style>
