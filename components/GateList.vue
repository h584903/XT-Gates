<template>
  <div class="descWrapper">
    <GateDesc/>
  </div>
  <hr class="solid"/>
  <draggable class="gatelist" v-model="gates" @end="onEndDrag" group="gates" item-key="ID" handle=".handle" animation="300"> 
  <template #item="{ element, index }">
    <div :key="element.ID">
      <div v-if="dividers.includes(element.gateNR)" class="divider gate-divider"></div>
      <GateEntry :gateID="element.ID" :gateNR="element.gateNR" :title="element.title" :projectId="props.projectId" :completionDate="element.completionDate" :responsiblePerson="element.responsiblePerson || ''" :plannedDate="element.plannedDate" :daysToEnd="element.daysToEnd"/>
      <div v-if="!admin" class="gate-divider cursorDefault"></div>
      <div
        v-else-if="index < gates.length - 1"
        @click="addGateBetween(element.gateNR)"
        class="gate-divider cursorCopy"
      </div>
    </div>
  </template>
</draggable>
  <div class="emptylist"v-if="gates.length === 0">
    No gates found for this project
      <div v-if="admin" class="gate-empty" @click="addGateBetween(1)">
      </div>
  </div>
  <div class="gatedivider"v-if="gates.length === 1&&admin">
      <div class="gate-empty" @click="addGateBetween(2)">
      </div>
  </div>
  <!-- Modal for å opprette Gate -->
  <Modal @close="toggleModal" :modalActive="modalActive">
    <h1>New Gate</h1>
    <form @submit.prevent="submitForm">
      <label>Gate title: </label>
      <input type="text" id="title" v-model="formData.title" required><br>
      <button type="submit" class="addButton">Create Gate</button>
    </form>
    <button class="closeButton" @click="toggleModal">Cancel</button>
  </Modal>

</template>

<script setup>
  import { useGatesStore } from '@/stores/gates';
  import Modal from "@/components/ReusableModal.vue" // Ikke slett, henter modal
  import draggable from 'vuedraggable'; //Henter vue sin draggable

  const props = defineProps({
    projectId: {
      type: String,
      required: true
    }
  });

  const gateStore = useGatesStore();
  const authStore = useAuthStore();
  const projectStore = useProjectsStore();

  let dividers = projectStore.getDividers(props.projectId);
  const computedGates = computed(() => gateStore.getProjectGates(props.projectId));
  const gates = ref([]); // lager en non-reactive copy
  const admin = computed(() => authStore.isAdmin());

// ser etter forandringer
  watch(computedGates, (newGates) => {
    gates.value = [...newGates];
  });

  const hoverIndex = ref(-1); // Index of the gate being hovered over
    
  const setHoverIndex = (index) => {
    hoverIndex.value = index;
  };

  const resetMouseState = () => {
    hoverIndex.value = -1; // Reset hoverIndex when mouse leaves gate list
  };

  // Logic to add a gate between gates
  const formData = ref({
    NR: '',
    title: ''
  })

  const modalActive = ref(false);
  const toggleModal = () => {
    modalActive.value = !modalActive.value;
  };

  function addGateBetween(gateNR) {
    toggleModal();
    formData.value.NR= gateNR;
  };


  const submitForm = () => {
    gateStore.addGate(formData.value.NR, props.projectId,  formData.value.title);
    toggleModal();
  }

  function onEndDrag(event) {
    let updatedGates = [...gates.value];
    updatedGates.forEach((gate, index) => {
        gate.gateNR = index + 1;
    });
    console.log("Updated the dates")
    gateStore.updateGateOrder(updatedGates);
    gateStore.calculateDate();
}
</script>


<style scoped>

.gatelist {
  display: flex;
  flex-direction: column;
    position: relative; /* Required for positioning the gate dividers */
}

.gate-divider {
  left: 0;
  right: 0;
  height: 8px;
  background-color: transparent;
  position: relative;
}

.divider {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  height: 8px;
  background-color: red;
}
.gate-empty {
  left: 0;
  right: 0;
  height: 50px;
  cursor: copy;
  background-color: transparent;
}

.emptylist {
  flex-direction: column;
  margin: auto;
}

.cursorDefault {
  cursor: default;
}

.cursorCopy {
  cursor: copy;
}

.add-task-button {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
}

hr.solid {
  width: 100%;
  border-top: 1px solid grey;
}
.descWrapper {
  width: 92%;
  margin: auto;
}

</style>
