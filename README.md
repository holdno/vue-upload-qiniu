![holdno logo](https://img.holdno.com/apple-touch-icon-114x114-precomposed.png)
Holdno：vue-upload-qiniu
===================
This is a [vue2](https://cn.vuejs.org/) component product<br />
You can use it in vue**2** to upload some pictures to your [Qiniu](https://www.qiniu.com/) space<br />
This is my first public product and my first English document<br />
Not for anything else just for fun<br />
: P<br />
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
$ npm install webpack -g<br />
```

Install vue<br />
click [here](https://cn.vuejs.org/)<br />
<br />
Clone vue-QiniuUpload<br />
``` shell
git clone git@github.com:holdnoWby/vue-upload-qiniu.git<br />
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
Demo code<br />
-------------
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
      this.files = files
    },
    // get uploaded img url (files: array)
    getFiles (files) {
      console.log(files)
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
