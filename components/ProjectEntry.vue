<script setup>

defineProps({
  entryData: {
    type: Object,
    required: true
  }
})

const sortDates = () => {
  // Assuming you have dates defined somewhere
  dates.value.sort((a, b) => new Date(a) - new Date(b));
};
</script>


<template>
  <!-- Følger prototypen til figma -->
  <div class="list">
    <div class="titleWrapper">
      <span>{{ entryData.title }}</span>
    </div>
    <div class="progressWrapper">
      <ProgressBar :progressNumber="entryData.progress" />
    </div>
    <div class="dateWrapper">
      <DateEntry :dateString = "entryData.plannedDate" />
    </div>
    <div class="dateWrapper">
      <DateEntry :dateString = "entryData.POdate" />
    </div>
    <div class="statusWrapper">
      <PlanStatus :onSchedule = "entryData.status" />
    </div>
    <div class="personWrapper">
      <PersonInCharge :entryName="entryData.pem"/>  
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
  margin: auto;
  text-align: center;
  width: 50%;
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
.personWrapper {
  margin: auto;
  text-align: center;
  width: 15%
}
</style>
