<template>
  <div class="sidebar"> <!-- listen over linker-->
    <NuxtLink to="/" class="hoverlink font">Dashboard</NuxtLink>
    <NuxtLink to="/Archive" class="hoverlink font">Archive</NuxtLink>
    <NuxtLink to="/projectList" class="hoverlink font">Active Projects</NuxtLink>
    <LinkList class="font"/> <!--Listen over aktive prosjekter-->
  </div>
</template>

<script setup>
  // Må endres til å hente ut en faktisk id som settes til et prosjekt
</script>

<style scoped>

.sidebar {
  padding: 10px; /* Omrisset til teksten */
  position: fixed;
  margin: 0;
  height: 100%;
  font-size: 25px;
  min-height: 100vh; /* Minste størrelsen er på størrelsen med skjermen */
  z-index: 700; /* Beholder komponenten fremst */
  display: flex;
  flex-direction: column; /* Fordeler hver item i sidebar nedover */
  background-color: var(--sideBarColor);
  width: 12%;
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
.font{
    font-family: sans-serif;
    font-weight: 300;
}

</style>
