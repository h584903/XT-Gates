
<script setup>
// Imports
import {ref} from "vue";
import Modal from "@/components/ReusableModal.vue"

const props = defineProps({
  entryData: {
    type: Object,
    required: true
  }
});

// Må legge til for edit
// const modalEdit

// Metode for toggle modalen - settes til false by default
const modalActive = ref(false);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};

const sortDates = () => {
  // Assuming you have dates defined somewhere
  dates.value.sort((a, b) => new Date(a) - new Date(b));
};
</script>



<template>
  <!-- Følger prototypen til figma -->
  <div class="list">
    <div class="titleWrapper">
      <span>{{ entryData.title }}</span>
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
        </div>
      </Modal>
      <button @click="toggleModal" type = "button">Open Modal</button>
    </div>
  </div>
</template>


<style scoped>

.list {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}
.titleWrapper {
  margin: auto;
  text-align: center;
  width: 20%;
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
button {
  padding: 10px 10px;
  border: none;
  font-size: 16px;
  background-color: rgb(91, 102, 184);
  color: white;
  cursor: pointer;
}

</style>
