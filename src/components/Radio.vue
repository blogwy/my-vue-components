<template>
  <div class="horizontal" ref="childcompon">
    <div class="c-radio item-horizontal">
      <label class="checkbox-lab">
        <input type="radio"
               v-model="radiocheacked"
               :value="value"
               class="checkbox-ipt">
        <i class="iconfont icon-tijiao ico"
           :class="{'item-checked':radiocheacked === value,'redcolor':value === '0'}" ref="icon"></i>
        <slot></slot>
      </label>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'RadioCom',
    data() {
      return {
        radiocheacked: '',
        value: ''
      }
    },
    watch: {
      radiocheacked(){
        this.$parent.$emit('checked',this.radiocheacked);
      }
    },
    mounted(){
      if ((this.$parent.$children).indexOf(this) == 0){
        this.value = '1'
      }
      if ((this.$parent.$children).indexOf(this) == 1){
        this.value = '0'
      }
    },
    methods: {
    }
  }
</script>


<style scoped>
  .ico{
    position: absolute;
    top: 50%;
    margin-top: -10px;
    left: 2px;
    pointer-events: none;
    color: transparent;
    font-size: 19px;
    transform: scale(0);
    transition: all .2s
  }
  .item-checked{
    color: #5cb85c;
    transform: scale(1);
  }
  .checkbox,.c-radio{
    position: relative;
    padding: 5px 0;
  }
  .checkbox-ipt{
    width: 14px;
    height: 14px;
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: -7px;
    cursor: pointer;
    opacity: 0;
    -webkit-appearance: none;
    display: inline-block;
    vertical-align: middle;
    z-index: 100;
  }
  .checkbox-lab{
    display: inline-block;
    position: relative;
    font-size: 12px;
    font-weight: 400;
    padding: 0 0 0 27px;
    vertical-align: top;
    color: #232323;
    cursor: pointer;
    white-space: nowrap;
  }
  .checkbox-lab::before{
    width: 17px;
    height: 17px;
    position: absolute;
    top: 50%;
    left: 2px;
    margin-top: -9px;
    cursor: pointer;
    content: '';
    border: 1px solid #e3e3e3;
    border-radius: 50%;
  }
  .horizontal{
    flex: 1;
    text-align: center;
    margin-left: 16px;
  }
  .horizontal:nth-child(even){
  
  }
  
  .redcolor{
    color: #d9534f;
  }
  label{
    margin-bottom: 0px;
    font-weight: normal;
  }
</style>