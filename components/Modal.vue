<template>
  <div class="modal_wrapper">
    <Teleport to="body">
      <Transition name="modal-fade"></Transition>
    </Teleport>
  </div>
</template>

<script setup>

</script>

<style scoped>
.modal-fade-enter-from,
.modal-fade-to{
  opacity: 0;
}

.modal-fade-active,
.modal-fade-active {
  transition: 0.25s ease all;
}

.modal_wrapper {
  position: fixed;
  left: 0;
  top: 0;

  z-index: 500;

  width: 100vw;
  height: 100vh;

  background: rgba(0,0,0,0.2);

  display: grid;
  place-items: center;
}

</style>