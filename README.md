![holdno logo](https://img.holdno.com/apple-touch-icon-114x114-precomposed.png)
Holdno:vue-upload-qiniu
===================
Attention:The project is only with the qiniu service, Not qiniu development</br>
</br>
This is a [vue2](https://cn.vuejs.org/) component product<br />
You can use it in vue**2** to upload some pictures to your [Qiniu](https://www.qiniu.com/) space<br />
This is my first public product and my first English document<br />
Just for fun<br />
: P<br />
<br />
The useful files are in this directory<br />
/src/pages/create/create.vue<br />
<br />
vue upload component by Qiniu js-sdk<br />
-------------
<br />
>**Dependent module:**<br />
> - npm<br />
> - webpack<br />
> - vue.js<br />
> - Plupload<br />
> - qiniu-js-sdk<br />
> - weui<br />

>**Requirements:**<br />
> - http://cdn.staticfile.org/Plupload/2.1.1/plupload.full.min.js<br />
> - http://cdn.staticfile.org/qiniu-js-sdk/1.0.14-beta/qiniu.min.js<br />


start<br />
-------------
Install npm<br />
You can search 'install npm' by [Baidu](https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=install%20npm&oq=just%2520for%2520funny&rsv_pq=d35ad5d90007d336&rsv_t=3aeei0aEuSoNmNACToU2ZnliBnJfW6lJFE%2FmSw6IASGyDY3I6tkm9C2%2BxBs&rqlang=cn&rsv_enter=0&inputT=3708&rsv_sug3=194&rsv_sug1=155&rsv_sug7=100&rsv_sug2=0&rsv_sug4=12908) or [Google](https://www.google.com.au/search?q=install+npm&rlz=1CDGOYI_enAU718AU718&oq=install+npm&aqs=chrome..69i57j0l3.11504j0j8&hl=en-GB&sourceid=chrome-mobile&ie=UTF-8) :)<br />
<br />
Install webpack<br />
``` shell
$ npm install webpack -g
```

Install vue<br />
click [here](https://cn.vuejs.org/)<br />
<br />
Clone vue-upload-qiniu<br />
``` shell
git clone git@github.com:holdnoWby/vue-upload-qiniu.git
https://github.com/holdnoWby/vue-upload-qiniu.git
```
Config<br />
-------------
vi product/build/webpack.base.conf.js<br />
``` javascript
let webpackConfig = {
  externals: {
    "Qiniu": "Qiniu"
  }
}
```

Requirements (after annotation:upload)
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
please fill the configuration option<br />
title: String, // upload components title<br />
picOption: Function, // click picture call back<br />
getFiles: String, // get uploaded img url (return array)<br />
uploadingText: String, // uploading show text<br />
domain: String, // qiniu space bind url<br />
uptokenUrl: String // get qiniu upload token (http request url)<br />
``` html
<template>
  <div>
    <div class="golorry__title-alert">
      一经发布不可修改
    </div>
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
// get vue-upload-qiniu components
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
Still developing </br>
When completed you can open here
