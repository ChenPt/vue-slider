<template>
  <div id="app">
    <test></test>
  </div>
</template>

<script>

import test1 from './components/test1'
import test from './components/test'

export default {
  name: 'App',
  components: {
    test
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
