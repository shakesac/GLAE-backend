<template>
    <main>
        <img alt="Vue logo" src="../assets/logo.png">
        <div>
            <b-table striped hover :sections="sections">
            </b-table>
        </div>
    </main>
</template>

<script>
import api from '@/services/api.js'


export default {
    name: 'Main',
    data() {
        return {
            sections: []
        }
    }, 
    mounted() {
        api.get('/section/all').then(res => {
            this.sections = res.data
        })
    }
}
</script>

<style>
    main {
        background-color:#f5f5f5;
        height: calc(100vh - 116px)
    }
</style>