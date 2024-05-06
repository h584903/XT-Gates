<template>
  <div class="list">
    <div class="NRWrapper">Gate NR</div>
    <div class="titleWrapper">Title</div>
    <div class="progWrapper">Gate progress</div>
    <div class="PFWrapper">Planned finish</div>
    <div class="DTGEWrapper">Days to gate end</div>
    <div class="dateWrapper">Completion date</div>
  </div>
</template>

<style scoped>
.list {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
}
.NRWrapper {
  flex: 1;
  text-align: center;
}
.titleWrapper {
  flex: 3.4;
  text-align: center;
}
.progWrapper {
  flex: 10;
  text-align: center;
}
.PFWrapper {
  flex: 1;
  text-align: center;
}
.DTGEWrapper {
  flex: 1.7;
  text-align: center;
}
.dateWrapper {
  flex: 1.4;
  text-align: center;
}
.solid {
  height: 1px;
  width: 100%;
  color: black;
}
</style>
