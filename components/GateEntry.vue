<template>
  <div class="gate-card" @click.capture="openCollapsable">
    <div class="list">
      <div class="handle" @mousedown="startGrab" @mouseup="endGrab" v-if="admin">☰</div>
      <div class="handlereplacement" v-else></div>
      <div class="gateNR">
        <span>{{ gateNR }}</span>
      </div>
      <div class="justTitle" v-if="!admin">
        <span>{{ title }}</span>
      </div>
      <div class="title cursorText" @click.stop="enableEditMode()" v-else-if="!editing&&admin">
        <span>{{ title }}</span>
      </div>
      <div v-else class="title">
        <input v-model="editedTitle" @keyup.enter="updateTitle" @blur="updateTitle" />
      </div>
      <div class="progress">
        <ProgressBar :progressNumber="gateProgress" />
      </div>
      <div class="plannedDate">
        <DateEntry :dateString="plannedDate.value" />
      </div>
      <div class="daysToEnd">
        <span>{{ daysToEnd }}</span>
      </div>
      <div class="completion">
        <DateEntry :dateString="completionDate" />
      </div>
      <div class="delete" @click.stop="toggleModal" v-if="admin">
        <img src="/assets/x.svg" />
      </div>
      <div class="deletereplacement" v-else></div>
    </div>
    <CollapseTransition class="collapsable">
      <div v-show="isOpen">
        <hr class="solid">
        <GateContent :gateID="gateID" />
      </div>
    </CollapseTransition>
    <ReusableModal @close="toggleModal" :modalActive="modalActive">
      <h1>Delete Gate?</h1>
      <p>Deleting a gate is absolute, and cannot be reversed. Make certain this is necessary before doing so.</p>
      <p>Delete gate {{ title }}?</p>
      <button @click="deleteGateHandler" deleteGate class="customButton">Yes</button>
      <button @click="toggleModal" class="customButton">No</button>
    </ReusableModal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useTasksStore } from '@/stores/tasks';
import { useGatesStore } from '@/stores/gates';
import ProgressBar from '@/components/ProgressBar.vue';
import DateEntry from '@/components/DateEntry.vue';
import CollapseTransition from '@/components/CollapseTransition.vue';
import GateContent from '@/components/GateContent.vue';
import ReusableModal from '@/components/ReusableModal.vue';

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
    type: String,
    required: true
  },
  completionDate: {
    type: String,
    required: true
  },
  daysToEnd: {
    type: Number,
    required: false
  },
  responsiblePerson: {
    type: String,
    required: true
  }
});

const taskStore = useTasksStore();
const gateStore = useGatesStore();
const authStore = useAuthStore();

const editing = ref(false);
const editedTitle = ref(props.title);
const isGrabbing = ref(false);

const admin = computed(() => authStore.isAdmin());

const enableEditMode = () => {
  editing.value = true;
};

const updateTitle = async () => {
  try {
    await gateStore.updateGateTitle(props.gateID, editedTitle.value);
  } catch (error) {
    console.error("Failed to update the gate:", error);
  } finally {
    editing.value = false;
  }
};

const plannedDate = computed(() => gateStore.calculateDate(props.projectId, props.gateNR));
const daysToEnd = computed(() => gateStore.calculateDaysToEnd(plannedDate.value));
const completionDate = computed(() => gateStore.calculateCompletionDate(props.gateID));
const gateProgress = gateStore.getGateProgress(props.gateID);
const isOpen = ref(false);

const modalActive = ref(false);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};

const deleteGateHandler = () => {
  gateStore.deleteGate(props.gateID, props.projectId);
  toggleModal();
};

const openCollapsable = (event) => {
  if (!event.target.closest('.collapsable') && !event.target.closest('.title') && !event.target.closest('.delete')) {
    isOpen.value = !isOpen.value;
  }
};

const startGrab = () => {
  isGrabbing.value = true;
  document.addEventListener('mouseup', endGrab);
};

const endGrab = () => {
  isGrabbing.value = false;
  document.removeEventListener('mouseup', endGrab);
};
</script>

<!-- CSS -->
<style scoped>
.mb-8 {
  width: 100;
}

.gateNR {
  margin: auto;
  text-align: center;
  width: 5%;
}

.handle {
  cursor: grab;
  padding: 10px;
  text-align: center;
}

.handlereplacement {
  color: white;
  padding: 20px;
}

.handle.grabbing {
  cursor: grabbing;
}

.gate-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 3px;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  cursor: pointer;
}

.list {
  display: flex;
  flex-direction: row;
}

.title {
  margin: auto;
  text-align: center;
  width: 20%;
}

.justTitle {
  margin: auto;
  text-align: center;
  width: 20%;
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

.hr.solid {
  margin-top: 20px;
  width: 100%;
  border-top: 1px solid whitesmoke;
  cursor: default;
}

.delete {
  margin: auto;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
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

.delete img {
  max-width: 60%;
  max-height: 60%;
}

.collapsable {
  cursor: default;
}
</style>
