# 记录bug

mouseover的需要绑定到document上，监听区域尽可能的大，同理，mouseup也是。
只有mousedown需要绑定在特定的元素上。
当一个元素绑定了down事件，其子元素也绑定了down事件，需要设置只有target是当前元素才触发，可以为v-on:mousedown设置.self

## 时间戳

unix的时间戳 精准度是s
JS的时间戳 精准度是ms


## 一个元素hover来控制其他元素的样式

hover元素和被控制元素必须是有关系的。
如父子关系，前后关系，后代关系

一般被控制元素都是hover元素的后代或者相邻接的元素  

后代选择器，子元素选择器，相邻兄弟选择器
``` css

.div:hover .other {
    display: block;
}

.div:hover > .other {
    display: block;
}

.div:hover + .other {
    display: block;
}

```

## 自定义v-model

``` javascript

<input v-model="hello">
//等价于
<input 
    v-bind:value="hello"
    v-on:input="input(e.target.value)"
>
```

原本是采用普通的this.$emit 和on来进行父子组件的通信，后面采用了自定义组件v-model，
``` javascript
// test.vue
<my-component v-model="initData" :range="range"></mycomponent>

//my-component

export default {
    name: 'my-component',
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
        }
    },
    methods: {
        DoSomeThing() {
            //....
            //....
            this.$emit('updateVal', updatedData) // updatedData的数据格式需要跟initData的type一样.
        }
    }
}
```

## 组件自适应宽度问题

组件宽度由引用它的父组件来决定，在父组件里，用一个div包裹组件，给div设置宽度，组件的宽度自适应为div的宽度，
因为需要动态改变滑块的位置，所以需要知道wrap的宽度，可以通过`this.$refs.wrap_box.getBoundingClientRect().width`来获取。
$refs是一个对象，所有有ref属性的dom元素都存在于refs对象里，需要在HTML设置`ref="wrap_box" `，还有就是refs在DOM元素被渲染之前都是访问不到的, 在mounted钩子时才可以访问到。

## less写法好像很简洁...学习了

## 问题
目前组件的写法，传入数据只支持数字（时间戳也是数字）

## TODO

- [x] 完成基本的样式和支持数字数据(传入UNIX时间戳)
- [ ] 支持其他数据格式

## VUEX
`Vue.use(Vuex)` 需要写在vuex的定义文件开头. PS：`@/store/index.js`

然后需要全局引入，
``` javascript
// main.js

import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import store from './store';

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,  
  components: { App },
  template: '<App/>'
})
```

Vuex => 状态管理模式

主要有四个部分，state，mutations，getters，actions, modules

通常情况下，state的改变需要通过mutations的commit来提交(修改state)，mutation是同步的，而actions的commit是commit mutation，并没有直接修改state, action可以写异步代码，getters，是用于对state进行进一步的筛选后再返回筛选后的数据的方法的共用。(让一个处理state的方法可以被各个组件使用，而不需要复写一样的函数多次)


mapState, mapGetters都是写在computed(计算属性里)，两个自带函数返回的都是对象，如果需要将返回的对象与计算属性已有的属性混合，可以使用`...`扩展运算符.

mutations的commit格式`this.$store.commit(type, payload)`或者
```
this.$store.commit({
    type: "MUTATION NAME"
    yourData: "xxxx"
})
```
一般来说,payload是个对象.

mapActions是写在methods里的，action需要在store/index.js里先写好，然后可以在组件使用mapActions来注册actions方法，然后当某个事件发生就调用action(也可以直接写`this.$store.dispatch(name, payload)`)


mutation和getter都接受一个state对象，而action接受的是一个类似state的context对象