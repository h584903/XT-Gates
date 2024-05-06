<script setup>
  // Henter task storen
  import { useTasksStore } from '@/stores/tasks';
  import draggable from 'vuedraggable'; //Henter vue sin draggable
  import Modal from "@/components/ReusableModal.vue"

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

  const formData = ref({
    title: '',
    duration: '',
    step: '',
    responsiblePerson: '',
    ID: ''
  })

  const modalActive = ref(false);
  const toggleModal = () => {
    modalActive.value = !modalActive.value;
  };

  function addTaskBetween(step, ID) {
    console.log("Adding a task between tasks with NR:" + step);
    toggleModal();
    formData.value.step = step;
    formData.value.ID = ID;
  };

  const submitForm = () => {
    toggleModal();
    taskStore.addTask(formData.value.ID, props.gateID, formData.value.step,  formData.value.title, formData.value.responsiblePerson, formData.value.duration);

  }
</script>

<template>
  <draggable class="listGate" v-model="tasks" @end="onEndDrag" group="tasks" item-key="ID" handle=".handle" animation="300"> 
  <template #item="{element, index}">
    <div :key="element.ID">
      <GateTask :taskID="element.ID" :step="element.step" :title="element.title" :duration="element.duration" :responsiblePerson="element.responsiblePerson" :complete-date="element.completeDate" :updateUser="element.updateUser" :comment="element.comment || ''" />
      <div
        @click="addTaskBetween(element.step, element.ID)"
        class="task-divider">
      </div>
    </div>
  </template>
  <div v-if="tasks.length === 0">
    No tasks found for this gate
  </div>
  </draggable>
  <Modal @close="toggleModal" :modalActive="modalActive">
    <h1>New Task</h1>
    <form @submit.prevent="submitForm">
      <label>Task title: </label>
      <input type="text" id="title" v-model="formData.title" required><br>
      <input type="text" id="responsiblePerson" v-model="formData.responsiblePerson" required><br>
      <input type="number" id="duration" v-model="formData.duration" required><br>
      <button type="submit" class="addButton">Create Task</button>
    </form>
    <button class="closeButton" @click="toggleModal">Cancel</button>
  </Modal>
</template>

<style scoped>
.listGate {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.task-divider{
  left: 0;
  right: 0;
  height: 8px;
  cursor: copy;
  background-color: transparent;
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
