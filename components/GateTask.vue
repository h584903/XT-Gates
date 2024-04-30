<script setup>
  import { useTasksStore } from '@/stores/tasks';

  const tasksStore = useTasksStore();
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

  // Henter ut tasken som dette er
  const currentTask = tasksStore.tasks.find(t => t.ID === props.taskID);
  const selectedProgress = ref(currentTask ? currentTask.progress : 0);

  function updateProgress() {
    tasksStore.updateTaskProgress(props.taskID, parseInt(selectedProgress.value));
    tasksStore.update
  }

  const editMode = ref(false);
  const taskDuration = ref(currentTask ? currentTask.duration : 0);
  function updateDuration() {
    tasksStore.updateTaskDuration(props.taskID, parseInt(taskDuration.value))
  }
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
        <input type="range" min="0" max="100" step="10" v-model="selectedProgress" @input="updateProgress" />
    </div>
    <div class="w5">
      <PlanStatus :onSchedule="true" />
    </div>
    <div class="w5">
      <div v-if="editMode">
        <input v-model="taskDuration" @blur="saveDuration" @keyup.enter="saveDuration">
      </div>
      <div v-else @click="enableEditMode">
        {{ props.duration }} hours
      </div>
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
