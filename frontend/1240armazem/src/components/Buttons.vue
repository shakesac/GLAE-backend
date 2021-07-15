<template>
    <div>
        <b-button @click="onClick()" :variant="variant">{{ text }}</b-button>
    </div>
</template>

<script>
export default {
    name: 'Button',
    props: {
        text: String,
        variant: String,
    },
    methods: {
        onClick() {
            console.log('click')
        }
    }

}
</script>

<style>

</style>