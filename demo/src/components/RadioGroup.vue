<template>
  <div class="horizontal">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {

      }
    },
    mounted(){
      let _this = this;
      this.$on('checked',(e) => {
        _this.$children[0].radiocheacked = e;
        _this.$children[1].radiocheacked = e;
        _this.$emit('change', e);
        _this.$emit('input', e);
      });
    }
  }
</script>


<style scoped>
.horizontal{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>