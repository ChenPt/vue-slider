 <template>
  <div id="app">
    <div class="hello">
      <slider-custom
        v-model="initData"
        :range="range"
        :formatter="formatter">
      </slider-custom>
    </div>
  </div>
</template>

<script>
import sliderCustom from './components/slider'
import { ts2Date, toUnixTime } from './utils'

export default {
  name: 'App',
  components: {
    sliderCustom
  },
  created () {
  },
  data () {
    return {
      initData: [
        toUnixTime(+new Date() - 60 * 1000 * 5),
        toUnixTime(+new Date()),
      ],
      range: [
        toUnixTime(+new Date() - 60 * 1000 * 60),
        toUnixTime(+new Date()),
      ]
    }
  },
  methods: {
    formatter (ts) {
      return ts2Date(ts, 'YYYY/MM/DD hh:mm')
    }
  }
}
</script>

<style lang="less" scoped>
.hello {
  width: 600px;
  margin: 0 auto;
  font-size: 14px;
}
</style>

