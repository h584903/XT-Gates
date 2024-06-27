<template>
  <header>
    <div class="wrapper">
      <Logo />
      <TeamDropdown v-if="isLoggedIn" />
      <CurrentUser />
    </div>
  </header>
</template>

<script setup>

const authStore = useAuthStore();

const isLoggedIn = authStore.isLoggedIn();

</script>

<style scoped>
header {
  font-size: 15px;
  min-height: var(--headerHeight);
  position: fixed;
  background-color: var(--background);
  width: 100%;
  left: 0;
  top: 0;
  z-index: 700;
}

.wrapper {
  margin: 0 auto;
  height: 4.5rem;
  width: 95%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
