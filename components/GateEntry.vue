<template>
  <div class="list">
    <div class="title">
      <span>Gate example</span>
    </div>
    <div class="progress">
      <ProgressBar :progressNumber="30" />
    </div>
    <div class="plannedDate">
      <DateEntry :dateString = "2023-06-22"/>
    </div>
    <div class="remaining">
    </div>
    <div class="daysToEnd">
    </div>
    <div class="completion">
      <DateEntry "2025-12-03"/>
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
  width 50%;
}

.plannetDate {
  width: 10%;
}
.remaining {
  width: 5%;
}
.daystoEnd {
  width: 5%;
}
.completion {
width: 10%
}
</style>
