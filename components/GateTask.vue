  <template>
    <div class="list task-card">
      <div class="handle">☰</div>
      <div class="w5">
        <span>{{ props.step }}</span>
      </div>
      <div class="w15 edit">
        <div v-if="editTitleMode">
          <input type="text" v-model="editedTitle" @blur="updateTitle" @keyup.enter="updateTitle" />
        </div>
        <div v-else @click="enableTitleEditMode">
          {{ titleDisplay }}
        </div>
      </div>
      <div class="w10 edit">
              <div v-if="editResponsiblePersonMode">
          <input type="text" v-model="editedResponsiblePerson" @blur="updateResponsiblePerson" @keyup.enter="updateResponsiblePerson" />
        </div>
        <div v-else @click="enableResponsiblePersonEditMode">
          {{ responsiblePersonDisplay }}
        </div>
      </div>
      <div class="w10">
        <div v-if="updateMode">Update completion date?</div>
        <div v-else><DateEntry :dateString = props.completeDate /></div>
      </div>
      <div class="w10">
        <div v-if="updateMode">
          <button @click="updateYes">Yes</button>
          <button @click="enterUpdate">No</button>
        </div>
        <div v-else>{{ props.updateUser }}</div>
      </div>
      <div class="w10">
          <input type="range" min="0" max="100" step="25" v-model="selectedProgress" @change="debouncedUpdateProgress" />
      </div>
      <div class="w5">
        <PlanStatus :onSchedule=planStatus />
      </div>
      <div class="w5 edit">
        <div v-if="editMode">
          <input type="number" v-model.number="taskDuration" @blur="updateDuration" @keyup.enter="updateDuration">
        </div>
        <div v-else @click="enableEditMode">
          {{ taskDuration }} days
        </div>
      </div>
      <div class="w10 edit">
        <div v-if="editCommentMode">
          <textarea rows="2" maxlength="30" style="word-wrap: break-word; overflow-wrap: break-word;" :value="editedComment" @input="editedComment = $event.target.value" @blur="updateComment" @keyup.enter="updateComment"></textarea>
        </div>
        <div v-else @click="enableCommentEditMode">
          <span>{{ commentDisplay }}</span>
        </div>
      </div>
      <div class="delete" @click="toggleModal">
        <img src="assets/x.svg" />
      </div>
    </div>
      <ReusableModal @close="toggleModal" :modalActive="modalActive">
        <h1>Delete Task?</h1>
        <p>Deleting a task is absolute, and cannot be reversed. Make certain this is necessary before doing so.</p>
        <p>Delete task {{ props.title }}?</p>
        <button @click="deleteTaskHandler" deleteTask class="customButton">Yes</button>
        <button @click="toggleModal" class="customButton">No</button>
      </ReusableModal>
  </template>

<script setup>
  import { useTasksStore } from '@/stores/tasks';
  import PlanStatus from './PlanStatus.vue';

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
  },
  comment: {
      type: String,
      required: true
  },
  completeDate: {
    type: [String, null],
    required: true
},


