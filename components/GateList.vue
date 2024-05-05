<script setup>

  import { ref, onMounted } from 'vue';
  import { useGatesStore } from '@/stores/gates';
  import Modal from "@/components/ReusableModal.vue"

  

  const props = defineProps({
    projectId: {
      type: String,
      required: true
    }
  });

  const gateStore = useGatesStore();

  const gates = computed(() => {
    return gateStore.getProjectGates(props.projectId).value;
  });
  console.log("Dette er gatene: " + gates.value)

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
    console.log("Adding a gate between gates with ID:" + gateNR);
    toggleModal();
    formData.value.NR= gateNR;
  };


  const submitForm = () => {
    gateStore.addGate(formData.value.NR, props.projectId,  formData.value.title);
    toggleModal();
  }


</script>

<template>
  <div class="gatelist" @mousemove="handleMouseMove" @mouseleave="resetMouseState">
    <div v-if="gates.length > 0" v-for="gate, index in gates" :key="gate.ID">
      <GateEntry :gateID="gate.ID" :gateNR="gate.gateNR" :title="gate.title" :projectId="props.projectId" :completionDate="gate.completionDate" />
      <!-- Legger til slik at hvis man muser over vil index skifte til den gaten -->
      <div
        v-if="index < gates.length - 1"
        @mouseover="setHoverIndex(index)"
        @click="addGateBetween(gate.gateNR)"
        class="gate-divider">
      </div>
    </div>
    <div v-else>
      No gates found for this project
    </div>
  </div>
  <Modal @close="toggleModal" :modalActive="modalActive">
    <h1>New Gate</h1>
    <form @submit.prevent="submitForm">
      <label>Project title: </label>
      <input type="text" id="title" v-model="formData.title" required><br>
      <button type="submit" class="addButton">Create Project</button>
    </form>
    <button class="closeButton" @click="toggleModal">Cancel</button>
  </Modal>

</template>

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
  cursor: copy;
  background-color: transparent;
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

</style>
