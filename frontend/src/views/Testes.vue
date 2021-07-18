<template>
<div>
    <leaseTable />
</div>
</template>


<script scoped>
import { mapState, mapActions } from 'vuex'
import leaseTable from '@/components/LeaseTable.vue'
export default {
    name: 'Testes',
    components: { leaseTable },
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
}
console.log(mapState.subsections)
</script>
<style>
  .center-container {
    height: calc(100vh - 56px);
  }
    
</style>