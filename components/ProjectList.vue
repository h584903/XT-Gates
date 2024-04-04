<template>
  <div class="list-wrapper">
    <ListDesc/>
    <hr class="solid">
    <!--Oppretter et entry for hvert prosjekt i store.projects-->
    <div v-for="entry in store.projects">
      <ProjectEntry :entryData="entry"/>
      <hr class="solid">
    </div> 
    <Modal @close="toggleModal" :modalActive="modalActive">
      <h1>New Project</h1>
      <form @submit.prevent="submitForm">
        <label>Project title: </label>
        <input type="text" id="title" v-model="formData.title" required><br>
        <label>PO-date: </label>
        <input type="date" id="PO" v-model="formData.PO" required><br>
        <label>Scheduled finish: </label>
        <input type="date" id="SF" v-model="formData.SF" required><br>
        <label>PEM: </label>
        <input type="text" id="PEM" v-model="formData.PEM" required><br>
        <button type="submit" class="addButton">Create Project</button>
      </form>
    </Modal>
    <button @click="toggleModal" type = "button">Add Project</button>
  </div>
</template>

<script setup>
  import Modal from "@/components/ReusableModal.vue"
  // importerer prosjekt storen
  import { useProjectsStore } from '@/stores/projects'
  import {useGatesStore} from '@/stores/gates'
  import {  v4 as uuid } from 'uuid'
  
  
  // Initialiserer prosjectStore slik at man kan bruke den ved å kalle på store.
  const store = useProjectsStore();
  const gateStore = useGatesStore();
const index = ref(0);


const formData = ref({
  title: '',
  PO: '',
  SF: '',
  PEM: ''
})

const submitForm = () => {
  const projectId = uuid();
  store.addProject(projectId,formData.value.title, 50, formData.value.SF, formData.value.PO, true, formData.value.PEM, "comment");
  index.value++;
  console.log(formData.value);
  toggleModal();
}

// Metode for toggle modalen - settes til false by default
const modalActive = ref(false);
const toggleModal = () => {
  modalActive.value = !modalActive.value;

};


</script>


<style scoped>
.list-wrapper {
  display: flex;
  flex-direction: column;
  width: 90%
}
.addButton{
  background-color: rgb(77,77,77);
  color: white;
  cursor: pointer;
  border: none;
  padding: 10px 10px;
  font-size: 16px;
  margin: 10px;
}

hr.solid {
  width: 100%;
  border-top: 1px solid grey;
}

</style>
