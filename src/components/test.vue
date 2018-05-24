<template>
    <div class="hello">
        <slider v-model="initData" :range="range"></slider>
        <p>{{ initData }}</p>
    </div>
</template>

<script>
    import slider from './slider'
    import { toUnixTime } from '../utils/time.js'

    export default {
        name: 'test',
        components: {
            slider
        },
        data() {
            return {
                //相差两分钟
                //传入unix时间戳时间为
                // initData: [toUnixTime(+new Date()) - 3600, toUnixTime(+new Date()) - 3480],
                // range: [toUnixTime(+new Date()) - 3600, toUnixTime(+new Date())]
                
                initData: [0, 10],  //开始的区间范围
                range: [0, 100]     //整体可选的范围
            }
        },
        methods: {
            testValInit(type) {
                if(type === 'time') {
                    this.initData = [toUnixTime(+new Date()) - 3600, toUnixTime(+new Date()) - 3480]
                    this.range = [toUnixTime(+new Date()) - 3600, toUnixTime(+new Date())]
                }

                if(type === 'number') {
                    this.initData = [0, 10]
                    this.range = [0, 100]
                }
            }
        },
        mounted() {
            this.testValInit('number')
        }
    }

</script>

<style scoped>
    .hello {
        width: 600px;
    }
</style>
