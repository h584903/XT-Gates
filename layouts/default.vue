<template>
  <Header />
  <sideBar />
  <div class="content">
    <slot />
  </div>
</template>
<style>

body {
    min-height: 100vh;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
}

.content {
    padding-top: var(--headerHeight);
    flex: 1;
}

</style>