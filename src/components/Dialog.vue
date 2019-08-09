<template>
  <div>
    <transition name='msgbox-fade'>
      <div v-show='visible' class='msg-box' :style="{ top: topBox }">
        <div class="msg-box-title">
          <div class="msg-box-title-content">{{title}}</div>
          <div class="msg-box-title-icon" @click="cancel">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABxElEQVRoQ+2YQXKDMAxF5V60yYp2QRpOEHIC0rBoWYVetO5Awgwh2JLtr2HSga1j+z99WXZk6Mk/8+T6aQVY2sHVgdWBxAj8/xSqzl8bY14uXaAMUfmRZ8fEoHmnf9bNwRKV3Y+s/d0Wu/fWN4F14FQ39m4Ba9v97m2rAXE6f1/ImM147X2eeTWGA1xDA4eYE99tlQxQ1U1piA4PEQdCuMRbomORZ306uT7WgW5iVTetIXrVgPCI/yny7C6d5iBEAFoQqeJvhUV+HJFOIMQHA6CcQImPAkiFQIqPBoiFQItPAgiF0BCfDCCF0BIPAeAg+ho3eR70lzmRqM5zNVJ8D3ALOUvszESUeJgDg0YJBFI8HMCbTsC0GZsKS6FhUdeB7ceBD8BhPyiAV/ywIxgCBiASrwABAfDV+dtBU3mKQw6x5JJCvmKnVTnJAYl4tsQmnologBDxmhBRADHitSCCAVLEa0AEASDEoyHEAEjxSAgRgIZ4FAQL4GpsIV+VrnsC0th66I0qvSpdEMmtxSkAMvLTW3UOIhlg3F6XWMr9c+PGxykLaa9zGy49zh7ipQVy+68AXIS0x1cHtCPMrb86wEVIe/wPpzJoQJp7C8wAAAAASUVORK5CYII=" alt="">
          </div>
        </div>
        <div class="msg-box-content">
          <slot></slot>
        </div>
        <div class="msg-box-action">
          <div v-show="showCancelButton" @click="cancel" class="msg-box-action-cancel">{{ cancelButtonText }}</div>
          <div @click="confirm" class="msg-box-action-confirm">{{ confirmButtonText }}</div>
        </div>
      </div>
    </transition>
    <div class="msg-box-modal" v-show='visible && boxShowModel'></div>
  </div>
</template>

<script>
  export default {
    name: 'Dialog',
    props: {
      // 显示or隐藏
      boxVisible: Boolean,
      // 标题
      boxTitle: {
        type: String,
        default: '提示'
      },
      // 是否显示取消按钮
      showCancel: {
        type: Boolean,
        default: false
      },
      // 确认按钮文字
      confirmText: {
        type: String,
        default: '确定'
      },
      // 取消按钮文字
      cancelText: {
        type: String,
        default: '取消'
      },
      // box距浏览器顶部距离
      boxTop: {
        type: String,
        default: '20%'
      },
      // 是否显示modal
      showModel: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        visible: this.boxVisible,
        topBox: this.boxTop,
        title: this.boxTitle,
        showCancelButton: this.showCancel,
        boxShowModel: this.showModel,
        confirmButtonText: this.confirmText,
        cancelButtonText: this.cancelText
      };
    },
    methods: {
      cancel(){
        this.visible = false;
        // 取消事件
        this.$emit('cancel','点击了cancel');
      },
      confirm(){
        this.visible = false;
        // 确认事件
        this.$emit('confirm','点击了confirm');
      }
    },
    watch: {
      boxTop(curVal,oldVal){
        this.topBox = curVal;
      },
      boxVisible(curVal,oldVal){
        this.visible = curVal
      },
      boxTitle(curVal,oldVal){
        this.title = curVal
      },
      showCancel(curVal,oldVal){
        this.showCancelButton = curVal
      },
      confirmText(curVal,oldVal){
        this.confirmButtonText = curVal
      },
      cancelText(curVal,oldVal){
        this.cancelButtonText = curVal
      }
    }
  }
</script>


<style scoped>
  .msg-box-modal{
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background: rgba(0,0,0,.6);
    z-index: 9998;
  }
  .msg-box {
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
  
  .msg-box-title{
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    padding: 15px;
  }
  .msg-box-title-content{
    text-align: left;
    font-size: 18px;
    line-height: 1;
    color: #303133;
  }
  .msg-box-title-icon{
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
  .msg-box-title-icon img{
    width: 100%;
    height: 100%;
    display: block;
  }
  .msg-box-content{
    font-size: 14px;
    padding: 0px 15px;
    color: #606266;
  }
  .msg-box-action{
    display: flex;
    justify-content: flex-end;
    padding: 15px;
  }
  .msg-box-action-cancel{
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
  .msg-box-action-cancel:hover{
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  }
  .msg-box-action-confirm{
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
  .msg-box-action-confirm:hover{
    background: #66b1ff;
    border-color: #66b1ff;
    color: #fff;
  }
  
  .msgbox-fade-enter-active {
    -webkit-animation: msgbox-fade-in .3s;
    animation: msgbox-fade-in .3s
  }
  
  .msgbox-fade-leave-active {
    -webkit-animation: msgbox-fade-out .3s;
    animation: msgbox-fade-out .3s
  }
  
  
  @keyframes msgbox-fade-in {
    0% {
      transform: translate(-50%, -20px);
      opacity: 0
    }
    100% {
      transform: translate(-50%, 0);
      opacity: 1
    }
  }
  
  
  @keyframes msgbox-fade-out {
    0% {
      transform: translate(-50%, 0);
      opacity: 1
    }
    100% {
      transform: translate(-50%, -20px);
      opacity: 0
    }
  }
</style>