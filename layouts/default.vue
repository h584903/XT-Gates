<template>
  <Header />
  <div class="content">
    <div class="sidebar_wrapper"> <!-- Lagt til for å holde sidebar isolert fra layouten -->
      <sideBar />
    </div>
    <div class="slot_wrapper">
      <slot /> <!-- Her ligger siden som hentes fra page mappen -->
    </div>
  </div>
</template>
<style scoped>

body {
    min-height: 100vh;
    padding: 0;
    margin: 0;
}

.content {
    padding-top: var(--headerHeight); /* Variablelen ligger i assets/colors.css */
    display: flex; /* Flexbox for the 2 items sidebar, and the rest of the content */
}
.slot_wrapper {
  flex: 5; /* 5/1 fordeling mellom sidebar og slot */
}
.sidebar_wrapper {
  flex: 1;
}
</style>
