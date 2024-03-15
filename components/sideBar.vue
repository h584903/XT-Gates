<template>
  <div class="sidebar">
    <span>Dashboard</span>
    <span>Project List</span>
    <span>Projects</span>

  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>

.sidebar {
  padding: 0;
  margin: 0;
  font-size: 15px;
  position:fixed; /* Beholder posisjonen til sidebaren */
  min-height: 100vh;
  z-index: 700;
  display: flex;
  flex-direction: column;
}

</style>
