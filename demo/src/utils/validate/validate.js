
import handle from './validate_handle';

let WyValidate = {};

WyValidate.install = (Vue, options) => {

  Vue.directive('wyValidate',{
    bind(el, binding, vnode){
      // 初始化数据
      vnode.context.$set(vnode.context.wyError,el.name,{
        message: '',
        validated: true,
        showMessage: false
      });
      let arg = JSON.parse(JSON.stringify(binding.value));
      arg.forEach(function (item,index) {
        for (let key in item) {
          if (handle.isCheck(el.type)){
            handle.valueLimit(el, item, vnode);
            handle.valueRegex(el, item, vnode);
            handle.valueType(el, item, vnode);
            handle.valueRequired(el, item, vnode);
          }else {
            handle.checkLimit(el, item, vnode);
            handle.checkRegex(el, item, vnode);
            handle.checkType(el, item, vnode);
            handle.checkRequired(el, item, vnode);
          }

        }
      });
    }
  });

  Vue.mixin({
    data(){
      return {
        wyError: {}
      }
    }
  });

};

export default WyValidate;