<template>
    <div>
        <div class="center-container d-flex text-center text-white bg-dark">
            <div class="cover-container w-100 p-3 mx-auto justify-content-center d-flex flex-column">
            <main class="px-3 d-flex flex-column">
                <table class="table table-hover">
                </table>
                <p v-for="(id, section) in sections" :key="id">{{ section }}</p>
            </main>
            </div>
        </div>        
    </div>
</template>


<script>
import { mapState } from 'vuex'
export default {
    name: 'Testes',
    computed: {
        ...mapState(['sections']),
    }
}
console.log(mapState.sections)
</script>
<style>
  .center-container {
    height: calc(100vh - 56px);
  }
    
</style>