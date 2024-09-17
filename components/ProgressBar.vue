<template>
  <div v-if="hasProgress" class="progress-container">
    <div class="progress-bar preparation">
      <div class="filled-bar" :style="{ width: (progressNumber[0] || 0) + '%' }"></div>
    </div>

    <div class="progress-bar delivery">
      <div class="filled-bar" :style="{ width: (progressNumber[1] || 0) + '%' }"></div>
    </div>
  </div>

  <div v-else>
    <span>No progress data available</span>
  </div>
</template>

<script>
export default {
  props: {
    progressNumber: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const hasProgress = props.progressNumber && Array.isArray(props.progressNumber) && props.progressNumber.length > 0;

    return {
      hasProgress,
      progressNumber: props.progressNumber,
    };
  },
};
</script>

<style scoped>
.progress-container {
  display: flex;
  gap: 20px; /* Adjust the gap between the two bars */
}

.progress-bar {
  width: 100%;
  background-color: #e0e0e0;
  height: 20px;
  border-radius: 5px;
  border: 1px solid #b0b0b0; /* Subtle outline */
  overflow: hidden;
  position: relative;
}

.filled-bar {
  height: 100%;
  border-radius: 5px;
}

/* Separate colors for each bar */
.preparation .filled-bar {
  background-color: #76c7c0; /* Color for Preparation Phase */
}

.delivery .filled-bar {
  background-color: #f4a261; /* Color for Delivery Phase */
}
</style>
