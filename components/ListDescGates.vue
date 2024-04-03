<template>
  <div class="list">
    <div class="gateNameWrapper">Gate:</div>
    <div class="progressWrapper"><ProgressBar/></div>
    <div class="scheduledDateWrapper">Scheduled Finish:</div>
    <div class="daysToGateEndWrapper">Days to gate end:</div>
    <div class="remainingActivityDaysWrapper">Remaining activity days:</div>
    <div class="finishDateWrapper">Completion date:</div>
    <div class="commentWrapper">Comment:</div>
  </div>

</template>

<script lang="ts" setup>

</script>

<style scoped>

.list {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}
.gateNameWrapper{
  margin: auto;
  text-align: center;
  width: 20%;
}
.progressWrapper{
  visibility: hidden;
  margin: auto;
  text-align: center;
  width: 40%;
}
.scheduledDateWrapper{
  margin: auto;
  text-align: center;
  width: 10%;
}
.daysToGateEndWrapper{
  margin: auto;
  text-align: center;
  width: 10%;
}
.remainingActivityDaysWrapper{
  margin: auto;
  text-align: center;
  width: 10%;
}
.finishDateWrapper{
  margin: auto;
  text-align: center;
  width: 10%;
}
.commentWrapper{
  margin: auto;
  text-align: center;
  width: 10%;
}
</style>