<template>
  <button @clicked="addItem">Add Item</button>
</template>

<script setup>
// Import necessary functions
import { defineEmits } from 'vue';

// Define the 'add-item' event
const emit = defineEmits(['add-item']);

// Function to emit the 'add-item' event when the button is clicked
function addItem() {
  emit('add-item');
}
</script>
