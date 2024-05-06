<script setup>
import { computed } from 'vue';

// Får komponenten til å ta imot en String for datoen
const props = defineProps({
  dateString: {
    type: String,
    default: null
  }
});


// Computed property to handle date formatting or fallback
const formattedDate = computed(() => {
  if (!props.dateString) {
    // Return dashes if dateString is null or undefined
    return '---';
  }
  
  // Attempt to parse and format the date
  const date = new Date(props.dateString);
  
  // Check if the date is valid
  if (isNaN(date)) {
    return '---';
  }
  
  return date.toLocaleDateString();
});
</script>

<template>
  <div>
    <!-- Display the formatted date or dashes -->
    {{ formattedDate }}
  </div>
</template>

