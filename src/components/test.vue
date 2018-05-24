<template>
    <div class="hello">
        <drag v-model="initData" :range="range"></drag>
        <!-- <test1 v-model="initData"></test1> -->
        <p>{{ initData }}</p>
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
