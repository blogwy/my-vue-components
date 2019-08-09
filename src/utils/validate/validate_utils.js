let utils = {
  isNumber(val){
    let regPos = /^\d+(\.\d+)?$/; //非负浮点数
    let regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if(regPos.test(val) || regNeg.test(val)) {
      return true;
    } else {
      return false;
    }
  },
  isEmail(val){
    let reg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
    if (reg.test(val)){
      return true;
    }else {
      return false;
    }
  },
  isUrl(val){
    let reg = /^[a-zA-z]+:\/\/(\w+(-\w+)*)(\.(\w+(-\w+)*))*(\?\S*)?$/;
    if (reg.test(val)){
      return true;
    }else {
      return false;
    }
  },
  isChinese(val){
    let reg = /[u4e00-u9fa5]/;
    if (!reg.test(val)){
      return true;
    }else {
      return false;
    }
  },
  isCellphoneNumber(val){
    let reg = /^1(3|4|5|7|8)\d{9}$/;
    if (reg.test(val)){
      return true;
    }else {
      return false;
    }
  },
  isPhoneNumber(val){
    let reg = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
    if (reg.test(val)){
      return true;
    }else {
      return false;
    }
  },
  checkType(type){
    let arr = ['checkbox','radio'];
    if (arr.indexOf(type) === -1){
      return true;
    }else {
      return false;
    }
  }
};

export default utils;