<template>
  <Header />
  <router-view/>
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
</style>
