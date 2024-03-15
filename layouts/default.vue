<template>
  <Header />
  <div class="content">
    <sideBar />
    <slot />
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

</style>
