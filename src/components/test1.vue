<template>
    <div 
        class="hello"
        v-on:update="$emit('update')"
    >
    </div>
</template>
<script>
    export default {
        name: 'test1',
        model: {
            prop: 'test',
            event: 'update'
        },
        props: {
            test: {
                type: Array
            }
        },
        data(){
            return {
                da: [1,2]
            }
        },
        mounted(){
            this.$emit('update', this.da)
        },
        methods: {
        }
    }
</script>
<style>
    
</style>