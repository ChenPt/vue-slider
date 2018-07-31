<template>
    <div class="hello">
        <slider-custom v-model="initData"
            :range="range"
            :verbose="true"
            :formatter="formatter">
        </slider-custom>
        <div>
          {{ initData }}
        </div>
    </div>
</template>

<script>
import sliderCustom from "./slider";
import { toUnixTime, ts2Date } from "../utils/time.js";

export default {
  name: "test",
  components: {
    slider
  },
  data () {
    return {
      //相差十五分钟
      //传入unix时间戳时间为
      initData: [
        toUnixTime(+new Date()) - 60 * 60 * 30,
        toUnixTime(+new Date()) - 60 * 60 * 20
      ],
      range: [
        toUnixTime(+new Date()) - 60 * 60 * 60,
        toUnixTime(+new Date())
      ]

      // initData: [0, 10],  //开始的区间范围
      // range: [0, 100]     //整体可选的范围
    };
  },
  methods: {
    formatter (num) {
      return ts2Date(num)
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
}
</style>
