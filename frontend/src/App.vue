<template>
  <Header />
  <div id="bg-wrapper" class="container-fluid d-flex align-items-center">
    <div id="center-wrapper" class="container-sm d-flex text-center">
      <router-view/>
    </div>
  </div>
</template>
<script>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Header from '@/components/Header.vue'

export default {
  name: 'App',
  components: {
    Header,
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto');
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*color: #2c3e50;*/
  background: #212529;
}

  #bg-wrapper {
  background: #212529 url('./assets/background.jpg');
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
