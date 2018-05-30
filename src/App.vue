<template>
  <div id="app">
    <!-- <test></test> -->
    <vdemo>123</vdemo>
  </div>
</template>

<script>
import test from './components/test'
import vdemo from './components/vuexDemo'

export default {
  name: 'App',
  components: {
    test,
    vdemo
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
