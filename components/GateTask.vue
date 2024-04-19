<script setup>
  const props = defineProps({
  taskID: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  responsiblePerson: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  step: {
    type: Number,
    required: true
  }
  })
</script>
<template>
  <div class="list">
    <div class="w5">
      <span>{{ props.step }}</span>
    </div>
    <div class="w15">
      <span>{{ props.title }}</span>
    </div>
    <div class="w10">
      <span>{{ props.responsiblePerson }}</span>
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
      <span>{{ props.duration }}</span>
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
