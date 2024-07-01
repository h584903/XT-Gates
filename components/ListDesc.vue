<template>
    <!-- Følger prototypen til figma -->
    <div class="list">
        <div class="titleWrapper" @click="sortByTitle">
            <span v-if="orderBy === 'title' && order === 'desc'">↑</span>
            <span v-else-if="orderBy === 'title' && order === 'asc'">↓</span>
            <span>Title</span>
        </div>
        <div class="progressWrapper" @click="sortByProgress">
            <span v-if="orderBy === 'progress' && order === 'desc'">↑</span>
            <span v-else-if="orderBy === 'progress' && order === 'asc'">↓</span>
            <span>Progress</span>
        </div>
        <div class="dateWrapper" @click="sortBySFDate">
            <span v-if="orderBy === 'SFdate' && order === 'desc'">↑</span>
            <span v-else-if="orderBy === 'SFdate' && order === 'asc'">↓</span>
            <span>Planned Delivery Date</span>
        </div>
        <div class="dateWrapper" @click="sortByPODate">
            <span v-if="orderBy === 'POdate' && order === 'desc'">↑</span>
            <span v-else-if="orderBy === 'POdate' && order === 'asc'">↓</span>
            <span>PO Date</span>
        </div>
        <div class="statusWrapper">
            <span>Plan Status</span>
        </div>
        <div class="PEM" @click="sortByPEM">
            <span v-if="orderBy === 'PEM' && order === 'desc'">↑</span>
            <span v-else-if="orderBy === 'PEM' && order === 'asc'">↓</span>
            <span>PEM</span>
        </div>
        <div class="commentWrapper" @click="sortByComment">
            <span v-if="orderBy === 'comment' && order === 'desc'">↑</span>
            <span v-else-if="orderBy === 'comment' && order === 'asc'">↓</span>
            <span>Comment</span>
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
