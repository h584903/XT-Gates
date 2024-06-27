<template>
    <div class="row">
        <div class="w50">Name:</div>
        <div class="w25">Team:</div>
        <div class="w25">Role:</div>
        <div class="small"></div>
    </div>
</template>

<style scoped>
.w50 {
    width: 50%;
}

.w25 {
    width: 25%;
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