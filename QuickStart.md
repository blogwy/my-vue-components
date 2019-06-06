## MessageBox 弹框

### 使用方法

1. 引入`MessageBox.js`

```
import Alert from 'MessageBox.js';
```

2. 在需要的地方调用

```
Alert({
  // 标题，不传值默认为提示
  title: '提示',
  // 内容，必传值
  content: '内容内容内容',
  // alter距浏览器顶部距离，默认20%，上下居中50%
  boxTop: '50%',
  // 是否显示取消按钮，不传值默认false不显示
  showCancelButton: false,
  // 是否显示model层，不传默认true显示
  showModel: false,
  // 确认取消按钮文字，默认确认取消
  confirmButtonText: 'ok',
  cancelButtonText: 'no',
  // 确认取消按钮回调函数
  cancelCallback(){
    console.log('点击了no');
  },
  confirmCallback(){
    console.log('点击了ok');
  }
});
```

### 配置项

|  参数  |  说明|  类型|  是否必须|  默认值 |
|:-----:|:-----:|:-----:|:-----:|:-----:|
| title | 标题 | String | 否 | 标题 |
| content | 内容 | String | 是 |  |
| boxTop | alter距浏览器顶部距离 | String | 否 | 20% |
| showCancelButton | 是否显示取消按钮 | Boolean | 否 | false |
| showModel | 是否显示model层 | Boolean | 否 | true |
| confirmButtonText | 确认按钮文字 | String | 否 | ok |
| cancelButtonText | 取消按钮文字 | String | 否 | no |
| cancelCallback | 点击取消按钮和右上角关闭图标的回调函数 | function | 是 | |
| confirmCallback | 点击确认按钮的回调函数 | function | 是 |  |

## Dialog 对话框

### 使用方法

1. 引入组件并注册

```
import scannerBack from 'Dialog.vue';

注册组件省略
```

2. 在需要的地方调用

```
<msg-box
  :box-visible="supplierBoxVisible"
  box-title="添加供应商"
  confirm-text="添加"
  @confirm=""
  @cancel="">
  // 这里写html
</msg-box>
```

### 参数

|  参数  |  说明|  类型|  是否必须|  默认值 |
|:-----:|:-----:|:-----:|:-----:|:-----:|
| boxVisible | 弹窗显示/隐藏 | Boolean | 是 |  |
| boxTitle | 标题 | String | 否 | 提示 |
| showCancel | 是否显示取消按钮 | Boolean | 否 | false |
| confirmText | 确认按钮文字 | String | 否 | 确定 |
| cancelText | 取消按钮文字 | String | 否 | 取消 |
| boxTop | box距浏览器顶部距离 | String | 否 | 20% |
| showModel | 是否显示modal | Boolean | 否 | true |

### 方法

|  方法  |  说明|  参数|
|:-----:|:-----:|:-----:|
| cancel | 点击取消和关闭 | 点击了cancel |
| confirm | 点击确认 | 点击了confirm |

## 侧边菜单

## 分页组件