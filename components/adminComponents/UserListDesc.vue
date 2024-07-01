<template>
    <div class="row header">
        <div class="w50" @click="sortByName">Name: <span v-if="orderBy === 'username'">{{ order === 'desc' ? '↓' : '↑' }}</span></div>
        <div class="w25" @click="sortByTeam">Team: <span v-if="orderBy === 'team'">{{ order === 'desc' ? '↓' : '↑' }}</span></div>
        <div class="w25" @click="sortByRole">Role: <span v-if="orderBy === 'role'">{{ order === 'desc' ? '↓' : '↑' }}</span></div>
        <div class="small"></div>
    </div>
</template>


<script setup>
import { ref } from 'vue';
import { useUsersStore } from '@/stores/users';

const userStore = useUsersStore();
const order = ref('');
const orderBy = ref('');

function sortUsers(field, isNumeric = false) {
    if (orderBy.value === field && order.value === 'desc') {
        userStore.sortUsers((a, b) => {
            if (isNumeric) {
                return b[field] - a[field];
            } else {
                const aValue = a[field] ? String(a[field]) : '';
                const bValue = b[field] ? String(b[field]) : '';
                return bValue.localeCompare(aValue);
            }
        });
        order.value = 'asc';
    } else {
        userStore.sortUsers((a, b) => {
            if (isNumeric) {
                return a[field] - b[field];
            } else {
                const aValue = a[field] ? String(a[field]) : '';
                const bValue = b[field] ? String(b[field]) : '';
                return aValue.localeCompare(bValue);
            }
        });
        order.value = 'desc';
    }
    orderBy.value = field;
}

function sortByName() {
    sortUsers('username');
}

function sortByTeam() {
    sortUsers('team');
}

function sortByRole() {
    sortUsers('role');
}
</script>



<style scoped>
.w50 {
    width: 50%;
    cursor: pointer;
}

.w25 {
    width: 25%;
    cursor: pointer;
}

.small {
    width: 10px;
    margin-left: 5px;
    margin-right: 2px;
}

.row {
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 10px;
}
</style>