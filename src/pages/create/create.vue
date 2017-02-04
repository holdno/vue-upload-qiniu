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