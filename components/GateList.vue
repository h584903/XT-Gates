<script setup>

  import { ref, onMounted } from 'vue';
  import { useGatesStore } from '@/stores/gates';
  

  const props = defineProps({
    projectId: {
      type: String,
      required: true
    }
  });

  const gateStore = useGatesStore();

  const gates = computed(() => {
    return gateStore.getProjectGates(props.projectId).value;
  });
  console.log("Dette er gatene: " + gates.value)

</script>

<template>
  <div class="gatelist">
    <div v-if="gates.length > 0" v-for ="gate in gates">
      <hr class="solid" >
      <GateEntry :gateID="gate.ID" :gateNR="gate.gateNR" :title="gate.title" :projectId="props.projectId" :completionDate="gate.completionDate" />
      <hr class="solid" >
    </div>
    <div v-else>
      No gates found for this project
    </div>
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
