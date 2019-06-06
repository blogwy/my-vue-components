<template>
  <div>
    <transition name='alert-fade'>
      <div v-show='visible' class='alert' ref="alert" :style="{ top: boxTop }">
        <div class="alert-title">
          <div class="alert-title-content">{{title}}</div>
          <div class="alert-title-icon" @click="cancel">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABxElEQVRoQ+2YQXKDMAxF5V60yYp2QRpOEHIC0rBoWYVetO5Awgwh2JLtr2HSga1j+z99WXZk6Mk/8+T6aQVY2sHVgdWBxAj8/xSqzl8bY14uXaAMUfmRZ8fEoHmnf9bNwRKV3Y+s/d0Wu/fWN4F14FQ39m4Ba9v97m2rAXE6f1/ImM147X2eeTWGA1xDA4eYE99tlQxQ1U1piA4PEQdCuMRbomORZ306uT7WgW5iVTetIXrVgPCI/yny7C6d5iBEAFoQqeJvhUV+HJFOIMQHA6CcQImPAkiFQIqPBoiFQItPAgiF0BCfDCCF0BIPAeAg+ho3eR70lzmRqM5zNVJ8D3ALOUvszESUeJgDg0YJBFI8HMCbTsC0GZsKS6FhUdeB7ceBD8BhPyiAV/ywIxgCBiASrwABAfDV+dtBU3mKQw6x5JJCvmKnVTnJAYl4tsQmnologBDxmhBRADHitSCCAVLEa0AEASDEoyHEAEjxSAgRgIZ4FAQL4GpsIV+VrnsC0th66I0qvSpdEMmtxSkAMvLTW3UOIhlg3F6XWMr9c+PGxykLaa9zGy49zh7ipQVy+68AXIS0x1cHtCPMrb86wEVIe/wPpzJoQJp7C8wAAAAASUVORK5CYII=" alt="">
          </div>
        </div>
        <div class="alert-content">
          {{content}}
        </div>
        <div class="alert-action">
          <div v-show="showCancelButton" @click="cancel" class="alert-action-cancel">{{ cancelButtonText }}</div>
          <div @click="confirm" class="alert-action-confirm">{{ confirmButtonText }}</div>
        </div>
      </div>
    </transition>
    <div class="modal" v-show='showModel'></div>
  </div>
</template>

<script>
  export default {
    name: 'MessageBox',
    data() {
      return {
        // 显示or隐藏
        visible: false,
        // 内容
        content: '',
        // box距离浏览器顶部距离
        boxTop : '20%',
        // alter标题
        title: '标题名称',
        // 是否显示取消按钮
        showCancelButton: null,
        // 是否显示model
        showModel: null,
        // 取消确定文字
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      };
    },
    methods: {
      cancel(){
        this.visible = false;
        this.showModel = false;
        this.callback('cancel');
      },
      confirm(){
        this.visible = false;
        this.showModel = false;
        this.callback('confirm');
      }
    },
    watch:{
      showModel(cur,old){
        console.log(cur);
      }
    }
  }
</script>


<style scoped>
  .modal{
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background: rgba(0,0,0,.6);
    z-index: 9998;
  }
  .alert {
    position: fixed;
    left:50%;
    transform: translateX(-50%);
    word-wrap:break-word;
    z-index:9999;
    font-size: 16px;
    max-width:80%;
    border-radius: 5px;
    background: #fff;
    overflow: hidden;
  }
  .alert-fade-enter-active {
    -webkit-animation: alert-fade-in .3s;
    animation: alert-fade-in .3s
  }
  
  .alert-fade-leave-active {
    -webkit-animation: alert-fade-out .3s;
    animation: alert-fade-out .3s
  }
  
  
  @keyframes alert-fade-in {
    0% {
      transform: translate(-50%, -20px);
      opacity: 0;
    }
    100% {
      transform: translate(-50%, 0);
      opacity: 1;
    }
  }
  
  
  @keyframes alert-fade-out {
    0% {
      transform: translate(-50%, 0);
      opacity: 1
    }
    100% {
      transform: translate(-50%, -20px);
      opacity: 0
    }
  }
  .alert-title{
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    width: 420px;
    padding: 15px;
  }
  .alert-title-content{
    text-align: left;
    font-size: 18px;
    line-height: 1;
    color: #303133;
  }
  .alert-title-icon{
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
  .alert-title-icon img{
    width: 100%;
    height: 100%;
    display: block;
  }
  .alert-content{
    font-size: 14px;
    padding: 0px 15px;
    color: #606266;
  }
  .alert-action{
    display: flex;
    justify-content: flex-end;
    padding: 15px;
  }
  .alert-action-cancel{
    width: 52px;
    line-height: 2.2;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    outline: none;
    border-radius: 4px;
    text-align: center;
    cursor: pointer;
    font-size: 13px;
  }
  .alert-action-cancel:hover{
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  }
  .alert-action-confirm{
    margin-left: 10px;
    width: 52px;
    line-height: 2.2;
    color: #fff;
    background-color: #409eff;
    border: 1px solid #409eff;
    outline: none;
    border-radius: 4px;
    text-align: center;
    cursor: pointer;
    font-size: 13px;
  }
  .alert-action-confirm:hover{
    background: #66b1ff;
    border-color: #66b1ff;
    color: #fff;
  }
</style>