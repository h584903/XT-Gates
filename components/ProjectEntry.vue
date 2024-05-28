<template>
  <div class="list project-card">
    <div class="titleWrapper" @click="enableEditMode" v-if="!editMode">
      <span>{{ editedTitle }}</span>
    </div>
    <div class="titleWrapper" v-else>
      <input type="text" v-model="editedTitle" @keyup.enter="updateTitle" @blur="updateTitle" />
    </div>
    <div class="progressWrapper" @click="redirect">
      <ProgressBar :progressNumber="entryData.progress" />
    </div>
    <div class="dateWrapper" @click="redirect">
      <DateEntry :dateString="entryData.SFdate" />
    </div>
    <div class="dateWrapper">
      <DateEntry :dateString="entryData.POdate" />
    </div>
    <div class="statusWrapper" @click="redirect">
      <PlanStatus :onSchedule="calculateStatus" />
    </div>
    <div class="personWrapper" @click="redirect">
      <PersonInCharge :entryName="entryData.PEM" />
    </div>
    <div class="commentWrapper w10" @click="enableCommentEditMode">
      <div v-if="commentEditMode">
        <textarea rows="2" maxlength="30" style="word-wrap: break-word; overflow-wrap: break-word;" v-model="editedComment" @blur="updateComment" @keyup.enter="updateComment"></textarea>
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

const editedTitle = ref(props.entryData.title);
const editedComment = ref(props.entryData.comment);
const editMode = ref(false); // editorMode for title
const commentEditMode = ref(false); // editMode for comment

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
  const onTimeDate = new Date(props.entryData.onTimeDate);
  return onTimeDate >= today;
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
  display: flex;
  margin: auto;
  text-align: flex;
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
