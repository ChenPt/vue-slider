<template>
	<div class="container">
		<p>left: {{left}}</p>
		<p>offsetX: {{offsetX}}</p>
		<p>l_x: {{l_x}}</p>
		<p>r_x:{{r_x}}</p>
		<p>in_Width: {{in_width}}</p>
		<p>leftVal: {{val.left}}</p>
		<p>rightVal: {{val.right}}</p>
		<p>actualVal: {{val.actual_val}}</p>
		<div 
			class="wrap_box" 
			id="wrapBox"
			ref="wrap_box" 
			v-on:click.self="changePos($event)"
		>
			<div 
				class="in_box"
				id="inBox" 
				v-on:mousedown.prevent="down($event)"
				:style="{width: `${in_width}px`,left: `${offsetX}px`}" 
				ref="in_box">
			</div>
			<div 
				class="left ctrl_icon"
				:style="`left: ${l_x}px`"
				v-on:mousedown.prevent="down($event)">
				<img src="../assets/ctrl.png" alt="" id="lCtrl">
			</div>
			<div 
				class="right ctrl_icon"
				:style="`left: ${r_x}px`"
				v-on:mousedown.prevent="down($event)">
				<img src="../assets/ctrl.png" alt="" id="rCtrl">
			</div>

		</div>

	</div>
