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
  },
  comment: {
      type: String,
      required: true
    }
  }) 
  const editedComment = ref(props.comment);

  // Henter ut tasken som dette er
  const currentTask = tasksStore.tasks.find(t => t.ID === props.taskID);
  const selectedProgress = ref(currentTask ? currentTask.progress : 0);

  function updateProgress() {
    tasksStore.updateTaskProgress(props.taskID, parseInt(selectedProgress.value));
    tasksStore.update
  }
  // For å editte taskDuration
  const editMode = ref(false);
  function enableEditMode() {
    editMode.value = true;
    editCommentMode.value = false;
  }
  
  const taskDuration = ref(currentTask ? currentTask.duration : 0);
  function updateDuration() {
    tasksStore.updateTaskDuration(props.taskID, parseInt(taskDuration.value))
    editMode.value = false;
  }

  // For å editte comment, hvis de deler editMode går begge inn i redigeringsmodus når du trykker på en av de
   const editCommentMode = ref(false);
    function enableCommentEditMode() {
    editMode.value = false;
    editCommentMode.value = true;
  }

  function updateComment() {
    tasksStore.updateTaskComment(props.taskID, editedComment.value);
    editCommentMode.value = false;
  }

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
</script>
<template>
  <div class="list task-card">
    <div class="handle">☰</div>
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
        <input type="range" min="0" max="100" step="25" v-model="selectedProgress" @change="debouncedUpdateProgress" />
    </div>
    <div class="w5">
      <PlanStatus :onSchedule="true" />
    </div>
    <div class="w5">
      <div v-if="editMode">
        <input type="number" v-model.number="taskDuration" @blur="updateDuration" @keyup.enter="updateDuration">
      </div>
      <div v-else @click="enableEditMode">
        {{ taskDuration }} days
      </div>
    </div>
    <div class="w10">
  <div v-if="editCommentMode">
    <textarea rows="2" maxlength="30" style="word-wrap: break-word; overflow-wrap: break-word;" :value="editedComment" @input="editedComment = $event.target.value" @blur="updateComment" @keyup.enter="updateComment"></textarea>
  </div>
  <div v-else @click="enableCommentEditMode">
    <span>{{ props.comment || 'No comment' }}</span>
  </div>
</div>
   </div>
</template>
<style scoped>

textarea {
    width: 100%; /* Set to 100% to fill the container */
    min-height: 80px; /* Adjust the height as needed */
    resize: vertical; /* Allow vertical resizing */
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
    padding: 20px;
    margin: 10px;
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
</style>
