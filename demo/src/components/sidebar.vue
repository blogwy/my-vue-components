<template>
  <div id="sidebar">
    <div :class="['sidebar',sidebarFlag ? '':'sidebar-hide']">
      <div :class="['sidebar-bar',sidebarFlag ? '':'sidebar-bar-hide']">
        <i v-if="sidebarFlag" style="flex: 5"></i>
        <i class="iconfont icon-leimupinleifenleileibie icon-menu" v-on:click="toggleSidebar"></i>
      </div>
      <div v-for="(item,index) in sider">
        <div :class="['sidebar-item', currentIndex === index ? 'is-open': '', sidebarFlag ? '':'sidebar-item-hide']"
             v-on:click="openSidebar(index)">
          <i :class="['iconfont',item.icon,'icon']"></i>
          <span v-if="sidebarFlag" class="title">{{ item.title }}</span>
          <i v-if="sidebarFlag" class="iconfont icon-54 icon-arrow"></i>
        </div>
        <div v-if="sidebarFlag" class="sidebar-item-ul">
          <div class="sidebar-item-li" v-for="menu in item.test">
            <div class="icon"></div>
            <div class="title">
              {{menu}}
            </div>
            <div class="icon-arrow"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'sidebar',
    data() {
      return {
        sider: [
          {
            icon: 'icon-yemian-copy-active',
            title: '主页',
            active: false
          },
          {
            icon: 'icon-gouwuche',
            title: '账户',
            active: true,
            test: [
                '账户添加',
                '账户删除',
                '账户注销',
                '账户设置'
            ]
          },
          {
            icon: 'icon-play',
            title: '登记',
            active: false
          },
          {
            icon: 'icon-wode',
            title: '帮助',
            active: false
          }
        ],
        currentIndex: null,
        sidebarFlag: true
      }
    },
    methods:{
      openSidebar(index){
        console.log(index);
        if (this.currentIndex !== index){
          this.currentIndex = index;
        }else {
          this.currentIndex = null;
        }
        
      },
      toggleSidebar(){
        if (this.sidebarFlag){
          this.sidebarFlag = false;
        }else {
          this.sidebarFlag = true;
        }
      }
    },
    mounted(){
      document.body.addEventListener('touchstart',function () {})
    }
  }
</script>
<style scoped>
  .sidebar{
    box-sizing: border-box;
    width: 240px;
    box-shadow: 2px 2px 6px rgba(0,0,0,.3);
    transition: width .3s;
  }
  .sidebar-hide{
    width: 56px;
    transition: width .3s;
  }
  .sidebar-bar{
    display: flex;
    padding: 0px 20px;
    line-height: 56px;
    cursor: pointer;
  }
  .sidebar-bar-hide{
    padding: 0px;
  }
  .icon-menu{
    box-sizing: border-box;
    flex: 1;
    font-size: 18px;
    /*padding: 5px;*/
    color: #909399;
    text-align: center;
    transition: border-color .3s,background-color .3s,color .3s;
  }
  .icon-menu:hover{
    background: #ecf5ff;
  }
  .sidebar-item{
    display: flex;
    padding: 0px 20px;
    line-height: 56px;
    cursor: pointer;
    transition: border-color .3s,background-color .3s,color .3s;
  }
  .sidebar-item-hide{
    padding: 0px;
  }
  .sidebar-item:hover{
    background: #ecf5ff;
  }
  .icon{
    flex: 1;
    font-size: 18px;
    color: #909399;
    text-align: center;
  }
  .title{
    flex: 4;
    font-size: 14px;
    color: #555555;
  }
  .icon-arrow{
    flex: 1;
    font-size: 12px;
    color: #909399;
    text-align: center;
    transition: transform .3s;
  }
  .is-open>.icon-arrow{
    transform: rotate(180deg);
  }
  .sidebar-item-ul{
    flex: none;
    width: 100%;
    height: 0px;
    transition: .3s height ease-in-out;
  }
  .sidebar-item-li{
    display: flex;
    padding: 0px 20px;
    height: 0px;
    align-items: center;
    cursor: pointer;
    opacity:0;
    transition: opacity .3s,background-color .3s,height .3s;
  }
  .sidebar-item-li:hover{
    background: #ecf5ff;
  }
  .sidebar-item-li:active{
    background: #ecf5ff;
  }
  .is-open + .sidebar-item-ul{
    display: block;
    height: 100%;
  }
  .is-open + .sidebar-item-ul>.sidebar-item-li{
    opacity:1;
    height: 50px;
  }
</style>