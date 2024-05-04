<script setup>
  // Henter task storen
  import { useTasksStore } from '@/stores/tasks';
  import draggable from 'vuedraggable'; //Henter vue sin draggable

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


  const computedTasks = computed(() => taskStore.getGateTasks(props.gateID));
  const tasks = ref(computedTasks.value);  // for å ikke manipulere computed tasks direkte

  // Oppdaterer som vanlig hvis de blir forandret (mulig det ikke trengs tbh)
  watch(computedTasks, (newTasks) => {
    tasks.value = newTasks;
  });

  function onEndDrag(event) {
    let updatedTasks = [...tasks.value];

    // (Etter endret liste finner den ut av hvordan de nye stepsene skal se ut)
    updatedTasks.forEach((task, index) => {
      task.step = index + 1;
    });
    // Oppdaterer tasks i databasen
    taskStore.updateTasksOrder(updatedTasks);
  }

</script>

<template>
  <draggable class="listGate" v-model="tasks" @end="onEndDrag" group="tasks" item-key="ID" handle=".handle" animation="300"> 
  <template #item="{element, index}">
    <div :key="element.ID">
      <GateTask :task="element" :taskID="element.ID" :step="element.step" :title="element.title" :duration="element.duration" :responsiblePerson="element.responsiblePerson" :complete-date="element.completeDate" :comment="element.comment || ''" />
    </div>
  </template>
  <div v-if="tasks.length === 0">
    No tasks found for this gate
  </div>
  </draggable>
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
