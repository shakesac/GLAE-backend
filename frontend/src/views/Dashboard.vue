<template>
<base-layout>
    <main class="col-sm d-flex flex-column">
      <p class="lead">
        <a href="#" class="btn btn-lg btn-secondary fw-bold border-white bg-white">Learn more</a>
      </p>
    </main>
</base-layout>
</template>

<script>
import BaseLayout from './Base.vue'

export default {
  name: 'Home',
  components: {
    BaseLayout,
    
  },
  data() {
  }
}
</script>

<style scoped>
  .center-container {
    height: calc(100vh - 56px);
  }
  .bd-placeholder-img {
    font-size: 1.125rem;
    text-anchor: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
  }
  @media (min-width: 768px) {
    .bd-placeholder-img-lg {
      font-size: 3.5rem;
    }
  }
  .cover-container {
    max-width: 42em;
  }
  .btn-secondary,
  .btn-secondary:hover,
  .btn-secondary:focus {
    color: #333;
    text-shadow: none; /* Prevent inheritance from `body` */
  }
</style>