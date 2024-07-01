<template>
    <!-- Følger prototypen til figma -->
    <div class="list">
        <div class="titleWrapper" @click="sortByTitle">
            <span>Title</span>
            <span v-if="orderBy === 'title' && order === 'desc'"> ↑</span>
            <span v-else-if="orderBy === 'title' && order === 'asc'"> ↓</span>
        </div>
        <div class="progressWrapper" @click="sortByProgress">
            <span>Progress</span>
            <span v-if="orderBy === 'progress' && order === 'desc'"> ↑</span>
            <span v-else-if="orderBy === 'progress' && order === 'asc'"> ↓</span>
        </div>
        <div class="dateWrapper" @click="sortBySFDate">
            <span>Planned Delivery Date</span>
            <span v-if="orderBy === 'SFdate' && order === 'desc'"> ↑</span>
            <span v-else-if="orderBy === 'SFdate' && order === 'asc'"> ↓</span>
        </div>
        <div class="dateWrapper" @click="sortByPODate">
            <span>PO Date</span>
            <span v-if="orderBy === 'POdate' && order === 'desc'"> ↑</span>
            <span v-else-if="orderBy === 'POdate' && order === 'asc'"> ↓</span>
        </div>
        <div class="statusWrapper" @click="sortByStatus">
            <span>Plan Status</span>
            <span v-if="orderBy === 'onTimeDate' && order === 'desc'"> ↑</span>
            <span v-else-if="orderBy === 'onTimeDate' && order === 'asc'"> ↓</span>
        </div>
        <div class="PEM" @click="sortByPEM">
            <span>PEM</span>
            <span v-if="orderBy === 'PEM' && order === 'desc'"> ↑</span>
            <span v-else-if="orderBy === 'PEM' && order === 'asc'"> ↓</span>
        </div>
        <div class="commentWrapper" @click="sortByComment">
            <span>Comment</span>
            <span v-if="orderBy === 'comment' && order === 'desc'"> ↑</span>
            <span v-else-if="orderBy === 'comment' && order === 'asc'"> ↓</span>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useProjectsStore } from '@/stores/projects';

const projectStore = useProjectsStore();
const order = ref('');
const orderBy = ref('');

function sortProjects(field, isNumeric = false) {
    if (orderBy.value === field && order.value === 'desc') {
        projectStore.sortProjects((a, b) => isNumeric ? b[field] - a[field] : b[field].localeCompare(a[field]));
        order.value = 'asc';
    } else {
        projectStore.sortProjects((a, b) => isNumeric ? a[field] - b[field] : a[field].localeCompare(b[field]));
        order.value = 'desc';
    }
    orderBy.value = field;
}

function sortByTitle() {
    sortProjects('title');
}

function sortByPODate() {
    sortProjects('POdate');
}

function sortBySFDate() {
    sortProjects('SFdate');
}

function sortByStatus() {
    sortProjects('onTimeDate')
}

function sortByPEM() {
    sortProjects('PEM');
}

function sortByComment() {
    sortProjects('comment');
}

function sortByProgress() {
    sortProjects('progress', true); // Pass true for numeric comparison
}
</script>

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
    cursor: pointer;
}
.progressWrapper {
    margin: auto;
    text-align: center;
    width: 40%;
    cursor:pointer;
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
}
.PEM {
    margin: auto;
    text-align: center;
    width: 15%;
    cursor: pointer;
}
.commentWrapper {
    margin: auto;
    text-align: center;
    width: 10%;
    cursor: pointer;
}
</style>
