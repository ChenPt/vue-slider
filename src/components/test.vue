<template>
    <div class="hello">
        <drag v-model="time" :range="range"></drag>
        <!-- <test1 v-model="time"></test1> -->
        <p>{{ time }}</p>
    </div>
</template>

<script>
    import drag from './drag'
    import test1 from './test1'

    export default {
        name: 'test',
        components: {
            test1,
            drag
        },
        data() {
            return {
                //相差两分钟
                //传入unix时间戳时间为
                time: [this.toUnixTime(+new Date()) - 3500, this.toUnixTime(+new Date()) - 3440],
                range: [this.toUnixTime(+new Date()) - 3600, this.toUnixTime(+new Date())]
            }
        },
        methods: {
            toUnixTime(val) {
                return Math.round(val/1000)
            }
        },
        mounted() {
        }
    }

</script>

<style scoped>
    .hello {
        width: 600px;
    }
</style>
