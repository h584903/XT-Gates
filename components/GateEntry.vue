<script setup>
  const plannedDate = "2024-03-18"
  const completionDate = "2024-03-19"
  const isOpen = ref(false);
</script>
<template>
  <div class="list" @click="isOpen = ! isOpen">
    <div class="title">
      <span>Gate example</span>
    </div>
    <div class="progress">
      <ProgressBar :progressNumber="30" />
    </div>
    <div class="plannedDate">
      <DateEntry :dateString = plannedDate />
    </div>
    <div class="remaining">
      <span>test</span>
    </div>
    <div class="daysToEnd">
      <span>test</span>
    </div>
    <div class="completion">
      <DateEntry :dateString = completionDate />
    </div>
  </div>
  <div class="mb-8">
    <Transition name="slide-fade">
      <ul v-show="isOpen" class="list-reset w-48 p-4 bg-grey-light">
        <li>Example!</li>
        <li>Example!</li>
        <li>Example!</li>
        <li>Example!</li>
        <li>Example!</li>
        <li>Example!</li>
      </ul>
    </Transition>
  </div>
</template>
<style scoped>
.mb-8 {
  width: 100;
}

.list {
  display: flex;
  flex-direction: row;
}

.title {
  margin: auto;
  text-align: center;
  width: 20%;
}
.progress {
  margin: auto;
  text-align: center;
  width: 50%;
}

.plannedDate {
  margin: auto;
  text-align: center;
  width: 10%;
}
.remaining {
  margin: auto;
  text-align: center;
  width: 5%;
}
.daystoEnd {
  margin: auto;
  text-align: center;
  width: 5%;
}
.completion {
  margin: auto;
  text-align: center;
  width: 10%;
}

/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}


.github-corner:hover 

</style>
<script setup>

</script>
