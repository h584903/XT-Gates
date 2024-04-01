<script>
</script>
<template>
  <div class="list">
    <div class="w5">
      <span>step 1</span>
    </div>
    <div class="w15">
      <span>activity</span>
    </div>
    <div class="w10">
      <span>person</span>
    </div>
    <div class="w10">
      <DateEntry :dateString = "'2024-05-05'" />
    </div>
    <div class="w10">
      <span>Petter Tesdal</span>
    </div>
    <div class="w5">
      <label class="container">
        <input type="checkbox">
        <span class="checkmark"></span>
      </label>
    </div>
    <div class="w5">
      <PlanStatus :onSchedule="true" />
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