</template>
<script>
	//将时间转化为宽度，用以CSS
	const PER = 10;
	
	export default {
		name: 'drag',
		model: {
			prop: 'time',
			event: 'updateVal'
		},
		props: {
			time: {
				type: Array
			},
			range: {
				type: Array
			},
			all_time: {
				// 一个单位代表1s，默认值为1小时，最大为24小时
				type: Number,
				default: 60,
				validator(val) {
					return val > 0 && val < 24 * 60
				}
			},
			in_time: {
				//内部滑块所代表的时间,默认值为15分钟，最大为24小时
				type: Number,
				default: 30,
				validator(val) {
					return val > 0 && val < 24 * 60
				}
			},
		},
		data() {
			return {
				l_x:  (this.time[1] - this.time[0] ),	//左控制块的位置坐标
				r_x: (this.in_time + this.init_left) * PER,	//右控制块的位置坐标
				left: this.init_left * PER,		//初始位置
				wrap_width: 0,	//外部容器的初始宽度
				in_width: (this.time[1] - this.time[0] ),	//内部滑块的初始宽度
				down_width: this.in_time * PER, //保存按下鼠标时内部滑块的宽度
				offsetX: this.init_left * PER,	//整个滑块的偏移量
				isDown: false,	//是否已经点击
				down_target: '', //点击的目标
				isOut: false,	//是否出界
				begin: 0,	//按下鼠标时的坐标	
				val: {
					left: this.init_left,
					right: this.in_time + this.init_left,
					actual_val: this.in_time
				},
				left_limit: 0,
				right_limit: this.all_time
			}
		},
		methods: {
			down(e) {
				let target = e.target.id;

				this.on(window, 'mousemove', this.moveHandler);
				this.on(window, 'mouseup',this.upHandler);
				this.begin = e.pageX;
				this.down_target= target;
				this.isDown = true;
				console.log("down, begin from",target);
			},
			changePos(e) {
				let mid_x = e.offsetX;
				let half_width = this.in_width / 2;
				let right_limit = this.right_limit * PER;
				let left_limit = this.left_limit * PER;
				let compareVal = (mid_x > this.r_x) ? mid_x + half_width : mid_x - half_width;
				let limit_status = this.isCross(compareVal, left_limit, right_limit);

				if(limit_status == 0) {
					this.l_x = mid_x - half_width;
					this.r_x = mid_x + half_width;
					this.left = this.offsetX = this.l_x;
				}
				if(limit_status == 1) {
					this.left = this.offsetX = this.l_x = left_limit;
					this.r_x = this.l_x + this.in_width;
				}
				if(limit_status == 2) {
					this.r_x = right_limit;
					this.offsetX = right_limit - this.in_width;
					this.left = this.l_x = this.offsetX;
				}
				this.computeVal()
			},
			upHandler() {
				this.isDown = false;
				//释放事件监听器
				this.off(window, 'mousemove', this.moveHandler);
				this.off(window, 'mouseup',this.upHandler);
				this.l_x = this.offsetX;	//释放鼠标后，确定当前左控制块的坐标
				this.left = this.offsetX;	//释放鼠标后，确定当前滑块的坐标
				this.r_x = this.in_width + this.left;	//释放鼠标后，确定当前右控制块的坐标
				this.down_width = this.in_width;  //释放鼠标后，将当前的内部滑块的宽度作为下次点击时内部滑块的宽度.

			},
			moveHandler(e) {
				let offset = e.pageX - this.begin;

				if(this.isDown && this.down_target == 'rCtrl') {
					let right_limit_width = this.wrap_width;
					let left_limit_width = this.l_x;
					let limit_status = this.isCross(this.left + this.down_width + offset, left_limit_width, right_limit_width);
					
					if(limit_status == 0) {
						this.in_width = offset + this.down_width;	//修改内部滑块的宽度
						this.r_x = this.in_width + this.left;
					}
					if(limit_status == 2) {
						this.in_width = right_limit_width - this.left;
						this.r_x = this.in_width + this.left;
					}
					if(limit_status == 1) {
						this.r_x = left_limit_width;
					}
				}

				if(this.isDown && this.down_target == 'lCtrl') {
					let left_limit_width = this.left_limit * PER;
					let right_limit_width = this.r_x;
					
					let limit_status = this.isCross(this.left + offset, left_limit_width, right_limit_width);

					if(limit_status == 0) {
						this.offsetX = this.left + offset;
						this.in_width = this.down_width - offset;
						this.l_x = this.offsetX;
					}
					if(limit_status == 1) {
						this.offsetX = left_limit_width;
						this.in_width = right_limit_width;
						this.l_x = this.offsetX;
					}
					if(limit_status == 2) {
						
					}
					
				}

				if(this.isDown && this.down_target == "inBox") {
					//判断滑块的越界情况
					let left_limit_width = this.left_limit * PER;
					let right_limit_width = this.right_limit * PER - this.in_width;
					let limit_status = this.isCross(this.left + offset, left_limit_width, right_limit_width);

					if(limit_status == 1) {
						this.offsetX = left_limit_width;
						this.r_x =	 left_limit_width + this.in_width;
					}
					if(limit_status == 2) {
						this.offsetX = right_limit_width;
						this.r_x =	 right_limit_width + this.in_width;
					}
					if(limit_status == 0) {
						this.offsetX = this.left + offset;
						this.r_x = this.offsetX + this.in_width;
					}	

					this.l_x = this.offsetX;
				}

				this.computeVal()

			},

			
			/**
			 * @param {number} val
			 * @param {number} left_limit
			 * @param {number} right_limit
			 * @return  0: 未越界 1：左越界 2：右越界
			*/
			isCross(val, left_limit, right_limit) {
				// console.log("val", val)
				// console.log("left_limit", left_limit)
				// console.log("right_limit", right_limit)
				if(val < left_limit) {
					return 1  
				} else if(val > right_limit){
					return 2	
				} else {
					return 0	
				}
			},
			on(e, event, handler) {
				if(document.addEventListener) {
					return e.addEventListener(event, handler, false)
				} else {
					return e.attachEvent('on' + event, handler);
				}
			},
			off(e, event, handler) {
				if(document.removeEventListener) {
					console.log("remove")
					return e.removeEventListener(event, handler, false)
				} else {
					return e.detachEvent('on', event, handler)
				}
			},
			//更新this.val的值，并传给父组件.
			computeVal() {
				this.val.left =this.l_x / PER
				this.val.right = this.r_x / PER
				this.val.actual_val = Math.floor(this.val.right - this.val.left)
				this.$emit('updateVal', [this.val.left, this.val.right])
			}
		},
		beforeCreate() {
			window.data = this;
		},
		mounted() {
			this.computeVal()
			this.wrap_width = this.$refs.wrap_box.getBoundingClientRect().width;
			console.log(this.time);
		},
		computed: {
		}
	}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.wrap_box {
		position: relative;
		left: 200px;
		background-color: skyblue;
	}

	.wrap_box {
		cursor: pointer;
	}
	.in_box {
		position: relative;
		top: 0;
		left: 0px;
		height: 50px;
		background-color: rgba(250, 250, 250, .3);
		border-radius: 5px 5px;
	}

	.in_box:hover {
		cursor: ew-resize;
	}

	.in_box::before {
	}

	.left, .right {
		position: absolute;
		top: 50%;
		transform: translate(-50%, -50%);
		display: inline-block;
	}

	.ctrl_icon  img{
		cursor: ew-resize;
		vertical-align: middle;
		width: 20px;
	}

	.ctrl_container {
		position: relative;
	}

	.container {
		padding-bottom: 200px;
	}
</style>
