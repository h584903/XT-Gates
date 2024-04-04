<script>
</script>
<template>
  <div class="list">
    <div class="w5">
      <span>1.1</span>
    </div>
    <div class="w15">
      <span>activity</span>
    </div>
    <div class="w10">
      <span>Responsible Role</span>
    </div>
    <div class="w10">
      <DateEntry :dateString = "'2024-05-05'" />
    </div>
    <div class="w10">
      <span>Petter Tesdal</span>
    </div>
    <div class="w5">
      <select name="progress" id="task_progress">
        <option value="0.0">0%</option>
        <option value="0.25">25%</option>
        <option value="0.5">50%</option>
        <option value="0.75">75%</option>
        <option value="1.0">100%</option>
      </select>
    </div>
    <div class="w5">
      <PlanStatus :onSchedule="true" />
    </div>
    <div class="w5">
      <span>10</span>
    </div>
  </div>
</template>
<style scoped>
.list {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.list * {
  margin: auto;
  text-align: center;
}
.w20 {
  width: 20%;
}
.w15 {
  width: 15%;
}
.w10 {
  width: 10%;
}
.w5 {
  width: 5%;
}
</style>
