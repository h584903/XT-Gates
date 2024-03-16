<template>
  <div class="wrapper">
    <div class="title">
      <h1>Project Title</h1>
      <h2>PO Date</h2>
    </div>
    <GateList />
    <div class="semi-footer">
      <SaveButton />
    </div>
  </div>
</template>
<script>

</script>
<style>
.wrapper {
  display: flex;
  flex-direction: column;
}
.title {
  justify-content: space-between;
}

.semi-footer {
  width: 100%;
  display: flex;
  justify-content: end;
}
  
</style>
