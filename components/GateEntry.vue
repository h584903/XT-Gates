  <template>
    <div class="gate-card">
      <div class="list" @click="isOpen = ! isOpen">
        <div class="gateNR">
          <span>{{ props.gateNR }}</span>
        </div>
        <div class="handle">☰</div>
        <div class="title" @click.stop="enableEditMode()" v-if="!editing">
          <span>{{ props.title }}</span>
        </div>
        <div v-else>
          <input v-model="editedTitle" @keyup.enter="updateTitle" @blur="updateTitle" />
        </div>
        <div class="progress">
          <ProgressBar :progressNumber=gateProgress />
        </div>
        <div class="plannedDate">
          <DateEntry :dateString = plannedDate.value />
        </div>
        <div class="remaining">
          <span>test</span>
        </div>
        <div class="daysToEnd">
          <span>{{daysToEnd}}</span>
        </div>
        <div class="completion">
          <DateEntry :dateString = props.completionDate />
        </div>
        <div class="delete" @click="toggleModal">
          <img src="/assets/x.svg" />
        </div>
      </div>
      <CollapseTransition>
        <div v-show="isOpen">
          <hr class="solid">
          <GateContent :gateID = props.gateID />
        </div>
      </CollapseTransition>
    </div>
    <ReusableModal @close="toggleModal" :modalActive="modalActive">
      <h1>Delete Gate?</h1>
      <p>Deleting a gate is absolute, and cannot be reversed. Make certain this is necessary before doing so.</p>
      <p>Delete gate {{ props.title }}?</p>
      <button @click="deleteGateHandler" deleteGate class="customButton">Yes</button>
      <button @click="toggleModal" class="customButton">No</button>
    </ReusableModal>
  </template>

<script setup>
  // Henter task storen
  import { useTasksStore } from '@/stores/tasks';
  import {useGatesStore} from '@/stores/gates';
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
    }
  });
  const editing = ref(false);
  const editedTitle = ref(props.title);

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


  const gateProgress = gateStore.getGateProgress(props.gateID);
  const isOpen = ref(false);

// Delete modal
  const modalActive = ref(false);
  const toggleModal = () => {
    modalActive.value = !modalActive.value;
  };

  const deleteGateHandler= () => {
    gateStore.deleteGate(props.gateID, props.projectId);
    toggleModal();



  }

</script>
<style scoped>
.mb-8 {
  width: 100;
}

.gateNR {
  margin: auto;
  text-align: center;
}

.handle {
  cursor: move; /* Cursor indicates movement */
  padding: 10px;
  text-align: center;
}

.gate-card {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 20px;
    background-color: white;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
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
  margin-top: 20px;
  width: 100%;
  border-top: 1px solid whitesmoke;
}

.delete {
  margin: auto;
  width: 24px;  /* Increased to a standard clickable size */
  height: 24px; /* Matching height to width for consistency */
  display: flex;  /* Ensures the img element centers inside the div */
  align-items: center;  /* Centers the img vertically */
  justify-content: center;  /* Centers the img horizontally */
  cursor: pointer;
}

.delete img {
  max-width: 60%;  /* Ensures the image does not exceed the div size */
  max-height:60%;  /* Maintains aspect ratio and ensures fitting within the div */
}

</style>
