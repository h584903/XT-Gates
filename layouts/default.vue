<template>
  <Header />
  <div class="content">
    <div class="sidebar_wrapper">
      <sideBar />
    </div>
    <div class="slot_wrapper">
      <slot />
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
    padding-top: var(--headerHeight);
    display: flex; /* Flexbox for the 2 items sidebar, and the rest of the content */
}
.slot_wrapper {
  flex: 5;
}
.sidebar_wrapper {
  flex: 1;
}
</style>
