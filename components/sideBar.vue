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
  min-height: 100vh; /* Minste størrelsen er på størrelsen med skjermen */
  z-index: 700; /* Beholder komponenten fremst */
  display: flex;
  flex-direction: column; /* Fordeler hver item i sidebar nedover */
}

</style>