updateUser: {
  type: String,
  required: true
}
}) 
// Ulike editors for ulike verdier
const editMode = ref(false);
const editedComment = ref(props.comment);
const editCommentMode = ref(false);
const editedTitle = ref(props.title);
const editTitleMode = ref(false);
const editedResponsiblePerson = ref(props.responsiblePerson);
const editResponsiblePersonMode = ref(false);

  // Henter ut tasken som dette er
  const currentTask = tasksStore.tasks.find(t => t.ID === props.taskID);
  const selectedProgress = ref(currentTask ? currentTask.progress : 0);

  // Oppdatere progress for en task
  function updateProgress() {
  console.log("Updateprogress run")
  if (currentTask && currentTask.duration !== undefined && currentTask.progress !== undefined) {
    // Check if duration or progress has changed from their initial values
    if (currentTask.duration !== props.duration || currentTask.progress !== props.step) {
      if (parseInt(selectedProgress.value) === 100) {
        updateMode.value = true;
      }
        tasksStore.updateTaskProgress(props.taskID, parseInt(selectedProgress.value));
      }
    }
  }

  const planStatus = computed(() => {
    if(tasksStore.completedInTime(props.completeDate, props.taskID)) {
      return false
    } else if(selectedProgress.value === 100) {
      return true
    } else {
      return tasksStore.inTime(props.taskID);
    }
  })

  // For å editte taskDuration
  function enableEditMode() {
    editMode.value = true;
    editCommentMode.value = false;
    editTitleMode.value = false;
    editResponsiblePersonMode.value = false;
  }
  
  const taskDuration = ref(currentTask ? currentTask.duration : 0);
  function updateDuration() {
    tasksStore.updateTaskDuration(props.taskID, parseInt(taskDuration.value))
    editMode.value = false;
  }

  // Håndtering av å editte task comment, hvis de deler editMode går begge inn i redigeringsmodus når du trykker på en av de
    function enableCommentEditMode() {
      editCommentMode.value = true;
      editMode.value = false;
      editTitleMode.value = false;
      editResponsiblePersonMode.value = false;
  }

  function updateComment() {
    tasksStore.updateTaskComment(props.taskID, editedComment.value);
    editCommentMode.value = false;
  }

  const commentDisplay = computed(() => {
  const trimmedComment = editedComment.value.trim();
  return trimmedComment === "" ? "No comment" : trimmedComment;
});

  // Håndtering av editte task title
  function enableTitleEditMode() {
    editTitleMode.value = true;
    editMode.value = false;
    editResponsiblePersonMode.value = false;
    editCommentMode.value = false;
  }
  function updateTitle() {
    tasksStore.updateTaskTitle(props.taskID, editedTitle.value);
    editTitleMode.value = false;
  }

  const titleDisplay = computed(() => {
    const trimmedTitle = editedTitle.value.trim();
    return trimmedTitle === "" ? "No title" : trimmedTitle;
  });

  // Håndtering av å editte task responsible person
  function enableResponsiblePersonEditMode() {
  editResponsiblePersonMode.value = true;
  editMode.value = false;
  editCommentMode.value = false;
  
}
function updateResponsiblePerson() {
  tasksStore.updateTaskResponsiblePerson(props.taskID, editedResponsiblePerson.value);
  editResponsiblePersonMode.value = false;
}
const responsiblePersonDisplay = computed(() => {
  const trimmedResponsiblePerson = editedResponsiblePerson.value.trim();
  return trimmedResponsiblePerson === "" ? "No responsible person" : trimmedResponsiblePerson;
});

  // Funksjon for å sette en delay på en funksjon
  function debounce(fn, delay) {
    let timeoutId = null;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  }

  const debouncedUpdateProgress = debounce(updateProgress, 1500);

  // Delete modal
  const modalActive = ref(false);
  const toggleModal = () => {
    modalActive.value = !modalActive.value;
  };

  const updateMode = ref(false);
  const enterUpdate = () => {
    updateMode.value = !updateMode.value;
  }

  function updateYes() {
    tasksStore.updateDate(props.taskID)
    enterUpdate();
  }

  const deleteTaskHandler= () => {
    tasksStore.deleteTask(props.taskID, props.step);
    toggleModal();

  }
</script>

<style scoped>
.delete {
  margin: auto;
  width: 24px;  
  height: 24px; 
  display: flex; 
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.delete img {
  max-width: 50%; 
  max-height: 50%;
}

.edit {
  cursor: pointer;
}

textarea {
    width: 100%;
    min-height: 80px;
    resize: vertical;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

.handle {
  cursor: move; /* Cursor indicates movement */
  padding: 10px;
  text-align: center;
}

.task-card {
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: white;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

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
.w5 input {
  width: 100%;
}
.w10 input {
  width: 100%;
  cursor: pointer;
}
</style>
