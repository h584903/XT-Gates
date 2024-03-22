<template>
  <div class="wrapper-row">
    <h1>ACTIVE PROJECTS</h1>
    <div class="projectList">
      <ProjectList />
    </div>
    <button style="addprojectbutton" />
  </div>
</template>
<script>

</script>
<style scoped>
/* Style er scoped for å beholde singleFileComponent struktur */
.wrapper {
  display: flex;
  flex-direction: row;
}

h1 {
  text-decoration: underline;
}

.addprojectbutton {
  position: fixed;
  right: 5%;
  bottom: 10%;
}

</style>
