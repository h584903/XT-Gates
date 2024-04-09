<script setup>

  import { ref, onMounted } from 'vue';
  import { useGatesStore } from '@/stores/gates';

  const props = defineProps({
    projectId: {
      type: Number,
      required: true
    }
  });

  const gateStore = useGatesStore();
  const gates = ref([]);

  onMounted(async () => {
    try {
      const projectGates = gateStore.getProjectGates(props.projectId);
      gates.value = projectGates.value;
    } catch (error) {
      console.error('Error fetching gates:', error);
    }
  });
</script>
<template>
  <div class="gatelist">
    <hr class="solid">
    <GateEntry />
    <hr class="solid">
    <GateEntry />
    <hr class="solid">
    <GateEntry />
    <hr class="solid">
    <GateEntry />
    <hr class="solid">
    <GateEntry />
    <hr class="solid">
    <GateEntry />
    <hr class="solid">
  </div>
</template>
<style scoped>

.gatelist {
  display: flex;
  flex-direction: column;
}

hr.solid {
  width: 100%;
  border-top: 1px solid grey;
}

</style>
