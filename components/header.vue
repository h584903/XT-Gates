<template>
  <header>
    <div class="wrapper"> <!-- Lagt til for å plassere items mer fordelt -->
      <Logo/>
      <TeamDropdown />
      <CurrentUser />
    </div>
  </header>
</template>

<script>

</script>

<style scoped>
header {
  font-size: 15px;
  min-height: var(--headerHeight);
  position: fixed; /* Beholder headeren på toppen når man blar nedover */
  background-color: var(--background); /* Variabel i assets/variables.css */
  width: 100%; /* bredden er lik parent */
  left: 0; /* Plassering av headeren */
  top: 0;
  z-index: 700; /* Beholder komponenten fremst */
}

.wrapper { /* Ingenting er fast her, men dette er innstillinger jeg har brukt tidligere som kan være nyttige*/
  margin: 0 auto;
  height: 4.5rem;
  width: 95%;
  display: flex;
  justify-content:space-between;
  align-items: center;
}

</style>
./Header.vue