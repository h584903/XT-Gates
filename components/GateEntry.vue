<script setup>
  const plannedDate = "2024-03-18"
  const completionDate = "2024-03-19"
</script>
<template>
  <div class="list">
    <div class="title">
      <span>Gate example</span>
    </div>
    <div class="progress">
      <ProgressBar :progressNumber="30" />
    </div>
    <div class="plannedDate">
      <DateEntry :dateString = plannedDate />
    </div>
    <div class="remaining">
      <span>test</span>
    </div>
    <div class="daysToEnd">
      <span>test</span>
    </div>
    <div class="completion">
      <DateEntry :dateString = completionDate />
    </div>
  </div>
</template>
<style scoped>

.list {
  display: flex;
  flex-direction: row;
}

.title {
  width: 20%;
}
.progress {
  width: 50%;
}

.plannedDate {
  width: 10%;
}
.remaining {
  width: 5%;
}
.daystoEnd {
  width: 5%;
}
.completion {
  width: 10%;
}
</style>
<script setup>
  
</script>
