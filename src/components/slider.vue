<template>
	<div class="container">
		<div
			class="wrap-box"
			id="wrapBox"
			ref="wrap_box"
			v-on:click.self="changePos($event)">
			<div
				class="in-box"
				id="inBox"
				v-on:mousedown.prevent.self="down($event)"
				:style="{width: `${inter.width}px`,left: `${wrap.offsetX}px`}"
				ref="in_box">
				<div
					class="left-ctrl"
					id="lCtrl"
					v-on:mousedown.prevent.self="down($event)">
					<div class="tip left-tip">{{ transfer(initData[0]) }}</div>
				</div>
				<div
					class="right-ctrl"
					id="rCtrl"
					v-on:mousedown.prevent.self="down($event)">
					<div class="tip right-tip">{{ transfer(initData[1]) }}</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
//将时间转化为宽度，用以CSS使用
var PER;
import { ts2Date } from '../utils';

export default {
  name: 'sliderCustom',
  model: {
    prop: 'initData',
    event: 'updateVal'
  },
  props: {
    initData: {
      type: Array
    },
    range: {
      type: Array
    },
    verbose: {
      type: Boolean,
      default: false
    },
    formatter: {
      type: Function | null,
      default: (n) => {
        return n
      }
    }
  },
  data () {
    return {
      isActive: false,
      isDown: false,	//是否已经点击
      down_target: '', //点击的目标
      isOut: false,	//是否出界
      begin: 0,	//按下鼠标时的坐标
      down_width: 0, //保存按下鼠标时内部滑块的宽度
      //真正的值.
      val: {
        left: 0,
        right: 0,
        actual_val: 0
      },
      //滑块的属性
      inter: {
        l_x: 0,
        r_x: 0,
        width: 0,
        initData: 0,
      },
      //整个可选区域的属性
      wrap: {
        left: 0,
        width: 0,
        offsetX: 0,
        initData: 0,
      },
      left_limit: 0,
      right_limit: 0,
      ts2Date: ts2Date,
      tipVisible: false
    }
  },
  methods: {
    init () {
      this.wrap.width = this.$refs.wrap_box.getBoundingClientRect().width;
      this.wrap.initData = this.range[1] - this.range[0];
      PER = this.wrap.initData / this.wrap.width;	//PER根据传入的数据来自定义

      this.inter.initData = this.initData[1] - this.initData[0];
      this.inter.l_x = (this.initData[0] - this.range[0]) / PER;  //单位为px
      this.inter.r_x = (this.initData[1] - this.range[0]) / PER;	//单位为px
      this.inter.width = (this.initData[1] - this.initData[0]) / PER; //单位为px

      this.wrap.left = this.inter.l_x;
      this.wrap.offsetX = this.inter.l_x;
      this.val.right = this.inter.initData + this.inter.l_x;
      this.val.left = this.inter.l_x;
      this.val.actual_val = this.val.right - this.val.left;
      this.down_width = this.inter.width;

      this.right_limit = this.wrap.width;  //以px为单位
      this.left_limit = 0;
    },
    down (e) {
      let target = e.target.id;
      this.on(window, 'mousemove', this.moveHandler);
      this.on(window, 'mouseup', this.upHandler);
      this.begin = e.pageX;
      this.down_target = target;
      this.isDown = true
    },
    changePos (e) {
      let mid_x = e.offsetX;
      let half_width = this.inter.width / 2;
      let right_limit = this.right_limit;
      let left_limit = this.left_limit;
      let compareVal = (mid_x > this.inter.r_x) ? mid_x + half_width : mid_x - half_width;
      let limit_status = this.isCross(compareVal, left_limit, right_limit);

      this.isActive = true
      if (this.isOut == false) {
        if (limit_status == 0) {
          this.inter.l_x = mid_x - half_width;
          this.inter.r_x = mid_x + half_width;
          this.wrap.left = this.wrap.offsetX = this.inter.l_x;
        }
        if (limit_status == 1) {
          this.wrap.left = this.wrap.offsetX = this.inter.l_x = left_limit;
          this.inter.r_x = this.inter.l_x + this.inter.width;
        }
        if (limit_status == 2) {
          this.inter.r_x = right_limit;
          this.wrap.offsetX = right_limit - this.inter.width;
          this.wrap.left = this.inter.l_x = this.wrap.offsetX;
        }
        this.computeVal()
        this.$nextTick(() => {
          this.isActive = false
        })
      }
    },
    upHandler () {
      this.isDown = false;
      //释放事件监听器
      this.off(window, 'mousemove', this.moveHandler);
      this.off(window, 'mouseup', this.upHandler);
      this.inter.l_x = this.wrap.offsetX;	//释放鼠标后，确定当前左控制块的坐标
      this.wrap.left = this.wrap.offsetX;	//释放鼠标后，确定当前滑块的坐标
      this.inter.r_x = this.inter.width + this.wrap.left;	//释放鼠标后，确定当前右控制块的坐标
      this.down_width = this.inter.width;  //释放鼠标后，将当前的内部滑块的宽度作为下次点击时内部滑块的宽度.
      this.from_move = true;
    },
    moveHandler (e) {
      let offset = e.pageX - this.begin;
      if (this.isDown && this.down_target == 'rCtrl') {
        let right_limit_width = this.wrap.width;
        let left_limit_width = this.inter.l_x;
        let limit_status = this.isCross(this.wrap.left + this.down_width + offset, left_limit_width, right_limit_width);
        this.isOut = !!limit_status;
        if (limit_status == 0) {
          this.inter.width = offset + this.down_width;	//修改内部滑块的宽度
          this.inter.r_x = this.inter.width + this.wrap.left;
        }
        if (limit_status == 2) {
          this.inter.width = right_limit_width - this.wrap.left;
          this.inter.r_x = this.inter.width + this.wrap.left;
        }
        if (limit_status == 1) {
          this.inter.r_x = left_limit_width;
          this.inter.width = this.inter.r_x - this.inter.l_x;
        }
      }
      if (this.isDown && this.down_target == 'lCtrl') {
        let left_limit_width = this.left_limit;
        let right_limit_width = this.inter.r_x;
        let limit_status = this.isCross(this.wrap.left + offset, left_limit_width, right_limit_width);
        this.isOut = !!limit_status;
        if (limit_status == 0) {
          this.wrap.offsetX = this.wrap.left + offset;
          this.inter.width = this.down_width - offset;
          this.inter.l_x = this.wrap.offsetX;
        }
        if (limit_status == 1) {
          this.wrap.offsetX = left_limit_width;
          this.inter.width = right_limit_width;
          this.inter.l_x = this.wrap.offsetX;
        }
        if (limit_status == 2) {
          this.inter.l_x = this.inter.r_x;
          this.wrap.offsetX = this.inter.l_x;
          this.inter.width = this.inter.r_x - this.inter.l_x;
        }

      }
      if (this.isDown && this.down_target == "inBox") {
        //判断滑块的越界情况
        let left_limit_width = this.left_limit;
        let right_limit_width = this.right_limit - this.inter.width;
        let limit_status = this.isCross(this.wrap.left + offset, left_limit_width, right_limit_width);
        this.isOut = !!limit_status;
        if (limit_status == 1) {
          this.wrap.offsetX = left_limit_width;
          this.inter.r_x = left_limit_width + this.inter.width;
        }
        if (limit_status == 2) {
          this.wrap.offsetX = right_limit_width;
          this.inter.r_x = right_limit_width + this.inter.width;
        }
        if (limit_status == 0) {
          this.wrap.offsetX = this.wrap.left + offset;
          this.inter.r_x = this.wrap.offsetX + this.inter.width;
        }
        this.inter.l_x = this.wrap.offsetX;
      }
      this.computeVal()
    },
    /**
     * @return  0: 未越界 1：左越界 2：右越界
    */
    isCross (val, left_limit, right_limit) {
      if (val < left_limit) {
        return 1
      } else if (val > right_limit) {
        return 2
      } else {
        return 0
      }
    },
    on (e, event, handler) {
      if (document.addEventListener) {
        return e.addEventListener(event, handler, false)
      } else {
        return e.attachEvent('on' + event, handler);
      }
    },
    off (e, event, handler) {
      if (document.removeEventListener) {
        return e.removeEventListener(event, handler, false)
      } else {
        return e.detachEvent('on', event, handler)
      }
    },
    //计算this.val的值，并传给父组件.
    computeVal () {
      this.val.left = this.inter.l_x * PER + this.range[0];
      this.val.right = this.inter.r_x * PER + this.range[0];
      this.val.actual_val = Math.floor(this.val.right - this.val.left)
      //将真实选中数据传给父组件
      this.$emit('updateVal', [Math.floor(this.val.left), Math.floor(this.val.right)])
    },
    transfer (num) {
      if (this.formatter) {
        return this.formatter(num)
      }
      return num
    }
  },
  mounted () {
    this.init();
    this.computeVal()
  },
  computed: {
  }
}
</script>

