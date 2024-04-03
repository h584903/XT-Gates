<template>
  <ListDescGates/>
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
