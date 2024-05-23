<template>
  <!-- Følger prototypen til figma -->
  <div class="list project-card">
    <div class="titleWrapper" @click="enableEditMode" v-if="!editMode">
      <span>{{ entryData.title }}</span>
    </div>
    <div class="titleWrapper" v-else>
      <input type="text" v-model="editedTitle" @keyup.enter="updateTitle" @blur="updateTitle" />
    </div>
    <div class="progressWrapper" @click="redirect">
      <ProgressBar :progressNumber="entryData.progress" />
    </div>
    <div class="dateWrapper" @click="redirect">
      <DateEntry :dateString = "entryData.SFdate" />
    </div>
    <div class="dateWrapper" >
      <DateEntry :dateString = "entryData.POdate" />
    </div>
    <div class="statusWrapper" @click="redirect">
      <PlanStatus :onSchedule = "calculateStatus" />
    </div>
    <div class="personWrapper" @click="redirect">
      <PersonInCharge :entryName="entryData.PEM"/>  
    </div>
    <div class=".commentWrapper w10" @click="enableCommentEditMode">
      <div v-if="commentEditMode">
        <textarea rows="2" maxlength="30" style="word-wrap: break-word; overflow-wrap: break-word;" v-model="editedComment" @blur="updateComment" @keyup.enter="updateComment"></textarea>
      </div>
      <div v-else>
        <span>{{ props.entryData.comment }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import { useProjectsStore } from "@/stores/projects";
import { useRouter } from 'vue-router';


const props = defineProps({
  entryData: {
    type: Object,
    required: true
  }
});

const router = useRouter();
const editedComment = ref(props.entryData.comment);
const commentEditMode = ref(false); // editMode for comment
const editedTitle = ref(props.entryData.title);
const editMode = ref(false); // editorMode for title
const store = useProjectsStore();

// Håndtering av å editte tittel til prosjekt
const enableEditMode = () => {
  editMode.value = true;
  commentEditMode.value = false;
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

// Håndtering av editte comment på et prosjekt
const enableCommentEditMode = () => {
  commentEditMode.value = true;
  editMode.value = false;
};

const updateComment = async () => {
  try {
    await store.updateProjectComment(props.entryData.id, editedComment.value);
  } catch (error) {
    console.error("Failed to update the project comment:", error);
  } finally {
    commentEditMode.value = false;
  }
};

// computed for status på et prosjekt
const calculateStatus = computed(() => {
  const today = new Date();
  const onTimeDate = new Date(props.entryData.onTimeDate);
  console.log("Comparing " + today)
  console.log("and " + onTimeDate)
  return onTimeDate >= today;
});
// Metode for å redirecte til et prosjekt når man trykker på det
const redirect = (event) => {
    router.push(`/projectList/${props.entryData.id}`);
  };

</script>

<style scoped>

.list {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}

a {
    text-decoration: none;
    color: black;
}
.project-card {

    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 5px;
    
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
  cursor: pointer;
}
.dateWrapper {
  margin: auto;
  text-align: center;
  width: 10%;
  cursor: pointer;
}
.statusWrapper {
  margin: auto;
  text-align: center;
  width: 5%;
  cursor: pointer;
}
.personWrapper {
  margin: auto;
  text-align: center;
  width: 15%;
  cursor: pointer;
}
.commentWrapper {
  display:flex;
  margin: auto;
  text-align: flex;
  width: 10%;  
  /* Fikse på innholdet */
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
.w10 {
  width: 10%;
  cursor: text;
}
textarea {
    width: 100%;
    min-height: 80px;
    resize: vertical;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
</style>
