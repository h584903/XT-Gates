<template>
    <!-- Følger prototypen til figma -->
    <div class="list">
        <div class="titleWrapper">
            <span>Title</span>
        </div>
        <div class="progressWrapper">
            <ProgressBar />
        </div>
        <div class="dateWrapper">
            <span>Planned Delivery date</span>
        </div>
        <div class="dateWrapper">
            <span>PO Date</span>
        </div>
        <div class="statusWrapper">
            <span>Plan Status</span>
        </div>
        <div class="PEM">
            <span>PEM</span>
        </div>
        <div class="commentWrapper">
            <span>Comment</span>
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
    visibility: hidden;
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
.PEM {
    margin: auto;
    text-align: center;
    width: 15%
}
.commentWrapper {
    margin: auto;
    text-align: center;
    width: 10%;
}
</style>
