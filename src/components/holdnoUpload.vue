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
// import Qiniu sdk object
import Qiniu from 'Qiniu'

export default {
  name: 'holdnoUpload',
  props: {
    title: String, // upload components title
    picOption: Function, // click picture call back
    getFiles: Function, // get uploaded img url (return array)
    overMax: Function,
    domain: String, // qiniu space bind url
    uptokenUrl: String, // get qiniu upload token (http request url)
    max: Number
  },
  data () {
    return {
      uploading: '', // uploading show text
      inputId: ''
    }
  },
  created () {
    console.log('created')
    // 等待DOM渲染完成后执行
    this.$nextTick(() => {
      this.uploadInit()
    })
  },
  methods: {
    uploadFiles (id) {
      this.$el.querySelector('#' + id).click()
    },
    uploadInit () {
      this.upload()
      setTimeout(() => {
        // 获取js-sdk 生成的DOM元素的 id
        this.inputId = this.$el.querySelector('#container input').getAttribute('id')
      }, 500)
    },
    upload () {
      let setting = {
        runtimes: 'html5,flash,html4',    // 上传模式,依次退化
        browse_button: 'pickfiles',       // 上传选择的点选按钮，**必需**
        uptoken_url: this.uptokenUrl,        // Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
        // uptoken: '',
        // 若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
        // uptoken_func: function(file){    // 在需要获取uptoken时，该方法会被调用
        //     return jsonToken;
        // },
        unique_names: true, // 默认 false，key为文件名。若开启该选项，SDK为自动生成上传成功后的key（文件名）。
        // save_key: true,   // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK会忽略对key的处理
        domain: this.domain,   // bucket 域名，下载资源时用到，**必需**
        get_new_uptoken: false,  // 设置上传文件的时候是否每次都重新获取新的token
        container: 'container',           // 上传区域DOM ID，默认是browser_button的父元素，
        max_file_size: '10mb',           // 最大文件体积限制
        flash_swf_url: 'js/plupload/Moxie.swf',  // 引入flash,相对路径
        max_retries: 3,                   // 上传失败最大重试次数
        dragdrop: false,                   // 开启可拖曳上传
        drop_element: 'container',        // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
        chunk_size: '4mb',                // 分块上传时，每片的体积
        auto_start: true,                 // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
        init: {
          FilesAdded (up, files) {
            if(files.length > this.max || files.length + this.files.length > this.max){
              console.log('上传图片不能超过'+ this.max +'张')
              this.overMax()
              return false
            }
            for (let i in files) {
              console.log('fileName:' + files[i].name)
              console.log('fileSize:' + files[i].size)
            }
          },
          BeforeUpload (up, file) {
            // 每个文件上传前,处理相关的事情
            console.log(file)
          },
          UploadProgress (up, file) {
            // 每个文件上传时,处理相关的事情
            console.log('progress:' + file.percent + '%')
            if(file.percent >= 0){
              this.uploading = file.percent + '%'
            }
            if(file.percent == 100){
              this.uploading = ''
            }
          },
          FileUploaded (up, file, info) {
            // 每个文件上传成功后,处理相关的事情
            // 其中 info 是文件上传成功后，服务端返回的json，形式如
            // {
            //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
            //    "key": "gogopher.jpg"
            //  }
            // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html
            let domain = up.getOption('domain')
            let res = window.JSON.parse(info)
            let sourceLink = domain + '/' + res.key // 获取上传成功后的文件的Url
            this.files.push(sourceLink)
          },
          Error (up, err, errTip) {
            // 上传出错时,处理相关的事情
            console.log(up)
          },
          UploadComplete () {
            // 队列文件处理完毕后,处理相关的事情
            // 上传完成后改回上传按钮Icon
            // 向父组件返回上传信息
            this.getFiles(this.files)
            // reset components
            this.uploadInit()
          },
          Key (up, file) {
            // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
            // 该配置必须要在 unique_names: false , save_key: false 时才生效
            // let key = " "
            // do something with key here
            // return key
            console.log(file)
          }
        }
      }
      Qiniu.uploader(setting)
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