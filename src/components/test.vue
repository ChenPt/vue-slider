<template>
    <div class="hello">
      <slider-custom
        v-model="initData"
        :range="range"
        :formatter="formatter">
      </slider-custom>
    </div>
</template>

<script>
// import sliderCustom from "./slider";
import { ts2Date } from '../utils'

export default {
  name: "test",
  components: {
    // sliderCustom
  },
  data () {
    return {
      //相差十五分钟
      //传入unix时间戳时间为
      initData: [
        +new Date() - 60 * 1000 * 5,
        +new Date(),
      ],
      range: [
        +new Date() - 60 * 1000 * 60,
        +new Date(),
      ]

      // initData: [0, 10],  //开始的区间范围
      // range: [0, 100]     //整体可选的范围
    };
  },
  methods: {
    formatter (ts) {
      return ts2Date(ts, 'YYYY-MM-DD HH:MM')
    }
  },
  mounted () {
  }
};
</script>

<style scoped>
.hello {
  width: 600px;
  margin: 0 auto;
  font-size: 14px;
}
</style>
