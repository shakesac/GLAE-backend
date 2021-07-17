<template class="d-flex h-100 text-center text-white bg-dark">
  <Header />
  <div id="center-wrapper" class="container d-flex text-center">
    <router-view/>
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
}
  body {
  background-image: url('./assets/background.jpg');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: auto;
}
#center-wrapper {
  margin-top: 2vh;
  margin-bottom: 2vh;
  background-color: #f0f3f6;
  border-radius: 40px;
  padding: 75px 40px;
}
</style>
