    <template>
      <TaskDesc class="descWrapper"/>
      <draggable class="listGate" v-model="tasks" @end="onEndDrag" group="tasks" item-key="ID" handle=".handle" animation="300"> 
      <template #item="{element, index}">
        <div :key="element.ID">
          <GateTask :taskID="element.ID" :step="element.step" :title="element.title" :duration="element.duration" :responsiblePerson="element.responsiblePerson" :complete-date="element.completeDate" :updateUser="element.updateUser" :comment="element.comment || ''" />
          <div v-if="admin"
            @click="addTaskBetween(element.step)"
            class="task-divider cursorCopy">
          </div>
          <div v-else
            class="task-divider">
          </div>
        </div>
      </template>
      </draggable>
      <div v-if="tasks.length === 0">
          <div v-if="admin"
            @click="addTaskBetween(1)"
            class="task-divider cursorCopy" style="padding: 30px">
            No tasks found for this gate
          </div>
          <div v-else
            class="task-divider" style="padding: 30px">
            No tasks found for this gate
          </div>
      </div>
      <Modal @close="toggleModal" :modalActive="modalActive">
        <h1>New Task</h1>
        <form @submit.prevent="submitForm">
          <label>Task title: </label>
          <input type="text" id="title" v-model="formData.title" required><br>
          <label>Responsible role: </label>
          <input type="text" id="responsiblePerson" v-model="formData.responsiblePerson" required><br>
          <label>Duration: </label>
          <input type="number" id="duration" v-model="formData.duration" required><br>
          <button type="submit" class="addButton">Create Task</button>
        </form>
        <button class="closeButton" @click="toggleModal">Cancel</button>
      </Modal>
    </template>

<script setup>
  // Henter task storen, vue sin draggable og modal
  import { useTasksStore } from '@/stores/tasks';
  import draggable from 'vuedraggable'; 
  import Modal from "@/components/ReusableModal.vue"

  // Henter de ulike variablene fra gaten
  const props = defineProps({
    gateID: {
      type: String,
      required: true
    }
    // Må muligens til flere props etterhvert
  });

  // Initialiserer Tasks listen, 
  const taskStore = useTasksStore();
  const authStore = useAuthStore();

  const computedTasks = computed(() => taskStore.getGateTasks(props.gateID));  //Setter computedTasks
  const tasks = ref(computedTasks.value);  // for å ikke manipulere computed tasks direkte
  
  const admin = computed(() => authStore.isAdmin());

  // Oppdaterer som vanlig hvis de blir forandret
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
  })

  // Åpning og lukking av modalen
  const modalActive = ref(false);
  const toggleModal = () => {
    modalActive.value = !modalActive.value;
  };
  // Funksjon brukt for å kunne sette inn et nytt step mellom to steps
  function addTaskBetween(step) {
    toggleModal();
    formData.value.step = step;
  };
  // Kaller addTask fra stores/tasks.js for å legge til en ny task
  const submitForm = () => {
    toggleModal();
    taskStore.addTask(props.gateID, formData.value.step,  formData.value.title, formData.value.responsiblePerson, formData.value.duration);
  }
</script>

<!-- CSS -->
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
  background-color: transparent;
  margin: auto;
  text-align: center;
}

.cursorCopy {
  cursor: copy;
}

.cursorDefault {
  cursor: default;
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
.descWrapper{
  width: 100%;
  margin: auto;
}
hr.solid {
  width: 100%;
  border-top: 1px solid whitesmoke;
}
</style>
