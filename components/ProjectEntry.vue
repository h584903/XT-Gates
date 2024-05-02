<template>
  <!-- Følger prototypen til figma -->
  <div class="list project-card">
    <div class="titleWrapper" @click="enableEditMode" v-if="!editMode">
      <span>{{ entryData.title }}</span>
    </div>
    <div class="titleWrapper" v-else>
      <input type="text" v-model="editedTitle" @keyup.enter="updateTitle" @blur="updateTitle" />
    </div>
    <div class="progressWrapper">
      <ProgressBar :progressNumber="entryData.progress" />
    </div>
    <div class="dateWrapper">
      <DateEntry :dateString = "entryData.SFdate" />
    </div>
    <div class="dateWrapper">
      <DateEntry :dateString = "entryData.POdate" />
    </div>
    <div class="statusWrapper">
      <PlanStatus :onSchedule = "entryData.onTime" />
    </div>
    <div class="personWrapper">
      <PersonInCharge :entryName="entryData.PEM"/>  
    </div>
    <div class="commentWrapper">
      <Modal @close="toggleModal" :modalActive="modalActive"> 
        <div class="modal-content">
          <h1>This is a modal header</h1>
          <p>This is a modal message</p>
          <button @click="toggleModal" class="smallButton">Save comment</button>
          <button @click="toggleModal" class="smallButton">Cancel</button>
        </div>
      </Modal>
      <button @click="toggleModal" class = "bigButton">{{entryData.comment}}</button>
    </div>
  </div>
</template>

<script setup>
// Imports
import {ref} from "vue";
import Modal from "@/components/ReusableModal.vue";
import { useProjectsStore } from "@/stores/projects";

const props = defineProps({
  entryData: {
    type: Object,
    required: true
  }
});

const editedTitle = ref(props.entryData.title);
const editMode = ref(false);
const store = useProjectsStore();


const enableEditMode = () => {
  editMode.value = true;
};

const updateTitle = async () => {
  try {
    await store.updateProjectTitle(props.entryData.id, editedTitle.value);
  } catch (error) {
    console.error("Failed to update the project:", error);
  } finally {
    editMode.value = false;
  }
};

// Må legge til for edit
// const modalEdit

// Metode for toggle modalen - settes til false by default
const modalActive = ref(false);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};

</script>



<style scoped>

.list {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}

.project-card {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 20px;
    margin: 10px;
    background-color: white;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}


.titleWrapper {
  margin: auto;
  text-align: center;
  width: 20%;
}
.titleWrapper input {
  width: 75%;
  text-align: center;
}
.progressWrapper {
  margin: auto;
  text-align: center;
  width: 40%;
}
.dateWrapper {
  margin: auto;
  text-align: center;
  width: 10%;
}
.statusWrapper {
  margin: auto;
  text-align: center;
  width: 5%
}
.personWrapper {
  margin: auto;
  text-align: center;
  width: 15%
}
.commentWrapper {
  display:flex;
  margin: auto;
  text-align: flex;
  width: 10%;
  
  /* Fikse på innholdet */
  .modal-content {
    display: flex;
    flex-direction: column;

    h1, p {
      margin-bottom: 16px;
    }
    h1 {font-size: 24px;}
  }
    p{ 
      font-size: 16px;
    }
}
/* Fikser på header og paragraf */
.modal-content {
  display: flex;
  flex-direction: column;
  h1,p {
    margin-bottom: 16px;
  }

  h1 {
    font-size: 32px;
  }
  p {font-size: 16px;}
/* Knappen som vises i prosjektsiden*/
}

.bigButton {
  padding: 10px 10px;
  border: none;
  font-size: 16px;
  background-color: rgb(255, 255, 255);
  color: rgb(0, 0, 0);
  cursor: pointer;
}

.smallButton {
  margin: 10px;
  width: 100px;
  flex: auto;
}
</style>
