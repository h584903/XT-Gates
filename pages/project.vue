<template>
  <div class="wrapper">
    <div class="title">
      <h1>Project Title</h1>
      <!--Skal oppdateres med komponent etter merge-->
      <h2>PO Date</h2>
    </div>
    <GateList />
    <!-- Brukes for å kunne ha ting på en linje etter listen -->
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
  display: flex;
  justify-content: space-between;
  /* Gjør at tittellen og datoen er så langt unna hverandre som mulig */
}

.semi-footer {
  width: 100%;
  display: flex;
  justify-content: end;
}
  
</style>
