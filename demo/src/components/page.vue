<template>
  <div class="page">
    <ul class="page-group">
      <li
          :class="['page-item',{'page-disable':current_page == 1}]"
          @click="prev">上一页</li>
      <li
          class="page-item"
          v-show="current_page>5"
          @click="jumpPage(1)">1</li>
      <li class="page-item" v-show="efont">...</li>
      <li v-for="num in indexs"
          :class="['page-item',{'page-active':current_page==num}]"
          @click="jumpPage(num)">{{ num }}</li>
      <li class="page-item" v-show="efont&&current_page<pages-4">...</li>
      <li class="page-item"
          v-show="current_page<pages-4"
          @click="jumpPage(pages)">{{pages}}</li>
      <li :class="['page-item',{'page-disable':current_page == pages}]" @click="next">下一页</li>
    </ul>
    <div class="page-go">
      <input class="page-ipt" type="text" v-model.number="changePage">
      <button class="page-btn" @click="jumpPage(changePage)">GO</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'pagination',
    props: {
      currentPage: Number,
      pages: Number,
      perPages: Number
    },
    data() {
      return {
        current_page: this.currentPage, //当前页
        //pages: 50, //总页数
        changePage: '',//跳转页
        //perPages: 8 //中间显示的个数
      }
    },
    mounted(){
      this.$emit('change', this.current_page)
    },
    methods: {
      jumpPage: function(id) {
        if (parseInt(id) <= this.pages && parseInt(id) >= 1){
          this.current_page = parseInt(id);
          this.$emit('change', this.current_page)
        }
      },
      prev(){
        if (this.current_page > 1){
          this.jumpPage(this.current_page - 1)
        }
      },
      next(){
        if (this.current_page < this.pages){
          this.jumpPage(this.current_page + 1)
        }
      }
    },
    computed:{
      show:function(){
        return this.pages && this.pages !== 1
      },
      efont: function() {
        if (this.pages <= this.perPages) return false;
        return this.current_page > 5
      },
      indexs: function() {
        let left = 1,
            right = this.pages,
            ar = [];
        if (this.pages >= this.perPages) {
          if (this.current_page > 5 && this.current_page < this.pages - 4) {
            if (this.perPages % 2){
              left = Number(this.current_page) - ((this.perPages-1)/2);
              right = Number(this.current_page) + ((this.perPages-1)/2);
            }else {
              left = Number(this.current_page) - ((this.perPages/2)-1);
              right = Number(this.current_page) + ((this.perPages/2));
              console.log(left);
              console.log(right);
            }

          } else {
            if (this.current_page <= 5) {
              left = 1;
              right = this.perPages;
            } else {
              right = this.pages;
              left = this.pages - (this.perPages-1);
            }
          }
        }
        while (left <= right) {
          ar.push(left);
          left++;
        }
        return ar;
      },
    }
  }
</script>


<style scoped>
  .page{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .page-group,.page-item{
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .page-group{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .page-item{
    padding: 5px 10px;
    border: 1px #d8d8d8 solid;
    border-right: none;
    font-size: 16px;
    line-height: 1.3em;
    cursor: pointer;
  }
  .page-item:first-child{
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }
  .page-item:last-child{
    border-right: 1px #d8d8d8 solid;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }
  .page-go{
    margin-left: -76px;
  }
  .page-ipt,.page-btn{
    -webkit-appearance: none;
    align-items: center;
    border: 1px solid transparent;
    border-radius: 4px;
    box-shadow: none;
    display: inline-flex;
    font-size: 1em;
    height: 2em;
    justify-content: flex-start;
    padding: .375em .625em;
    position: relative;
    vertical-align: top;
  }
  .page-ipt{
    box-sizing: border-box;
    background-color: #fff!important;
    border-color: #d8d8d8!important;
    color: #363636!important;
    box-shadow: inset 0 1px 2px rgba(10,10,10,.1);
    max-width: 100%;
    width: 20%;
    text-align: center;
  }
  
  .page-ipt:focus,.page-ipt:active{
    border-color: #209cee;
    box-shadow: 0 0 0 0.125em rgba(32,156,238,.25);
  }
  
  .page-btn{
    box-sizing: border-box;
    background-color: #fff;
    border-color: #d8d8d8;
    border-width: 1px;
    color: #363636;
    cursor: pointer;
    justify-content: center;
    padding-bottom: calc(.375em - 1px);
    padding-left: .75em;
    padding-right: .75em;
    padding-top: calc(.375em - 1px);
    text-align: center;
    white-space: nowrap;
  }
  .page-btn:hover {
    border-color: #b5b5b5;
    color: #363636;
  }
  .page-btn:active {
    border-color: #4a4a4a;
    color: #363636;
  }
  .page-disable{
    cursor: not-allowed!important;
    opacity: .75;
  }
  .page-active{
    cursor: default;
    color: #fff;
    background: #337ab7;
    border-color: #337ab7;
  }
</style>