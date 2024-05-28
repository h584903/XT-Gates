<template>
  <span> {{ name }}</span>
</template>

<script setup>

const props = defineProps({
  entryName: {
    type: String,
    required: true
  }
});

const name = props.entryName
</script>


<style>

</style>
