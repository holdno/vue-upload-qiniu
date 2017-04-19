![holdno logo](https://img.holdno.com/apple-touch-icon-114x114-precomposed.png)
Holdno:vue-upload
===================
</br>
这是一个 [vue2](https://cn.vuejs.org/) 图片上传组件<br />
你可以在你的 vue**2** 项目中使用它上传图片到你的服务器中<br />
<br />
>**plupload特点:**<br />
> - 支持多图上传<br />
> - 异步上传<br />
> - 强大的回调方法<br />
> - 可定制性强<br />
> - 支持html5 flash等多种上传方式<br />

<br />
你可以复制下面代码到你的vue项目中,前提是你要先把组件文件下载下来
``` html
<holdno-upload></holdno-upload>
<script>
// get vue-upload-qiniu component
import holdnoUpload from '../../components/holdnoUpload2'
</script>
```
组件示例文件在<br />
/src/pages/create/uploadToSelf.vue<br />
对应的组件在 /src/components/holdnoUpload2.vue
<br />
vue upload component by Plupload<br />
-------------
<br />
>**依赖模块:**<br />
> - npm<br />
> - webpack<br />
> - vue.js<br />
> - Plupload<br />

>**需要在index.html中引入:**<br />
> - http://cdn.staticfile.org/Plupload/2.1.1/plupload.full.min.js<br />


开始<br />
-------------
将代码复制或clone到本地
<br />
配置<br />
-------------
vi 项目目录/build/webpack.base.conf.js<br />
``` javascript
let webpackConfig = {
  externals: {
    "Qiniu": "Qiniu",
    "plupload": "plupload"
  }
}
```

引入外部js示例 (after annotation:upload)
-------------
vue cli -> root/index.html
``` html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta content="telephone=no" name="format-detection" />
    <meta name="apple-mobile-web-app-status-bar-style" content="white">
    <link rel="apple-touch-icon-precomposed" href="/static/img/apple-touch-icon-114x114-precomposed.png">
    <title>集合云</title>
  </head>
  <body>
    <div id="app"></div>
    <!--upload-->
    <script src="http://cdn.staticfile.org/Plupload/2.1.1/plupload.full.min.js"></script>
    <!-- built files will be auto injected -->
  </body>
</html>
```
Demo code<br />
-------------
这些配置项都需要填写<br />
<br />
title: String, // 组件标题<br />
picOption: Function, // 点击图片执行的回调方法<br />
getFiles: Function, // 图片上传完成后将图片信息返回的方法<br />
overMax: Function // 超出上传数量回调方法<br />
max: Number // 允许上传的图片数量<br />
domain: String // 接收图片上传的url<br />
``` html
<template>
  <div>
    <holdno-upload 
      title="图片上传" 
      :picOption="picOption" 
      :getFiles="getFiles"
      :overMax="overMax"
      :max="9"
      domain="url"
    ></holdno-upload>
  </div>
</template>

<script>
// get vue-upload-qiniu component
import holdnoUpload from '../../components/holdnoUpload2'

export default {
  components: {
    holdnoUpload
  },
  data () {
    return {
      files: [],
    }
  },
  methods: {
    // click pictures call back
    picOption (files, index) {
      console.log(files)
    },
    // get uploaded img url (files: array)
    getFiles (files) {
      console.log(files)
      this.files = files
    }
    // alert morethan the max upload num
    overMax () {
      //alert()
    }
  }
}
</script>

<style>
/* write your css */
</style>
```

Demo show
--------------
![demo pic](https://img.holdno.com/F0DE709B-8D58-418A-AE7E-A2C316A2E934.png)</br>
</br>
![demo pic](https://img.holdno.com/BD68A2E9-460F-4E1C-96D2-86B36FB413E4.png)

Demo view
--------------
This project still under development </br>
When it is completed you can open it here.
