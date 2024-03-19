<script setup>
  defineProps({
    progressNumber: Number
  });
</script>

<template>
  <div class="bar">
    <div class="bar progress" :style="{ width: progressNumber + '%' }"></div>
  </div>
</template>
<style>
.bar {
  width: 100%;
  height: 20px;
  background-color: grey;
  border-radius: 13px;
}

.bar.progress {
  border-radius: 13px 0px 0px 13px;
  width: var(--progress);
  background-color: green;
}
</style>