<style lang="less" scoped>
.wrap-box {
  width: inherit;
  @wrap-color: #2d8cf0;
  position: relative;
  background-color: @wrap-color;
  cursor: pointer;
  &::before, &::after {
    content: '';
    display: block;
    width: 2em;
    background-color: @wrap-color;
    height: 2em;
    border-radius: 50%;
    position: absolute;
    z-index: -1;
  }
  &::before {
    top: 0;
    left: -1em;
  }
  &::after {
    top: 0;
    right: -1em;
  }
  .in-box {
    position: relative;
    top: 0;
    left: 0px;
    height: 2em;
    background-color: rgba(250, 250, 250, 0.3);

    &:hover {
      .tip {
        display: block;
        transition: all ease .3s;
        opacity: 1;
        &.left-tip {
          transform: translate(-110%, -50%);
        }
        &.right-tip {
          transform: translate(110%, -50%);
        }
      }
    }
  }
  .left-ctrl, .right-ctrl {
    display: inline-block;
    position: absolute;
    border-radius: 50% 50%;
    top: 50%;
    width: 2em;
    height: 100%;
    background-color: white;
    cursor: ew-resize;

    &::before {
      content: '';
      display: block;
      position: absolute;
      width: 1em;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 0.7em;
      border-top: 2px solid #bbb;
      border-bottom: 2px solid #bbb;
    }
  }
  .left-ctrl {
    position: relative;
    transform: translate(-50%, -50%);
    left: 0;
  }
  .right-ctrl {
    transform: translate(50%, -50%);
    right: 0;
  }
  .tip {
    @bg-color: rgba(50, 50, 50, 0.7);
    display: none;
    position: absolute;
    top: 50%;
    padding: 2px 8px;
    height: 30px;
    line-height: 30px;
    background-color: @bg-color;
    border-width: 0px;
    border-color: rgb(51, 51, 51);
    border-radius: 4px;
    color: rgb(255, 255, 255);
    opacity: 0;
    white-space: nowrap;

    &::after {
      position: absolute;
      top: 50%;
      content: '';
      border: 6px solid transparent;
      width: 0;
      height: 0;
    }

    &.left-tip {
      left: 0;
      transform: translate(-130%, -50%);
      &::after {
        right: 0;
        border-left-color: @bg-color;
        transform: translate(100%, -50%);
      }
    }
    &.right-tip {
      right: 0;
      transform: translate(130%, -50%);
      &::after {
        left: 0;
        border-right-color: @bg-color;
        transform: translate(-100%, -50%);
      }
    }
  }
}
</style>
