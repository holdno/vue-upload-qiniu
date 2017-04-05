![holdno logo](https://img.holdno.com/apple-touch-icon-114x114-precomposed.png)
Holdno:vue-upload-qiniu
===================
注意：这是基于七牛sdk开发的vue七牛上传组件</br>
</br>
这是一个 [vue2](https://cn.vuejs.org/) 组件项目<br />
你可以在你的 vue**2** 项目中使用它上传图片到你的 [Qiniu](https://www.qiniu.com/) 空间<br />
<br />
你可以复制下面代码到你的vue项目中,前提是你要先把组件文件下载下来
``` html
<holdno-upload></holdno-upload>
<script>
// get vue-upload-qiniu component
import holdnoUpload from '../../components/holdnoUpload'
</script>
```
组件文件在<br />
/src/pages/create/uploadToQiniu.vue<br />
<br />
vue upload component by Qiniu js-sdk<br />
-------------
<br />
>**依赖模块:**<br />
> - npm<br />
> - webpack<br />
> - vue.js<br />
> - Plupload<br />
> - qiniu-js-sdk<br />

>**需要在index.html中引入:**<br />
> - http://cdn.staticfile.org/Plupload/2.1.1/plupload.full.min.js<br />
> - http://cdn.staticfile.org/qiniu-js-sdk/1.0.14-beta/qiniu.min.js<br />


开始<br />
-------------
安装 npm<br />
你可以在百度或google搜索相关教程： [Baidu](https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=install%20npm&oq=just%2520for%2520funny&rsv_pq=d35ad5d90007d336&rsv_t=3aeei0aEuSoNmNACToU2ZnliBnJfW6lJFE%2FmSw6IASGyDY3I6tkm9C2%2BxBs&rqlang=cn&rsv_enter=0&inputT=3708&rsv_sug3=194&rsv_sug1=155&rsv_sug7=100&rsv_sug2=0&rsv_sug4=12908) 或 [Google](https://www.google.com.au/search?q=install+npm&rlz=1CDGOYI_enAU718AU718&oq=install+npm&aqs=chrome..69i57j0l3.11504j0j8&hl=en-GB&sourceid=chrome-mobile&ie=UTF-8) :)<br />
<br />
安装 webpack<br />
``` shell
$ npm install webpack -g
```

安装 vue<br />
教程： [here](https://cn.vuejs.org/)<br />
<br />
Clone vue-upload-qiniu<br />
``` shell
git clone git@github.com:holdnoWby/vue-upload-qiniu.git
https://github.com/holdnoWby/vue-upload-qiniu.git
```
配置<br />
-------------
vi 项目目录/build/webpack.base.conf.js<br />
``` javascript
let webpackConfig = {
  externals: {
    "Qiniu": "Qiniu"
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
    <link rel="stylesheet" href="/static/css/font-awesome-4.5.0/css/font-awesome.css">
    <link rel="stylesheet" href="/static/css/holdno.css">
  </head>
  <body>
    <div id="app"></div>
    <!--upload-->
    <script src="http://cdn.staticfile.org/Plupload/2.1.1/plupload.full.min.js"></script>
    <script src="http://cdn.staticfile.org/qiniu-js-sdk/1.0.14-beta/qiniu.min.js"></script>
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
getFiles: String, // 图片上传完成后将图片信息返回的方法<br />
uploadingText: String, // 上传中提示文案<br />
domain: String, // 七牛空间名<br />
uptokenUrl: String // 获取七牛uptoken的后端地址<br />
``` html
<template>
  <div>
    <holdno-upload 
      title="图片上传" 
      :picOption="picOption" 
      getFiles="getFiles" 
      uploadingText="上传中..." 
      domain="https://img.holdno.com" 
      uptokenUrl="/Api/gettoken"
    ></holdno-upload>
  </div>
</template>

<script>
// get vue-upload-qiniu component
import holdnoUpload from '../../components/holdnoUpload'

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
