<template>
    <div id="bg-wrapper" class="container-fluid d-flex align-items-center justify-content-center">
    <!--<div id="center-wrapper" class="container-sm d-flex text-center">-->
      <slot />
    </div>
</template>

<style scoped>
  #bg-wrapper {
  background: #212529 url('../assets/background.jpg');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  min-height: calc(100vh - 56px);
  padding-top: 3vh;
  padding-bottom: 3vh;
}

#center-wrapper {
  background-color: #f0f3f6;
  border-radius: 40px;
  padding: 75px 40px;
}
</style>
