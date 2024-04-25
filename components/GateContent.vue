<script setup>
  // Henter task storen
  import { useTasksStore } from '@/stores/tasks';

  // Henter de ulike variablene fra gaten
  const props = defineProps({
    gateID: {
      type: String,
      required: true
    }
    // Må legge til flere props etterhvert
  });

  // Initialiserer Tasks listen, 
  const taskStore = useTasksStore();


const tasks = computed(() => taskStore.getGateTasks(props.gateID));

</script>
<template>
    <div class="listGate" v-if="tasks.length > 0" v-for ="task in tasks">
      <GateTask :taskID="task.ID" :step="task.step" :title="task.title" :duration="task.duration" :responsiblePerson="task.responsiblePerson"/>
      <HorizontalLine />
    </div>
    <div v-else>
      No tasks found for this gate
    </div>
</template>
<style scoped>
.listGate {
  display: flex;
  flex-direction: column;
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
