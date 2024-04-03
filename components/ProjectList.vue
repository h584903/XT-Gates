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
      <form>
        <label>Project title: </label>
        <input type="text"><br>
        <label>PO-date: </label>
        <input type="date"><br>
        <label>Scheduled finish: </label>
        <input type="date"><br>
        <label>PEM: </label>
        <input type="text"><br>
      </form>
      <button @click="addItemToList" class="addButton">Create Project</button>
    </Modal>
    <button @click="toggleModal" type = "button">Add Project</button>
  </div>
</template>

<script setup>
  import Modal from "@/components/ReusableModal.vue"

  // importerer prosjekt storeen
  import { useProjectsStore } from '@/stores/projects'
  
  // Initialiserer prosjectStore slik at man kan bruke den ved å kalle på store.
  const store = useProjectsStore();

const index = ref(0);

// Metode for toggle modalen - settes til false by default
const modalActive = ref(false);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};

// Function to add a new item to the list
const addItemToList = () => {
// Legger til et static object
const project = 
  store.addProject("Project Name", 50, "2024-09-14", "2024-09-15", true, "Kristoffer Madsen", "comment"); // Generate item to be added to list
  index.value++;
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
}

hr.solid {
  width: 100%;
  border-top: 1px solid grey;
}

</style>
