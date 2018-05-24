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

## 问题
目前组件的写法，传入数据只支持数字（时间戳也是数字）

## TODO

- [x] 完成基本的样式和支持数字数据(传入UNIX时间戳)
- [ ] 支持其他数据格式

