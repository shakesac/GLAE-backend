<template>
    <div>
        <div class="center-container d-flex text-center text-white bg-dark">
            <div class="cover-container w-100 p-3 mx-auto justify-content-center d-flex flex-column">
            <main class="px-3 d-flex flex-column">
                <table class="table table-hover">
                </table>
                <p v-for="(id, sections) in sections" :key="id">{{ sections }}</p>
            </main>
            </div>
        </div>        
    </div>
</template>


<script>
import { mapState, mapActions } from 'vuex'
export default {
    name: 'Testes',
    computed: {
        ...mapState(['sections']),
    }, 
    async created() {
        await this.loadSections();
    },
    methods: {
        ...mapActions(['getSections']),
        async loadSections() {
            await this.getSections();
        },
    },
};
console.log(mapState.subsections)
</script>
<style>
  .center-container {
    height: calc(100vh - 56px);
  }
    
</style>