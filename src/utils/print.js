import Vue from 'vue';
import print from '../components/print.vue';

let PrintConstructor = Vue.extend(print);

let PrintBox = (options) => {
  let instance = new PrintConstructor().$mount(document.createElement('div'));
  console.log(instance);
  instance.printInfo = options.printInfo;
  // 添加到当前页面中
  document.body.appendChild(instance.$el);
};

export default PrintBox;