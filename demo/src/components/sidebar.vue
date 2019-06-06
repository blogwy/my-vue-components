<template>
  <div id="sidebar">
    <div :class="['sidebar',sidebarFlag ? '':'sidebar-hide']">
      <div :class="['sidebar-bar',sidebarFlag ? '':'sidebar-bar-hide']">
        <i v-if="sidebarFlag" style="flex: 5"></i>
        <i class="iconfont icon-leimupinleifenleileibie icon-menu" @click="toggleSidebar"></i>
      </div>
      <div v-for="(item,index) in menuFirst">
        <div :class="['sidebar-item', currentSecondIndex === index ? 'is-open': '', sidebarFlag ? '':'sidebar-item-hide']"
             @click.stop="openMenuSecond(index,item.active,item.link)">
          <i :class="['iconfont',item.icon,'icon']"></i>
          <span v-if="sidebarFlag" class="title">{{ item.title }}</span>
          <i v-if="sidebarFlag" :class="['iconfont','icon-54','icon-arrow',item.active ? '': 'hide-color']"></i>
        </div>
        <!--二级菜单-->
        <div v-if="sidebarFlag" class="second-item-ul">
          <div v-for="(secondItem,secondIndex) in item.menuSecond" class="second-item">
            <div :class="['second-item-li',currentThirdIndex === secondIndex ? 'is-open': '', sidebarFlag ? '':'sidebar-item-hide']"
                 @click.stop="openMenuThird(index,secondIndex,secondItem.active,secondItem.link)">
              <div class="icon"></div>
              <div class="title">
                {{secondItem.title}}
              </div>
              <div :class="['iconfont','icon-arrow',secondItem.active ? '': 'hide-color']"></div>
            </div>
            <!--三级菜单-->
            <div v-if="sidebarFlag" class="third-item-ul">
              <div v-for="(thirdItem,thirdIndex) in secondItem.menuThird" class="third-item">
                <div class="third-item-li" @click.stop="openMenuFourth(thirdItem.active,thirdItem.link)">
                  <div class="icon"></div>
                  <div class="title">
                    {{thirdItem.title}}
                  </div>
                  <div :class="['iconfont','icon-arrow',thirdItem.active ? '': 'hide-color']"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'sidebar',
    props: {
      secondIndex: Number,
      thirdIndex: Number
    },
    data() {
      return {
        menuFirst: [
          {
            icon: 'icon-yemian-copy-active',
            title: '主页',
            active: false,
            link: 'home.html'
          },
          {
            icon: 'icon-gouwuche',
            title: '账户',
            active: true,
            menuSecond: [
              {
                icon: '',
                title: '账户添加',
                active: false,
                link: 'home.html'
              },
              {
                icon: '',
                title: '账户删除',
                active: true,
                menuThird: [
                  {
                    icon: '',
                    title: '删除一',
                    active: false,
                    link: 'home.html'
                  },
                  {
                    icon: '',
                    title: '删除二',
                    active: false
                  }
                ]
              },
              {
                icon: '',
                title: '账户注销',
                active: false
              },
              {
                icon: '',
                title: '账户设置',
                active: false
              }
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
        currentSecondIndex: this.secondIndex,
        currentThirdIndex: this.thirdIndex,
        sidebarFlag: true
      }
    },
    methods:{
      openMenuSecond(index,active,link){
        if (this.currentSecondIndex !== index){
          this.currentSecondIndex = index;
          this.currentThirdIndex = null;
        }else {
          this.currentSecondIndex = null;
          this.currentThirdIndex = null;
        }
        if (!active){
          window.location.href = link;
        }
      },
      openMenuThird(index,secondIndex,active,link){
        if (this.currentThirdIndex !== secondIndex){
          this.currentSecondIndex = index;
          this.currentThirdIndex = secondIndex;
        }else {
          this.currentThirdIndex = null;
        }
        if (!active){
          window.location.href = link;
        }
      },
      openMenuFourth(active,link){
        if (!active){
          window.location.href = link;
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
    watch: {
      sidebarFlag(curVal,oldVal){
        this.$emit('sidebar-status', curVal);
      },
    },
    mounted(){
      this.$emit('sidebar-status', this.sidebarFlag);
      let obj = {
        menuFirst: this.menuFirst[this.currentSecondIndex].title,
        menuSecond: this.menuFirst[this.currentSecondIndex].active ? (this.menuFirst[this.currentSecondIndex].menuSecond[this.currentThirdIndex].title) : null
      };
      this.$emit('current-menu',obj);
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
  .sidebar-item > .icon{
    flex: 1;
    font-size: 18px;
    color: #909399;
    text-align: center;
  }
  .sidebar-item > .title{
    flex: 4;
    font-size: 14px;
    color: #555555;
    white-space: nowrap;
  }
  .sidebar-item > .icon-arrow{
    flex: 1;
    font-size: 12px;
    color: #909399;
    text-align: center;
    transition: transform .3s;
  }
  
  .second-item-li > .icon{
    flex: 1;
    font-size: 18px;
    color: #909399;
    text-align: center;
  }
  .second-item-li > .title{
    flex: 6;
    font-size: 14px;
    color: #555555;
    white-space: nowrap;
  }
  .second-item-li > .icon-arrow{
    flex: 1;
    font-size: 12px;
    color: #909399;
    text-align: center;
    transition: transform .3s;
  }
  .is-open>.icon-arrow{
    transform: rotate(180deg);
  }
  .second-item-ul{
    flex: none;
    width: 100%;
    height: 0px;
    transition: .3s height ease-in-out;
  }
  .second-item-li{
    display: flex;
    padding: 0px 20px;
    height: 0px;
    align-items: center;
    cursor: pointer;
    opacity:0;
    transition: opacity .3s,background-color .3s,height .3s;
  }
  .second-item-li:hover{
    background: #ecf5ff;
  }
  .second-item-li:active{
    background: #ecf5ff;
  }
  .is-open + .second-item-ul{
    display: block;
    height: 100%;
  }
  .is-open + .second-item-ul>.second-item>.second-item-li{
    opacity:1;
    height: 50px;
  }
  
  /*三级菜单*/
  .third-item-ul{
    flex: none;
    width: 100%;
    height: 0px;
    transition: .3s height ease-in-out;
  }
  .third-item-li{
    display: flex;
    padding: 0px 20px;
    height: 0px;
    align-items: center;
    cursor: pointer;
    opacity:0;
    transition: opacity .3s,background-color .3s,height .3s;
  }
  .third-item-li:hover{
    background: #ecf5ff;
  }
  .third-item-li:active{
    background: #ecf5ff;
  }
  .is-open + .third-item-ul{
    display: block;
    height: 100%;
  }
  .is-open + .third-item-ul>.third-item>.third-item-li{
    opacity:1;
    height: 50px;
  }
  .third-item-li > .icon{
    flex: 1;
    font-size: 18px;
    color: #909399;
    text-align: center;
  }
  .third-item-li > .title{
    flex: 4;
    font-size: 14px;
    color: #555555;
    white-space: nowrap;
  }
  .third-item-li > .icon-arrow{
    flex: 1;
    font-size: 12px;
    color: #909399;
    text-align: center;
    transition: transform .3s;
  }
  .hide-color{
    color: transparent!important;
  }
</style>