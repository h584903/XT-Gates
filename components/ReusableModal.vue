  <!-- Innholdet for modulen -->
  <template>
    <transition name="modal-animation">
      <div v-if="modalActive" class="modal">
        <div class="modal-inner">
          <!-- Modal content skal her -->
          <slot></slot>
          
        </div>
      </div>
    </transition>
  </template>

<script setup>
  // Sende med en boolsk variabel
  const props = defineProps({
    modalActive: {
      type: Boolean,
      default: false,
    },
  })
    // Define emits
    const emits = defineEmits(['close']);

// Define component logic
const close = () => {
  emits('close');
};
</script>

<style scoped>
/* Animasjon */
.modal-animation-enter-active,
.modal-animation-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-enter-from,
.modal-animation-leave-to {
  opacity: 0;
}
.modal-animation-inner-enter-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-animation-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}
.modal-animation-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}
.modal-animation-inner-leave-to {
  transform: scale(0.8);
}


  /* Styling for modalen */
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(255,255,255, 0.7);
  /* Styling for boksen */
  .modal-inner {
    position: relative;
    /* Mulig endre på størrelsen her */
    /*max-width: 800px;*/
    width: 640px;
    box-shadow: 0 4px 6px -1px rgba(0,0,0, 0.1), 0 2px 4px -1px rgba(0,0,0, 0.06);
    background-color: #fff;
    padding: 16px 16px;
    /* Styling for knappene inni modalen*/
    button {
      /* Mulig bruke % og ikke fast px for padding*/
  padding: 10px 10px;
  border: none;
  font-size: 16px;
  background-color: rgb(77, 77, 77);
  color: white;
  cursor: pointer;
  margin: 10px;
    }
  }
}

</style>
