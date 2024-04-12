<template>
  <div class="list-wrapper">
    <ListDesc/>
    <hr class="solid">
    <!--Oppretter et entry for hvert prosjekt i store.projects-->
    <div v-for="project in projects" :key = project.id>
      <ProjectEntry :entryData="project"/>
      <hr class="solid">
    </div> 
    <Modal @close="toggleModal" :modalActive="modalActive">
      <h1>New Project</h1>
      <form @submit.prevent="submitForm">
        <label>Project title: </label>
        <input type="text" id="title" v-model="formData.title" required><br>
        <label>PO-date: </label>
        <input type="text" id="PO" v-model="formData.PO" required><br>
        <label>Scheduled finish: </label>
        <input type="text" id="SF" v-model="formData.SF" required><br>
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
  import {ref, onMounted} from 'vue'
  import { useProjectsStore } from '@/stores/projects'
  import {useGatesStore} from '@/stores/gates'
  import {  v4 as uuid } from 'uuid'
  
  
  // Initialiserer prosjectStore slik at man kan bruke den ved å kalle på store.
  const store = useProjectsStore();
  const gateStore = useGatesStore();
  const projects = ref([]);
const index = ref(0);


const formData = ref({
  title: '',
  PO: '',
  SF: '',
  PEM: ''
})

const submitForm = () => {
  const projectId = uuid();
  console.log(formData.value.PO.toString())
  store.addProject(projectId,formData.value.title, 0, formData.value.SF.toString().replace(/-/g, ''), formData.value.PO.toString().replace(/-/g, ''), true, formData.value.PEM, "comment");
  index.value++;
  console.log(formData.value);
  toggleModal();
}

// Metode for toggle modalen - settes til false by default
const modalActive = ref(false);
const toggleModal = () => {
  modalActive.value = !modalActive.value;

};
  onMounted(async () => {
  try {
    const response = await $fetch('/projects', {
      method: 'GET'
    });
    // Henter bare ut dataen i responsen, dropper "Hello World..."
    const data = response.data;
    // Transformerer data til en liste av projects
  const projectsArray = Object.values(data).map(project => ({
  id: project.ID,
  title: project.title,
  progress: project.progress,
  onTime: project.onTime,
  PEM: project.PEM,
  comment: project.comment,
  POdate: project.POdate,
  SFdate: project.SFdate,
  archive: project.archive,
  gates: project.gates
}));
    // Oppdaterer projects ref med transformert data
    projects.value = projectsArray;
  } catch (error) {
    console.error('Error fetching projects:', error);
  }
});


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
