<template>
  <div class="list">
    <div class="w5"></div>
    <div class="stepWrapper">Step</div>
    <div class="titleWrapper">Title</div>
    <div class="roleWrapper">Responsible role</div>
    <div class="dateWrapper">Completion date</div>
    <div class="signWrapper">Signature</div>
    <div class="progressWrapper">Activity progress</div>
    <div class="scheduleWrapper">Schedule Status</div>
    <div class="durationWrapper">Duration</div>
    <div class="commentWrapper">Comment</div>
    <div class="w3"></div>
  </div>
</template>

<style scoped>
.list {
    display: flex;
    flex-direction: row;
    width: 100%
}
.stepWrapper {
  width: 5%;
  text-align: start;
}
.titleWrapper {
  width: 15%;
  text-align: center;
}
.roleWrapper {
  width: 10%;
  text-align: center;
}
.dateWrapper {
  width: 10%;
  text-align: center;
}
.signWrapper {
  width: 10%;
  text-align: center;
}
.progressWrapper {
  width: 10%;
  text-align: center;
}
.scheduleWrapper {
  width: 5%;
  text-align: center;
}
.durationWrapper {
  width: 5%;
  text-align: center;
}
.commentWrapper {
  width: 10%;
  text-align: center;
}
.w5 {
  width: 3.3%;
}
.w3 {
  width: 2.5%;
}
</style>
