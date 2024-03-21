<template>
  <span> {{ name }}</span>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  entryName: {
    type: String,
    required: true
  }
});

const name = abrName(props.entryName)
</script>


<style>

</style>
