<template>
  <div>
    <div class="weui-cell">
      <div class="weui-cell__bd">
        <div class="weui-uploader">
          <div class="weui-uploader__hd">
            <div class="weui-uploader__title">
              {{title}} <font color="#999">{{uploading}}</font>
            </div>
            <div class="weui-uploader__info">{{files.length}}</div>
          </div>
          <div class="weui-uploader__bd">
            <div class="weui-uploader__files" id="uploaderFiles">
              <div v-for="(item, index) in files">
                <div class="weui-uploader__file" @click="picOption(files, index)" :index="index" :id="item">
                  <img class="weui-uploader__img" :src="item"/>
                </div>
              </div>
            </div>
            <div id="container">
              <span id="pickfiles"></span>
            </div>
            <div class="weui-uploader__input-box">
              <label :for="inputId" id="addShowLabel" @click="uploadFiles(inputId)">
                <div class="weui-uploader__input"></div>
              </label>
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
    picOption: Function, // click picture call back
    getFiles: String, // get uploaded img url (return array)
    domain: String, // qiniu space bind url
    files: Array
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
      let that = this
      this.uploader = new PL.Uploader({
        browse_button : 'pickfiles', // 触发文件选择对话框的按钮，为那个元素id
        container: 'container', // 上传区域DOM ID，默认是browser_button的父元素，
        url : that.domain, // 服务器端的上传页面地址
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
        that.files.push(url)
      })
      // 文件上传结束回调
      this.uploader.bind('UploadComplete', (up, files) => {
        console.log('uploadComplete')
        console.log(files)
        that.$emit(this.getFiles, this.files)
      })
      this.uploader.init()
      this.$nextTick(() => {
        setTimeout(() => {
          let dom = this.$el.querySelector('#container input')
          this.inputId = dom.getAttribute('id')
          // 自动上传方法 如果不需要自动上传请注释掉下面这段 并在自己业务处调用this.uploader.start()
          dom.addEventListener('change', () => {
            setTimeout(() => {
              this.uploader.start()
            }, 20)
          }, false)
        }, 20)
      })
    })
  },
  methods: {
    uploadFiles (id) {
      this.$el.querySelector('#' + id).click()
    }
  }
}
</script>

<style>
.weui-cell {
  padding: 10px 15px;
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
}
.weui-uploader__title {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
          flex: 1;
}
.weui-uploader__info {
  color: #B2B2B2;
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
}
.weui-uploader__img {
  display: block;
  width: 79px;
  height: 79px;
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
  width: 77px;
  height: 77px;
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
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
</style>