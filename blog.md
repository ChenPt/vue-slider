# 记录bug

监听事件一开始是全部绑定在各自的元素上的，比如，

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

- [x] ss
- [ ] aa
