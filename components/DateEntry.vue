<script setup>
import { computed } from 'vue';

// Får komponenten til å ta imot en String for datoen
const props = defineProps({
  dateString: {
    type: [String, Date],
    default: null
  }
});


// Computed property to handle date formatting or fallback
const formattedDate = computed(() => {
  if (!props.dateString) {
    return '---'; // Return dashes if dateString is null or undefined
  }

  let date;
  
  // Check if dateString is already a Date object or a String
  if (props.dateString instanceof Date) {
    date = props.dateString;
  } else {
    date = new Date(props.dateString);
  }

  // Check if the date is valid
  if (isNaN(date)) {
    return '---'; // Return dashes if date is invalid
  }
  
  // Format the date to desired locale
  return date.toLocaleDateString('nb-NO', {day: '2-digit', month: '2-digit', year: 'numeric'});
});
</script>

<template>
  <!-- Display the formatted date or dashes -->
  {{ formattedDate }}
</template>

