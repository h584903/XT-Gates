<template>
  <div class="list project-card" @click="redirect">
    <div class="titleWrapper" @click.stop="enableEditMode" v-if="!editMode && admin">
      <span>{{ editedTitle }}</span>
    </div>
    <div class="titleWrapper" v-else-if="admin">
      <input type="text" v-model="editedTitle" @keyup.enter="updateTitle" @click.stop @blur="updateTitle" />
    </div>
    <div class="titleWrapper cursorPointer" v-else>
      <span>{{ editedTitle }}</span>
    </div>
    <div class="progressWrapper">
      <ProgressBar :progressNumber="entryData.progress" />
    </div>
    <div class="dateWrapper" :class="{ 'late': !fullProgress && islate, 'onTime': !fullProgress && !islate, 'fullProgressSF': fullProgress }">
      <DateEntry :dateString="entryData.SFdate" />
      <div v-if="islate && !fullProgress" class="tooltip">Scheduled to finish after Purchase Order</div>
    </div>
    <div class="dateWrapper" :class="{'PO_Late': !fullProgress && poIsLate, 'PO_OnTime': !fullProgress && !poIsLate, 'fullProgressPO': fullProgress}">
      <DateEntry :dateString="entryData.POdate" />
      <div v-if="poIsLate && !fullProgress" class="tooltip">Deadline for the project has passed</div>
    </div>
    <div class="statusWrapper">
      <PlanStatus :onSchedule="calculateStatus" />
    </div>
    <div class="personWrapper">
      <PersonInCharge :entryName="entryData.PEM" />
    </div>
    <div class="commentWrapper w10" @click.stop="enableCommentEditMode">
      <div v-if="commentEditMode">
        <textarea rows="2" maxlength="30" style="word-wrap: break-word; overflow-wrap: break-word;"
          v-model="editedComment" @blur="updateComment" @keyup.enter="updateComment"></textarea>
      </div>
      <div v-else>
        <span>{{ editedComment }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useProjectsStore } from '@/stores/projects';
import { useRouter } from 'vue-router';

const props = defineProps({
  entryData: {
    type: Object,
    required: true
  }
});

const router = useRouter();
const store = useProjectsStore();
const authStore = useAuthStore();

const editedTitle = ref(props.entryData.title);
const editedComment = ref(props.entryData.comment);
const editMode = ref(false); // editorMode for title
const commentEditMode = ref(false); // editMode for comment

const admin = computed(() => authStore.isAdmin());

let islate;
islate = (props.entryData.SFdate > props.entryData.POdate)

const poIsLate = computed(() => {
  return new Date(props.entryData.POdate) < new Date();
});

const fullProgress = computed(() => {
  return props.entryData.progress === 100;
});

// Watch for changes in props.entryData and update local state
watch(
  () => props.entryData,
  (newData) => {
    editedTitle.value = newData.title;
    editedComment.value = newData.comment;
  },
  { immediate: true, deep: true }
);

// Handle title edit
const enableEditMode = () => {
  editMode.value = true;
  commentEditMode.value = false;
};

const updateTitle = async () => {
  try {
    await store.updateProjectTitle(props.entryData.id, editedTitle.value);
  } catch (error) {
    console.error('Failed to update the project:', error);
  } finally {
    editMode.value = false;
  }
};

// Handle comment edit
const enableCommentEditMode = () => {
  commentEditMode.value = true;
  editMode.value = false;
};

const updateComment = async () => {
  try {
    await store.updateProjectComment(props.entryData.id, editedComment.value);
  } catch (error) {
    console.error('Failed to update the project comment:', error);
  } finally {
    commentEditMode.value = false;
  }
};

// Compute the project status
const calculateStatus = computed(() => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() - 2);
  const onTimeDate = new Date(props.entryData.onTimeDate);
  return onTimeDate >= tomorrow;
});


// Redirect to the project page
const redirect = () => {
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
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.titleWrapper {
  margin: auto;
  text-align: center;
  width: 20%;
  cursor: text;
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
  position: relative;
}

.dateWrapper.late {
  background-color: yellow;
  padding: 5px;
  margin-left: 5px;
}

.dateWrapper.onTime {
  padding: 5px;
  margin-left: 5px;
}

.dateWrapper.PO_Late {
  background-color: rgb(249, 155, 40); 
  padding: 5px;

}

.dateWrapper.PO_OnTime {
  padding: 5px;
}
.dateWrapper.fullProgressSF {
  padding: 5px;
  margin-left: 5px;
}
.dateWrapper.fullProgressPO {
  padding: 5px;
}
.dateWrapper .tooltip {
  visibility: hidden;
  width: 200px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 125%; /* Position the tooltip above the text */
  left: 50%;
  margin-left: -100px;
  opacity: 0;
  transition: opacity 0.3s;
}

.dateWrapper .tooltip::after {
  content: "";
  position: absolute;
  top: 100%; /* At the bottom of the tooltip */
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

.dateWrapper:hover .tooltip {
  visibility: visible;
  opacity: 1;
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
  display: flex;
  margin: auto;
  text-align: flex;
  width: 10%;
  cursor: text;
  min-height: 1rem;
  z-index: 100;
}

.cursorPointer {
  cursor: pointer;
}

textarea {
  width: 100%;
  min-height: 80px;
  resize: vertical;
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>
