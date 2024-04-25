<script setup>
  // Henter task storen
  import { useTasksStore } from '@/stores/tasks';
  const taskStore = useTasksStore();
  
  // Henter de ulike variablene fra gaten
  const gateStore = useGatesStore();
  const props = defineProps({
    gateID: {
      type: String,
      required: true
    },
    gateNR: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    projectId: {
      type: Number,
      required: true
    },
    completionDate: {
      type: String,
      required: true
    }
  });

  const plannedDate = gateStore.calculateDate(props.projectId, props.gateNR)

  const gateProgress = gateStore.getGateProgress(props.gateID);
  const isOpen = ref(false);
</script>
<template>
  <div class="list" @click="isOpen = ! isOpen">
    <div class="title">
      <span>{{ props.title }}</span>
    </div>
    <div class="progress">
      <ProgressBar :progressNumber=gateProgress />
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
      <DateEntry :dateString = props.completionDate />
    </div>
  </div>
  <CollapseTransition>
    <div v-show="isOpen">
      <hr class="solid">
      <GateContent :gateID = props.gateID />
    </div>
  </CollapseTransition>
</template>
<style scoped>
.mb-8 {
  width: 100;
}

.list {
  display: flex;
  flex-direction: row;
  height:40px;
}

.title {
  margin: auto;
  text-align: center;
  width: 20%;
}
.progress {
  margin: auto;
  text-align: center;
  width: 50%;
}

.plannedDate {
  margin: auto;
  text-align: center;
  width: 10%;
}
.remaining {
  margin: auto;
  text-align: center;
  width: 5%;
}
.daysToEnd {
  margin: auto;
  text-align: center;
  width: 5%;
}
.completion {
  margin: auto;
  text-align: center;
  width: 10%;
}

hr.solid {
  width: 100%;
  border-top: 1px solid grey;
}

</style>
