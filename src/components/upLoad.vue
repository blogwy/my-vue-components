<template>
  <div class="hello">
    <div class="upload">
      <div class="upload_warp">
        <div class="upload_warp_img">
          <div class="upload_warp_img_model" v-show="imgModelFlge">
            <div class="upload_warp_img_model_close" @click="closeImgModel"> X </div>
            <div class="upload_warp_img_model_img">
              <img :src="currentImg">
            </div>
          </div>
          <div class="upload_warp_img_div" v-for="(item,index) in imgList" v-show="imgList.length!=0" :key="index" @click="openImgModel(item)">
            <div class="upload_warp_img_div_top">
              <div class="upload_warp_img_div_text">
                {{item.name}}
              </div>
              <i class="iconfont icon-close upload_warp_img_div_del" @click.stop="fileDel(index)"></i>
              <!--<img src="../assets/img/del.png" class="upload_warp_img_div_del" @click.stop="fileDel(index)">-->
            </div>
            <img :src="item.src">
          </div>
          <div class="upload_warp_left" @click="fileClick">
            <i class="iconfont icon-plus-add upload-icon"></i>
          </div>
        </div>
      </div>
      <div class="upload_warp_text">
        选中{{imgList.length}}张文件，共{{bytesToSize(this.size)}}
      </div>
      <input @change="fileChange($event)" type="file" ref="uploads" multiple accept="image/*" style="display: none"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data() {
      return {
        imgList: [],
        size: 0,
        imgModelFlge: false,
        currentImg: ''
      }
    },
    methods: {
      fileClick() {
        this.$refs.uploads.click();
//        if (this.imgList.length >= 4){
//          alert("选择文件不能超过4张");
//        }else {
//          this.$refs.uploads.click();
//        }
      },
      fileChange(el) {
        if (!el.target.files[0].size) return;
        this.fileList(el.target);
        el.target.value = ''
      },
      fileList(fileList) {
        let files = fileList.files;
//        if(files.length > 4) {
//          alert("选择文件不能超过4张");
//          return;
//        }else {
//          for (let i = 0; i < files.length; i++) {
//            //判断是否为文件夹
//            if (files[i].type != '') {
//              this.fileAdd(files[i]);
//            } else {
//              //文件夹处理
//              this.folders(fileList.items[i]);
//            }
//          }
//        }
        for (let i = 0; i < files.length; i++) {
          //判断是否为文件夹
          if (files[i].type != '') {
            this.fileAdd(files[i]);
          } else {
            //文件夹处理
            this.folders(fileList.items[i]);
          }
        }
      },
      //文件夹处理
      folders(files) {
        let _this = this;
        //判断是否为原生file
        if (files.kind) {
          files = files.webkitGetAsEntry();
        }
        files.createReader().readEntries(function (file) {
          for (let i = 0; i < file.length; i++) {
            if (file[i].isFile) {
              _this.foldersAdd(file[i]);
            } else {
              _this.folders(file[i]);
            }
          }
        })
      },
      foldersAdd(entry) {
        let _this = this;
        entry.file(function (file) {
          _this.fileAdd(file)
        })
      },
      fileAdd(file) {
        if (this.limit !== undefined) this.limit--;
        if (this.limit !== undefined && this.limit < 0) return;
        //总大小
        this.size = this.size + file.size;
        //判断是否为图片文件
        if (file.type.indexOf('image') == -1) {
          file.src = 'wenjian.png';
          this.imgList.push({
            file
          });
        } else {
          let reader = new FileReader();
          let image = new Image();
          let _this=this;
          reader.readAsDataURL(file);
          reader.onload = function () {
            file.src = this.result;
            image.onload=function(){
              let width = image.width;
              let height = image.height;
              file.width=width;
              file.height=height;
              _this.imgList.push(file);
//              if (_this.imgList.length >= 4){
//                alert("选择文件不能超过4张");
//                return;
//              }else {
//                _this.imgList.push(file);
//              }
              console.log( _this.imgList);
            };
            image.src= file.src;
          }
        }
      },
      fileDel(index) {
        this.size = this.size - this.imgList[index].size;//总大小
        this.imgList.splice(index, 1);
        if (this.limit !== undefined) this.limit = this.imgList.length;
      },
      bytesToSize(bytes) {
        if (bytes === 0) return '0 B';
        let k = 1000, // or 1024
            sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(bytes) / Math.log(k));
        return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
      },
      openImgModel(item){
        this.currentImg = '';
        this.currentImg = item.src;
        this.imgModelFlge = true;
        document.body.style.overflow = 'hidden';
        document.body.addEventListener('touchmove',this.offPageMove);
      },
      closeImgModel(){
        this.imgModelFlge = false;
        document.body.style.overflow = 'auto';
        document.body.removeEventListener('touchmove',this.offPageMove);
        this.currentImg = '';
      },
      offPageMove(e){
        e.preventDefault();
      }
    },
    watch: {
      imgList(){
        this.$emit('imglist',this.imgList)
      }
    }
  }
