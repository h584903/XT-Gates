<template>
  <div class="sidebar"> <!-- listen over linker-->
    <NuxtLink to="/projectList" class="hoverlink font Thin-Line">Dashboard</NuxtLink>
    <div class ="font Thin-Line">My Projects:</div>
    <LinkList class="font"/> <!--Listen over aktive prosjekter-->
    <NuxtLink to="/manager" class="hoverlink font Thin-Line">Escalated Projects</NuxtLink>
    <NuxtLink to="/" class="hoverlink font Thin-Line">System</NuxtLink>
    <NuxtLink to="/Archive" class="hoverlink font Thin-Line">Archive</NuxtLink>
    <NuxtLink v-if="admin" to="/admin" class="hoverlink font Thin-Line">Admin</NuxtLink>
  </div>
</template>

<script setup>

const authStore = useAuthStore();

const admin = computed(() => authStore.isAdmin());

</script>

<style scoped>

.sidebar {
  padding: 10px; /* Omrisset til teksten */
  position: fixed;
  margin: 0;
  height: 100%;
  font-size: 1.2rem;
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
.Thin-Line{
  display: inline-block;
  text-decoration: none;
  color: inherit;
  position: relative; 
  padding: 2px;
}
.Thin-Line::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: #ccc; /* Color of the line */
}

</style>
