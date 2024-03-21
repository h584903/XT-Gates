<template>
  <div class="sidebar"> <!-- listen over linker-->
    <NuxtLink to="/" class="hoverlink">Dashboard</NuxtLink>
    <NuxtLink to="/Archive" class="hoverlink">Archive</NuxtLink>
    <NuxtLink to="/projectList" class="hoverlink">Active Projects</NuxtLink>
    <LinkList :id="projectId"/> <!--Listen over aktive prosjekter-->
  </div>
</template>

<script setup>
  // Må endres til å hente ut en faktisk id som settes til et prosjekt
  const projectId = ref('1');
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

/* Hover og tekststyling */
.sidebar a {
  color: Black;
  text-decoration: none;
}
.sidebar a:hover{
  color: grey;
  text-decoration: none;
}

</style>