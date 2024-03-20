<template>
  <div class="list-wrapper">
    <ListDesc/>
    <hr class="solid">
    <div v-for="entry in prosjektliste" :key="entry.id">
      <ProjectEntry :entryData="entry"/>
      <hr class="solid">
    </div>
    <button v-on:click="addItemToList">Press me</button>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "primary"
    }
  },
  computed: {
    buttonClass() {
      return `button-${this.type}`;
    }
  },
  methods: {
    handleClick() {
      // Emitting a custom event when the button is clicked
      this.$emit('click');
    }
  }
};
</script>


<style>
.list-wrapper {
  display: flex;
  flex-direction: column;
  width: 80%
}

hr.solid {
  width: 100%;
  border-top: 1px solid grey;
}
</style>
