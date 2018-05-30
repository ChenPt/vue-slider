<template>
  <div>
    <button @click="add(1)">ADD</button>
    <button @click="sub(1)">SUB</button>
    <div>count: {{ count }}</div>
    <input type="text" :value="userName" @input="updateInfo($event.target.value)">
    <p>Name: {{ userName }}</p>
    <p>{{ isDone }}</p>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'vdemo',
  data(){
    return {

    }
  },
  methods: {
    ...mapActions({
      add: 'addAsync',
      sub: 'subAsync',
      updateInfo: 'updateInfo'
    })
  },
  computed: {
    ...mapState([
      'count',
      'userName'
    ]),
    ...mapGetters([
      'isDone'
    ])
  },
  mounted() {
    window.data = this;
  },
  beforeUpdate() {
    
  } 
}
</script>

<style scoped>

</style>