</script>
<style scoped>
  .upload-icon{
    font-size: 35px;
    color: #999;
  }
  .upload_warp_img_div_del {
    position: absolute;
    top: 1px;
    width: 16px;
    right: 5px;
  }
  .upload_warp_img_div_top {
    position: absolute;
    top: 0;
    width: 100%;
    height: 30px;
    background-color: rgba(0, 0, 0, 0.4);
    line-height: 30px;
    text-align: left;
    color: #fff;
    font-size: 12px;
    text-indent: 4px;
  }
  .upload_warp_img_div_text {
    white-space: nowrap;
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #fff;
  }
  .upload_warp_img_div img {
    max-width: 100%;
    max-height: 100%;
    vertical-align: middle;
  }
  .upload_warp_img_div {
    position: relative;
    height: 70px;
    width: 70px;
    /*border: 1px solid #ccc;*/
    margin: 0px 14px 0px 0px;
    float: left;
    line-height: 100px;
    display: table-cell;
    text-align: center;
    background-color: #eee;
    cursor: pointer;
    overflow: hidden;
  }
  .upload_warp_img {
    display: inline-block;
    float: left;
    overflow: hidden
  }
  .upload_warp_text {
    height: 32px;
    text-align: left;
    margin-bottom: 10px;
    padding-top: 10px;
    text-indent: 14px;
    border-top: 1px solid #ccc;
    font-size: 14px;
  }
  .upload_warp_right {
    float: left;
    width: 57%;
    margin-left: 2%;
    height: 100%;
    border: 1px dashed #999;
    border-radius: 4px;
    line-height: 130px;
    color: #999;
  }
  .upload_warp_left {
    display: inline-block;
    float: left;
    width: 70px;
    height: 70px;
    line-height: 70px;
    border: 1px dashed #d4d4d4;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
    background: #d4d4d4;
  }
  .upload_warp {
    margin: 14px;
    min-height: 70px;
  }
  .upload {
    border: 1px solid #ccc;
    background-color: #fff;
    /*-moz-box-shadow:0px 2px 5px #ccc;*/
    /*-webkit-box-shadow:0px 2px 5px #ccc;*/
    /*box-shadow:0px 2px 5px #ccc;*/
    /*border-radius: 4px;*/
  }
  .hello {
    width: 100%;
  }
  .upload_warp_img_model{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,.5);
    z-index: 101;
  }
  .upload_warp_img_model_close{
    position: absolute;
    right: 10px;
    top: 15px;
    width: 50px;
    height: 30px;
    font-size: 20px;
    cursor: pointer;
    text-align: center;
    line-height: 30px;
    color: #fff;
  }
  .upload_warp_img_model_img{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .upload_warp_img_model img{
    max-width: 100%;
    max-height: 100%;
  }
</style>