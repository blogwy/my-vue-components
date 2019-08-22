<template>
  <div>
    <iframe ref="printIframe" frameborder="0" scrolling="no" style="margin: 0px;padding: 0px;width: 0px;height: 0px;"></iframe>
    <div ref="odiv" style="display: none">
      <div v-for="(item,index) in printInfo" style="width: 377px;height: 378px;position: relative;box-sizing: border-box">
        <div style="position: absolute;top: 25px; left: 5px;">
          <div style="font-size: 18px;font-weight: 800">测试信息</div>
          <div style="font-size: 12px;font-weight: 600">{{ item.time }}</div>
        </div>
        <div style="position: absolute;top: 10px; right: 10px;">
          <img :src="item.barCodeData | creatBarCode"/>
        </div>
        <div style="position: absolute;top: 70px; left: 5px;width: 365px;height: 1px;border: none;border-top: 1px solid #555"></div>
        <div style="width:365px;position: absolute;top: 73px; left: 5px;font-size: 13px;display: flex;justify-content: center;align-items: center;flex-wrap: wrap;">
          <div style="box-sizing: border-box;flex: none;width: 50%;line-height: 2">测试编码：<span style="font-weight: 600">{{ item.sapNo }}</span></div>
          <div style="box-sizing: border-box;flex: none;width: 50%;line-height: 2">测试名称：<span style="font-weight: 600">{{ item.mName }}</span></div>
          <div style="box-sizing: border-box;flex: none;width: 50%;line-height: 2">测试日期：<span style="font-weight: 600">{{ item.sDate }}</span></div>
          <div style="box-sizing: border-box;flex: none;width: 50%;line-height: 2">测试一项：<span style="font-weight: 600">{{ item.bDate }}</span></div>
          <div style="box-sizing: border-box;flex: none;width: 50%;line-height: 2">测试二项：<span style="font-weight: 600">{{ item.spec }}</span></div>
          <div style="box-sizing: border-box;flex: none;width: 50%;line-height: 2">测试三项：<span style="font-weight: 600">{{ item.gys }}</span></div>
          <div style="box-sizing: border-box;flex: none;width: 50%;line-height: 2">测试四项：<span style="font-weight: 600">{{ item.cctj }}</span></div>
          <div style="box-sizing: border-box;flex: none;width: 50%;line-height: 2">测试五项：<span style="font-weight: 600">{{ item.dkc }}</span> kg</div>
          <div style="box-sizing: border-box;flex: none;width: 50%;line-height: 2">测试六项：<span style="font-weight: 600">{{ item.dq }}</span> 天</div>
          <div style="box-sizing: border-box;flex: none;width: 50%;line-height: 2">测试七项：<span style="font-weight: 600">{{ item.is }}</span></div>
          <div style="box-sizing: border-box;flex: none;width: 100%;line-height:2">测试八项：<span style="font-weight: 600">{{ item.gmy }}</span></div>
        </div>
        <div style="position: absolute;top: 235px; left: 5px;width: 365px;height: 1px;border: none;border-top: 1px solid #555"></div>
        <div style="position: absolute;top: 252px; left: 66%;">
          <img :src="item.qrCodeData | creatQrCode"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'print-box',
    data() {
      return {
        printInfo: []
      }
    },
    filters: {
      creatBarCode(barCodeData){
        let canvas = document.createElement("canvas");
        JsBarcode(canvas, barCodeData, {
          format: "CODE128",
          displayValue: true,
          margin: 0,
          height: 40,
          width: 1.5,
          fontSize: 12,
          textMargin: 0
        });
        return canvas.toDataURL("image/png");
      },
      creatQrCode(qrCodeData){
        let typeNumber = 10;
        let errorCorrectionLevel = 'L';
        qrcode.stringToBytes = qrcode.stringToBytesFuncs['UTF-8'];
        let qr = qrcode(typeNumber, errorCorrectionLevel);
        qr.addData(qrCodeData,'Byte');
        qr.make();
        return qr.createDataURL(2,0);
      }
    },
    mounted(){
      this.$nextTick(() => {
        // 此时需要延迟执行才可以拿到dom元素
        setTimeout(() => {
          // 拿到要打印区域的dom结构并设置到Iframe的srcdoc属性上面
          let printIframe = this.$refs.printIframe;
          let newstr = this.$refs.odiv.innerHTML;
          printIframe.setAttribute('srcdoc',newstr);
          printIframe.onload = function () {
            // 去掉iframe里面的dom的body的padding margin的默认数值
            printIframe.contentWindow.document.body.style.padding = '0px';
            printIframe.contentWindow.document.body.style.margin = '0px';
            // 开始打印
            printIframe.contentWindow.focus();
            printIframe.contentWindow.print();
          };
        },100)
      });
    }
  }
</script>


<style scoped>

</style>