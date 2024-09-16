  <template>
    <div class="list task-card">
      <div class="handle" @mousedown="startGrab" @mouseup="endGrab" v-if="admin">☰</div>
      <div class="handlereplacement" v-else></div>
      <div class="w5">
        <span>{{ props.step }}</span>
      </div>
      <div class="w15 edit">
        <div class="cursorDefault" v-if="!admin">
          {{ titleDisplay }}
        </div>
        <div v-else-if="editTitleMode">
          <input type="text" v-model="editedTitle" @blur="updateTitle" @keyup.enter="updateTitle" class="cursorText"/>
        </div>
        <div v-else @click="enableTitleEditMode" class="cursorText">
          {{ titleDisplay }}
        </div>
      </div>
      <div class="w10 edit">
        <div class="cursorDefault" v-if="!admin">
          {{ responsiblePersonDisplay }}
        </div>
        <div v-else-if="editResponsiblePersonMode">
          <input type="text" v-model="editedResponsiblePerson" @blur="updateResponsiblePerson" @keyup.enter="updateResponsiblePerson" class="cursorText"/>
        </div>
        <div v-else @click="enableResponsiblePersonEditMode" class="cursorText">
          {{ responsiblePersonDisplay }}
        </div>
      </div>
      <div class="w10">
        <div v-if="updateMode">Update completion date?</div>
        <div v-else>
          <div v-if="!admin">
            <DateEntry :dateString = props.completeDate />
          </div>
          <div v-else-if="editCompletionDateMode">
            <input type="date" v-model="editedCompletionDate" @blur="updateCompletionDate" @keyup.enter="updateCompletionDate" @keyup.esc="cancelEditCompletionDate" />
            <button @click="cancelEditCompletionDate">Cancel</button>
          </div>
          <div v-else @click="enableCompletionDateMode" class="cursorText">
            <DateEntry :dateString = props.completeDate />
          </div>
        </div>
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
        <div class="cursorDefault" v-if="!admin">
          {{ taskDuration }}
        </div>
        <div v-else-if="editMode">
          <input type="number" v-model.number="taskDuration" @blur="updateDuration" @keyup.enter="updateDuration">
        </div>
        <div v-else @click="enableEditMode" class="cursorText">
          {{ taskDuration }} days
        </div>
      </div>
      <div class="commentWrapper w10" @click="enableCommentEditMode">
      <div v-if="editCommentMode">
        <textarea rows="2" maxlength="30" v-model="editedComment" @blur="updateComment" @keyup.enter="updateComment"></textarea>
      </div>
      <div v-else>
        <span>{{ editedComment }}</span>
      </div>
    </div>
      <div class="delete" @click.stop="toggleModal" v-if="admin">
        <img src="/assets/x.svg" />
      </div>
      <div class="deletereplacement" v-else></div>
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
  type: [String, null],
  required: true
}
}) 

const tasksStore = useTasksStore();
const authStore = useAuthStore();

// Ulike editors for ulike verdier
const editMode = ref(false);
const editedComment = ref(props.comment);
const editCommentMode = ref(false);
const editedTitle = ref(props.title);
const editTitleMode = ref(false);
const editedResponsiblePerson = ref(props.responsiblePerson);
const editResponsiblePersonMode = ref(false);
const editCompletionDateMode = ref(false);
const editedCompletionDate = ref("");


const admin = computed(() => authStore.isAdmin());

  // Henter ut tasken som dette er
  const currentTask = tasksStore.tasks.find(t => t.ID === props.taskID);
  const selectedProgress = ref(currentTask ? currentTask.progress : 0);

  // Oppdatere progress for en task
  function updateProgress() {
  if (currentTask && currentTask.duration !== undefined && currentTask.progress !== undefined) {
    // Check if duration or progress has changed from their initial values
    if (currentTask.duration !== props.duration || currentTask.progress !== props.step) {
      if (parseInt(selectedProgress.value) == 100) {
        updateMode.value = true;
      }
        tasksStore.updateTaskProgress(props.taskID, parseInt(selectedProgress.value));
      }
    }
  }

  const planStatus = computed(() => {
    if(!tasksStore.completedInTime(props.completeDate, props.taskID)) {
      return false
    } else if(selectedProgress.value == 100) {
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

  function updateCompletionDate() {
    try {
      tasksStore.updateCompletionDate(editedCompletionDate.value, props.taskID);
    } catch (error) {
      console.error("Failed to update the project:", error);
    } finally {

      editCompletionDateMode.value = false;
    }
  }

  function cancelEditCompletionDate() {
    closeAllEditModes();
    editCompletionDateMode.value = false;
  }

  function enableCompletionDateMode() {
    closeAllEditModes();
    editCompletionDateMode.value = true;
  }

  // Håndtering av å editte task comment, hvis de deler editMode går begge inn i redigeringsmodus når du trykker på en av de
    function enableCommentEditMode() {
      closeAllEditModes();
      editCommentMode.value = true;
  }

  function updateComment() {
    tasksStore.updateTaskComment(props.taskID, editedComment.value);
    editCommentMode.value = false;
  }

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

  function closeAllEditModes() {
  editMode.value = false;
  editCommentMode.value = false;
  editTitleMode.value = false;
  editResponsiblePersonMode.value = false;
  editCompletionDateMode.value = false;
}

  const debouncedUpdateProgress = debounce(updateProgress, 0);

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
.deletereplacement {
  margin: auto;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.edit {
  cursor: pointer;
}
.commentWrapper {
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
  min-height: 40px;
  cursor: text;
}

textarea {
    width: 100%;
    min-height: 80px;
    resize: vertical;
    padding: 8px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

.handle {
  cursor: grab; /* Cursor indicates movement */
  padding: 10px;
  text-align: center;
}

.handlereplacement {
  color: white;
  padding: 20px;
}

.cursorDefault {
  cursor: default;
}

.cursorPointer {
  cursor: pointer;
}

.cursorText {
  cursor: text;
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
}
</style>
