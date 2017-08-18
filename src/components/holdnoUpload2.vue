<template>
  <div>
    <div class="weui-cell">
      <div class="weui-cell__bd">
        <div class="weui-uploader">
          <div class="weui-uploader__hd">
            <div class="weui-uploader__title">
              {{title}} <font color="#999">{{uploading}}</font>
            </div>
            <div class="weui-uploader__info">{{files.length}}{{max ? '/' + max : ''}}</div>
          </div>
          <div class="weui-uploader__bd">
            <div class="weui-uploader__files" id="uploaderFiles">
              <div v-for="(item, index) in files">
                <div :class="{'weui-uploader__file': true, 'square': shape == 'square', 'rectangle': shape == 'rectangle'}" :index="index" :id="item">
                  <div class="fa fa-minus-circle" @click="openPicOption(files, index)">删除</div>
                  <div class="weui-uploader__img" :style="'background-Image:url(' + item + ')'" @click="showImg(index)"></div>
                </div>
              </div>
            </div>
            <div :class="{'weui-uploader__input-box': true, 'square': shape == 'square', 'rectangle': shape == 'rectangle'}" id="addShowLabel">
              <div class="weui-uploader__input" id="pickfiles"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PL from 'plupload'

export default {
  name: 'holdnoUpload2',
  props: {
    title: String, // upload components title
    picoption: String, // click picture call back
    getfiles: String, // get uploaded img url (return array)
    overmax: String,
    domain: String, // qiniu space bind url
    files: Array,
    max: Number,
    auto: {
      type: Boolean,
      value: true
    }
    shape: {
      type: String,
      default: 'square'
    }
  },
  data () {
    return {
      uploading: '', // uploading show text
      inputId: '',
      uploader: ''
    }
  },
  mounted () {
    console.log('created')
    // 等待DOM渲染完成后执行
    this.$nextTick(() => {
      this.uploader = new PL.Uploader({
        browse_button : 'pickfiles', // 触发文件选择对话框的按钮，为那个元素id
        container: 'container', // 上传区域DOM ID，默认是browser_button的父元素，
        url : this.domain, // 服务器端的上传页面地址
        max_file_size: '10mb', // 上传文件的大小限制
        max_retries: 3, // 上传失败后尝试重试的次数
        auto_start: true, // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
        filters : [ // 上传文件类型限制
          {
            title : "Image",
            extensions : "jpg,jpeg,gif,png"
          }
        ]
      })
      // 添加文件后触发
      this.uploader.bind('FilesAdded', (up, files) => {
        if(files.length > this.max || files.length + this.files.length > this.max){
          console.log('上传图片不能超过'+ this.max +'张')
          this.$emit(this.overmax)
          return false
        }
        for (let i in files) {
          console.log('fileName:' + files[i].name)
          console.log('fileSize:' + files[i].size)
        }
      })
      // 文件上传进度
      this.uploader.bind('UploadProgress', (up, file) => {
        console.log('progress:' + file.percent + '%')
        if(file.percent >= 0){
          this.uploading = file.percent + '%'
        }
        if(file.percent == 100){
          this.uploading = ''
        }
      })
      // 每个文件上传成功回调
      this.uploader.bind('FileUploaded', (up, file, info) => {
        console.log(up)
        console.log(file)
        console.log(info)
        // 在这里对服务器返回的信息进行处理
        // info为服务器返回的信息
        let url = window.JSON.parse(info.response).files[0].path
        // 确保url被添加到files数组中界面才会显示已经上传的图片
        this.files.push(url)
      })
      // 文件上传结束回调
      this.uploader.bind('UploadComplete', (up, files) => {
        console.log('uploadComplete')
        console.log(files)
        this.$emit(this.getfiles, this.files)
        // this.getFiles(this.files)
      })
      this.uploader.init()
      this.$nextTick(() => {
        setTimeout(() => {
          if(this.auto){
            let dom = this.$el.querySelector('#addShowLabel input')
            this.inputId = dom.getAttribute('id')
            // 自动上传方法 如果不需要自动上传请注释掉下面这段 并在自己业务处调用this.uploader.start()
            dom.addEventListener('change', () => {
              setTimeout(() => {
                this.uploader.start()
              }, 20)
            }, false)
          }
        }, 20)
      })
    })
  },
  methods: {
    uploadFiles (id) {
      this.$el.querySelector('#' + id).click()
    },
    openPicOption (files, index) {
      this.$emit(this.picOption, files, index)
    }
  }
}
</script>

<style>
.weui-cell {
  padding: 10px 0;
  position: relative;
  display: flex;
  align-items: center;
}
.weui-cell__bd {
  flex: 1;
}
.weui-uploader__hd {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  padding-bottom: 10px;
  -webkit-box-align: center;
  -webkit-align-items: center;
          align-items: center;
  font-size: 14px;
}
.weui-uploader__title {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
          flex: 1;
  font-weight: bold;
  font-size: 16px;
}
.weui-uploader__info {
  color: #97a8be;
}
.weui-uploader__bd {
  margin-bottom: -4px;
  margin-right: -9px;
  overflow: hidden;
}
.weui-uploader__file {
  float: left;
  margin-right: 9px;
  margin-bottom: 9px;
  position: relative;
}
.weui-uploader__file .fa {
  position: absolute;
  right: 5px;
  top: 5px;
  color: #f00;
  cursor: pointer;
}
.weui-uploader__img {
  width: 100%;
  height: 100%;
  display: block;
  background-size: cover;
  background-position: center center;
}
.weui-uploader__file_status {
  position: relative;
}
.weui-uploader__file_status:before {
  content: " ";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.weui-uploader__file-content {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  color: #FFFFFF;
}
.weui-uploader__input-box {
  float: left;
  position: relative;
  margin-right: 9px;
  margin-bottom: 9px;
  border: 1px solid #D9D9D9;
}
.weui-uploader__input-box:before,
.weui-uploader__input-box:after {
  content: " ";
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  background-color: #D9D9D9;
}
.weui-uploader__input-box:before {
  width: 2px;
  height: 39.5px;
}
.weui-uploader__input-box:after {
  width: 39.5px;
  height: 2px;
}
.weui-uploader__input-box:active {
  border-color: #999999;
}
.weui-uploader__input-box:active:before,
.weui-uploader__input-box:active:after {
  background-color: #999999;
}
.weui-uploader__input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
.square {
  width: 77px;
  height: 77px;
}
.rectangle {
  width: 130px;
  height: 77px;
}
</style>