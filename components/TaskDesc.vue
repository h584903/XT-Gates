<template>
  <div class="list">
    <div class="stepWrapper">Step</div>
    <div class="titleWrapper">Title</div>
    <div class="roleWrapper">Responsible role</div>
    <div class="dateWrapper">Completion date</div>
    <div class="signWrapper">Signature</div>
    <div class="progressWrapper">Activity progress</div>
    <div class="scheduleWrapper">Schedule Status</div>
    <div class="durationWrapper">Duration</div>
    <div class="commentWrapper">Comment</div>
  </div>
</template>

<style scoped>
.list {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
}
.stepWrapper {
  flex: 0.5;
  text-align: start;
}
.titleWrapper {
  flex: 1.5;
  text-align: center;
}
.roleWrapper {
  flex: 1.3;
  text-align: center;
}
.dateWrapper {
  flex: 1.2;
  text-align: center;
}
.signWrapper {
  flex: 1;
  text-align: center;
}
.progressWrapper {
  flex: 1.4;
  text-align: center;
}
.scheduleWrapper {
  flex: 0.5;
  text-align: center;
}
.durationWrapper {
  flex: 1;
  text-align: center;
}
.commentWrapper {
  flex: 0.7;
  text-align: center;
}
</style>
