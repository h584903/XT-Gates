<template>
  <div class="sidebar"> <!-- listen over linker-->
    <NuxtLink to="/">Dashboard</NuxtLink>
    <NuxtLink to="/Archive">Archive</NuxtLink>
    <NuxtLink to="/projectList">Active Projects</NuxtLink>
    <LinkList /> <!--Listen over aktive prosjekter-->
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>

.sidebar {
  padding: 10px; /* Omrisset til teksten */
  margin: 0;
  font-size: 25px;
  position:fixed; /* Beholder posisjonen til sidebaren */
  min-height: 100vh; /* Minste størrelsen er på størrelsen med skjermen */
  z-index: 700; /* Beholder komponenten fremst */
  display: flex;
  flex-direction: column; /* Fordeler hver item i sidebar nedover */
  background-color: var(--sideBarColor);
}

</style>