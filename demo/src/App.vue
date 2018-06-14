<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div style="width: 200px;">
      <wy-radiogroup v-model="radioData">
        <wy-radio>正确</wy-radio>
        <wy-radio>错误</wy-radio>
      </wy-radiogroup>
    </div>
    <div>
      <button @click="showToast">Toast</button>
    </div>
    
    <div>
      <wy-upload @imglist="getImages" ref="upload"></wy-upload>
    </div>
  </div>
</template>

<script>
  import radio from './components/Radio.vue'
  import radiogroup from './components/RadioGroup.vue'
  import Toast from './utils/toast.js'
  import upload from '@/components/upLoad';
export default {
  name: 'App',
  data() {
    return {
      radioData: '',
      imagesList: []
    }
  },
  components: {
    wyRadio: radio,
    wyRadiogroup: radiogroup,
    wyUpload: upload
  },
  methods: {
    showToast(){
      // 默认中间 2秒
      Toast('这是一个Toast!')
      
      // message string类型
      // position string 可选值 top middle bottom
      // duration number 单位毫秒
      
//      Toast({
//        message: '这是一个Toast!',
//        position: 'top',
//        duration: 3000
//      })
    },
    getImages(list){
      console.log(list);
      this.imagesList = list
    }
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
