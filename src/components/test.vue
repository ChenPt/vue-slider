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
    import { toUnixTime } from '../utils/time.js'

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
                time: [toUnixTime(+new Date()) - 3600, toUnixTime(+new Date()) - 3480],
                range: [toUnixTime(+new Date()) - 3600, toUnixTime(+new Date())]
            }
        },
        methods: {
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
