<template>
  <header class="header">
    <div class="wrapper">
    
    </div>
  </header>
</template>

<script>
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
  width: 100%;
  display: flex;
  justify-content:space-between;
  align-items: center;
}

@media (max-width: 1200px) {

}

@media (min-width: 1201px) {
  .wrapper {
      width: 80%;
  }

}

</style>
