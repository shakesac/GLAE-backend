<template>
    <main>
        <img alt="Vue logo" src="../assets/logo.png">
        <div>
            <b-table striped hover :items="sections"></b-table>
            <b-table striped hover :items="subsections"></b-table>
            <p>{{ sections }}</p>
        </div>
    </main>
</template>

<script>
import api from '@/services/api.js'


export default {
    name: 'Main',
    data() {
        return {
            sections: [],
            subsections: []
        }
    }, 
    mounted() {
        api.get('/section/all').then(res => {
            if (res.status == 'failed'){
                console.log(res.message)
            } else {
                console.log(res.status, res.data.status)
                this.sections = res.data.data
            }
        })
        api.get('/section/sub/all').then(res => {
            this.subsections = res.data.data
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