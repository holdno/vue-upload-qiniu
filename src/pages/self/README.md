![holdno logo](https://img.holdno.com/apple-touch-icon-114x114-precomposed.png)
Holdno:vue-upload
===================
Vue上传组件  
注意：本文档是基于webpack开发模式下使用vue-upload组件的说明  
如果是外部引入vue的方式请参考[DEMO](https://github.com/holdno/vue-upload-qiniu/blob/master/src/pages/self/uploadToSelf.html)  
  
这是一个 [vue2](https://cn.vuejs.org/) 组件项目<br />
<br />
你可以复制下面代码到你的vue项目中,前提是你要先把组件文件下载下来
``` html
<holdno-upload></holdno-upload>
<script>
// get vue-upload-qiniu component
import holdnoUpload from '../../components/holdnoUpload'
</script>
```
组件文件在  
/src/pages/self/uploadToSelf.vue  
  
vue upload component by plupload  
-------------

>**依赖模块:**<br />
> - npm<br />
> - webpack<br />
> - vue.js<br />
> - Plupload<br />

>**需要在index.html中引入:**<br />
> - http://cdn.staticfile.org/Plupload/2.1.1/plupload.full.min.js<br />


开始<br />
-------------
安装 npm<br />
你可以在百度或google搜索相关教程： [Baidu](https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=install%20npm&oq=just%2520for%2520funny&rsv_pq=d35ad5d90007d336&rsv_t=3aeei0aEuSoNmNACToU2ZnliBnJfW6lJFE%2FmSw6IASGyDY3I6tkm9C2%2BxBs&rqlang=cn&rsv_enter=0&inputT=3708&rsv_sug3=194&rsv_sug1=155&rsv_sug7=100&rsv_sug2=0&rsv_sug4=12908) 或 [Google](https://www.google.com.au/search?q=install+npm&rlz=1CDGOYI_enAU718AU718&oq=install+npm&aqs=chrome..69i57j0l3.11504j0j8&hl=en-GB&sourceid=chrome-mobile&ie=UTF-8) :)<br />
  
安装 webpack  
``` shell
$ npm install webpack -g
```

安装 vue  
教程： [here](https://cn.vuejs.org/)  

配置
-------------

```
vi 项目目录/build/webpack.base.conf.js<br />
``` javascript
let webpackConfig = {
  externals: {
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
示例代码<br />
-------------
这些配置项都需要填写<br />
<br />
title: String // 组件标题<br />
picoption: String // 点击图片执行的回调方法<br />
getfiles: String // 图片上传完成后将图片信息返回的方法<br />
overmax: String // 超出允许上传数量的回调方法<br />
max: Number // 允许上传的最大数量<br />
files: Array // 图片url保存数组<br />
domain: String // 接收图片上传的url<br />
auto: Boolean // 是否自动上传(默认开启)<br />
shape: String // 预览图形状 square:正方形 rectangle:长方形 (默认square)<br />
``` html
<template>
  <div>
    <holdno-upload 
      title="图片上传" 
      :picoption="picOption" 
      :getfiles="getFiles" 
      :overmax="overMax"
      :max="9"
      :files="files"
      domain="url"
      :auto="true"
      shape="square"
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
    // alert morethan the max upload num
    overMax () {
      // alert
    }
  }
}
</script>

<style>
/* write your css */
</style>
```

示例截图
--------------
![demo pic](https://img.holdno.com/F0DE709B-8D58-418A-AE7E-A2C316A2E934.png)</br>
</br>
![demo pic](https://img.holdno.com/BD68A2E9-460F-4E1C-96D2-86B36FB413E4.png)

示例体验
--------------
![demo pic](https://img.holdno.com/github/1503029051.png) </br>
