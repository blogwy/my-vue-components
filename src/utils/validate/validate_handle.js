import utils from './validate_utils';

let handle = {
  valueRequired(el,item,vnode){
    if (typeof (item.required) == 'undefined') return;
    if (!item.required){
      el.addEventListener(item.trigger,function () {
        vnode.context.$set(vnode.context.wyError,el.name,{
          message: '',
          validated: true,
          showMessage: false
        });
      });
    }else {
      // 初始化数据
      vnode.context.$set(vnode.context.wyError,el.name,{
        message: '不能为空',
        validated: false,
        showMessage: false
      });
      el.addEventListener(item.trigger,function () {
        if (!el.value){
          vnode.context.$set(vnode.context.wyError,el.name,{
            message: item.message,
            validated: false,
            showMessage: true
          });
        }else {
          vnode.context.$set(vnode.context.wyError,el.name,{
            message: '',
            validated: true,
            showMessage: false
          });
        }
      });
    }
  },
  valueLimit(el,item,vnode){
    if (!item.min && !item.max) return;
    [item.trigger,'blur'].forEach(function (event,index) {
      el.addEventListener(event,function () {
        if (event === 'blur' && !el.value){
          return;
        }else {
          if (!isNaN(el.value)){
            // number
            if (item.min && item.max){
              if (parseFloat(el.value) >= item.min && parseFloat(el.value) <= item.max){
                vnode.context.$set(vnode.context.wyError,el.name,{
                  message: '',
                  validated: true,
                  showMessage: false
                });
              }else {
                vnode.context.$set(vnode.context.wyError,el.name,{
                  message: item.message,
                  validated: false,
                  showMessage: true
                });
              }
            }
            if (item.min && !item.max){
              if (parseFloat(el.value) >= item.min){
                vnode.context.$set(vnode.context.wyError,el.name,{
                  message: '',
                  validated: true,
                  showMessage: false
                });
              }else {
                vnode.context.$set(vnode.context.wyError,el.name,{
                  message: item.message,
                  validated: false,
                  showMessage: true
                });
              }
            }
            if (!item.min && item.max){
              if (parseFloat(el.value) <= item.max){
                vnode.context.$set(vnode.context.wyError,el.name,{
                  message: '',
                  validated: true,
                  showMessage: false
                });
              }else {
                vnode.context.$set(vnode.context.wyError,el.name,{
                  message: item.message,
                  validated: false,
                  showMessage: true
                });
              }
            }
          }else {
            // string
            let len = (el.value).length;
            if (item.min && item.max){
              if (len >= item.min && len <= item.max){
                vnode.context.$set(vnode.context.wyError,el.name,{
                  message: '',
                  validated: true,
                  showMessage: false
                });
              }else {
                vnode.context.$set(vnode.context.wyError,el.name,{
                  message: item.message,
                  validated: false,
                  showMessage: true
                });
              }
            }
            if (item.min && !item.max){
              if (len >= item.min){
                vnode.context.$set(vnode.context.wyError,el.name,{
                  message: '',
                  validated: true,
                  showMessage: false
                });
              }else {
                vnode.context.$set(vnode.context.wyError,el.name,{
                  message: item.message,
                  validated: false,
                  showMessage: true
                });
              }
            }
            if (!item.min && item.max){
              if (len <= item.max){
                vnode.context.$set(vnode.context.wyError,el.name,{
                  message: '',
                  validated: true,
                  showMessage: false
                });
              }else {
                vnode.context.$set(vnode.context.wyError,el.name,{
                  message: item.message,
                  validated: false,
                  showMessage: true
                });
              }
            }
          }
        }
      })
    });
  },
  valueType(el,item,vnode){
    if (!item.type) return;
    [item.trigger,'blur'].forEach(function (event,index) {
      el.addEventListener(event,function () {
        if (event === 'blur' && !el.value){
          return;
        }else {
          // 数字
          if (item.type === 'number'){
            if (utils.isNumber(el.value)){
              vnode.context.$set(vnode.context.wyError,el.name,{
                message: '',
                validated: true,
                showMessage: false
              });
            }else {
              vnode.context.$set(vnode.context.wyError,el.name,{
                message: item.message,
                validated: false,
                showMessage: true
              });
            }
          }
          // 邮箱
          if (item.type === 'email'){
            if (utils.isEmail(el.value)){
              vnode.context.$set(vnode.context.wyError,el.name,{
                message: '',
                validated: true,
                showMessage: false
              });
            }else {
              vnode.context.$set(vnode.context.wyError,el.name,{
                message: item.message,
                validated: false,
                showMessage: true
              });
            }
          }
          // Url
          if (item.type === 'url'){
            if (utils.isUrl(el.value)){
              vnode.context.$set(vnode.context.wyError,el.name,{
                message: '',
                validated: true,
                showMessage: false
              });
            }else {
              vnode.context.$set(vnode.context.wyError,el.name,{
                message: item.message,
                validated: false,
                showMessage: true
              });
            }
          }
          // 中文
          if (item.type === 'chinese'){
            if (utils.isChinese(el.value)){
              vnode.context.$set(vnode.context.wyError,el.name,{
                message: '',
                validated: true,
                showMessage: false
              });
            }else {
              vnode.context.$set(vnode.context.wyError,el.name,{
                message: item.message,
                validated: false,
                showMessage: true
              });
            }
          }
          // 手机号码
          if (item.type === 'cellphonenumber'){
            if (utils.isCellphoneNumber(el.value)){
              vnode.context.$set(vnode.context.wyError,el.name,{
                message: '',
                validated: true,
                showMessage: false
              });
            }else {
              vnode.context.$set(vnode.context.wyError,el.name,{
                message: item.message,
                validated: false,
                showMessage: true
              });
            }
          }
          // 固定电话
          if (item.type === 'phonenumber'){
            if (utils.isPhoneNumber(el.value)){
              vnode.context.$set(vnode.context.wyError,el.name,{
                message: '',
                validated: true,
                showMessage: false
              });
            }else {
              vnode.context.$set(vnode.context.wyError,el.name,{
                message: item.message,
                validated: false,
                showMessage: true
              });
            }
          }
        }
      })
    });
  },
  valueRegex(el,item,vnode){
    if (!item.regex) return;
    [item.trigger,'blur'].forEach(function (event,index) {
      el.addEventListener(event,function () {
        if (event === 'blur' && !el.value){
          return;
        }else {
          if (new RegExp(item.regex).test(el.value)){
            vnode.context.$set(vnode.context.wyError,el.name,{
              message: '',
              validated: true,
              showMessage: false
            });
          }else {
            vnode.context.$set(vnode.context.wyError,el.name,{
              message: item.message,
              validated: false,
              showMessage: true
            });
          }
        }
      });
    });
  },
  checkRequired(el,item,vnode){
    if (typeof (item.required) == 'undefined') return;
    if (!item.required){
      el.addEventListener(item.trigger,function () {
        vnode.context.$set(vnode.context.wyError,el.name,{
          message: '',
          validated: true,
          showMessage: false
        });
      });
    }else {
      // 初始化数据
      vnode.context.$set(vnode.context.wyError,el.name,{
        message: '不能为空',
        validated: false,
        showMessage: false
      });
      el.addEventListener(item.trigger,function () {
        if (!el.checked){
          vnode.context.$set(vnode.context.wyError,el.name,{
            message: item.message,
            validated: false,
            showMessage: true
          });
        }else {
          vnode.context.$set(vnode.context.wyError,el.name,{
            message: '',
            validated: true,
            showMessage: false
          });
        }
      });
    }
  },
  checkLimit(el,item,vnode){
    if (!item.min && !item.max) return;
    el.addEventListener(item.trigger,function () {
      if (!el.checked){
        // 未选中
        return;
      }else {
        // 选中
        if (!isNaN(el.value)){
          // number
          if (item.min && item.max){
            if (parseFloat(el.value) >= item.min && parseFloat(el.value) <= item.max){
              vnode.context.$set(vnode.context.wyError,el.name,{
                message: '',
                validated: true,
                showMessage: false
              });
            }else {
              vnode.context.$set(vnode.context.wyError,el.name,{
                message: item.message,
                validated: false,
                showMessage: true
              });
            }
          }
          if (item.min && !item.max){
            if (parseFloat(el.value) >= item.min){
              vnode.context.$set(vnode.context.wyError,el.name,{
                message: '',
                validated: true,
                showMessage: false
              });
            }else {
              vnode.context.$set(vnode.context.wyError,el.name,{
                message: item.message,
                validated: false,
                showMessage: true
              });
            }
          }
          if (!item.min && item.max){
            if (parseFloat(el.value) <= item.max){
              vnode.context.$set(vnode.context.wyError,el.name,{
                message: '',
                validated: true,
                showMessage: false
              });
            }else {
              vnode.context.$set(vnode.context.wyError,el.name,{
                message: item.message,
                validated: false,
                showMessage: true
              });
            }
          }
        }else {
          // string
          let len = (el.value).length;
          if (item.min && item.max){
            if (len >= item.min && len <= item.max){
              vnode.context.$set(vnode.context.wyError,el.name,{
                message: '',
                validated: true,
                showMessage: false
              });
            }else {
              vnode.context.$set(vnode.context.wyError,el.name,{
                message: item.message,
                validated: false,
                showMessage: true
              });
            }
          }
          if (item.min && !item.max){
            if (len >= item.min){
              vnode.context.$set(vnode.context.wyError,el.name,{
                message: '',
                validated: true,
                showMessage: false
              });
            }else {
              vnode.context.$set(vnode.context.wyError,el.name,{
                message: item.message,
                validated: false,
                showMessage: true
              });
            }
          }
          if (!item.min && item.max){
            if (len <= item.max){
              vnode.context.$set(vnode.context.wyError,el.name,{
                message: '',
                validated: true,
                showMessage: false
              });
            }else {
              vnode.context.$set(vnode.context.wyError,el.name,{
                message: item.message,
                validated: false,
                showMessage: true
              });
            }
          }
        }
      }
    })
  },
  checkType(el,item,vnode){
    if (!item.type) return;
    el.addEventListener(item.trigger,function () {
      if (!el.checked){
        // 未选中
        return;
      }else {
        // 数字
        if (item.type === 'number'){
          if (utils.isNumber(el.value)){
            vnode.context.$set(vnode.context.wyError,el.name,{
              message: '',
              validated: true,
              showMessage: false
            });
          }else {
            vnode.context.$set(vnode.context.wyError,el.name,{
              message: item.message,
              validated: false,
              showMessage: true
            });
          }
        }
        // 邮箱
        if (item.type === 'email'){
          if (utils.isEmail(el.value)){
            vnode.context.$set(vnode.context.wyError,el.name,{
              message: '',
              validated: true,
              showMessage: false
            });
          }else {
            vnode.context.$set(vnode.context.wyError,el.name,{
              message: item.message,
              validated: false,
              showMessage: true
            });
          }
        }
        // Url
        if (item.type === 'url'){
          if (utils.isUrl(el.value)){
            vnode.context.$set(vnode.context.wyError,el.name,{
              message: '',
              validated: true,
              showMessage: false
            });
          }else {
            vnode.context.$set(vnode.context.wyError,el.name,{
              message: item.message,
              validated: false,
              showMessage: true
            });
          }
        }
        // 中文
        if (item.type === 'chinese'){
          if (utils.isChinese(el.value)){
            vnode.context.$set(vnode.context.wyError,el.name,{
              message: '',
              validated: true,
              showMessage: false
            });
          }else {
            vnode.context.$set(vnode.context.wyError,el.name,{
              message: item.message,
              validated: false,
              showMessage: true
            });
          }
        }
        // 手机号码
        if (item.type === 'cellphonenumber'){
          if (utils.isCellphoneNumber(el.value)){
            vnode.context.$set(vnode.context.wyError,el.name,{
              message: '',
              validated: true,
              showMessage: false
            });
          }else {
            vnode.context.$set(vnode.context.wyError,el.name,{
              message: item.message,
              validated: false,
              showMessage: true
            });
          }
        }
        // 固定电话
        if (item.type === 'phonenumber'){
          if (utils.isPhoneNumber(el.value)){
            vnode.context.$set(vnode.context.wyError,el.name,{
              message: '',
              validated: true,
              showMessage: false
            });
          }else {
            vnode.context.$set(vnode.context.wyError,el.name,{
              message: item.message,
              validated: false,
              showMessage: true
            });
          }
        }
      }
    })
  },
  checkRegex(el,item,vnode){
    if (!item.regex) return;
    el.addEventListener(item.trigger,function () {
      if (!el.checked){
        // 未选中
        return;
      }else {
        // 选中
        if (new RegExp(item.regex).test(el.value)){
          vnode.context.$set(vnode.context.wyError,el.name,{
            message: '',
            validated: true,
            showMessage: false
          });
        }else {
          vnode.context.$set(vnode.context.wyError,el.name,{
            message: item.message,
            validated: false,
            showMessage: true
          });
        }
      }
    });
  },
  isCheck: utils.checkType
};



export default handle;