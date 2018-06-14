import Vue from 'vue'
import toast from '../components/toast.vue'
const ToastConstructor = Vue.extend(toast);
let removeDom = e => {
  e.target.parentNode.removeChild(e.target);

};
ToastConstructor.prototype.close = function() {
  this.visible = false;
  this.$el.addEventListener('transitionend', removeDom);
};

const Toast = (options) => {
  let instance = new ToastConstructor().$mount(document.createElement('div'))
  let duration = options.duration || 2000;
  instance.message = typeof options === 'string' ? options : options.message
  instance.position = options.position || 'middle'
  document.body.appendChild(instance.$el);
  instance.visible = true;
  setTimeout(function() {
    instance.close();
  }, duration);
}

export default Toast