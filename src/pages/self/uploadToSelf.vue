<template>
  <div>
    <holdno-upload 
      title="图片上传"
      :picOption="picOption" 
      getFiles="getFiles"
      domain="http://localhost:8002/expoApi/Wap/Uploader"
      :files="files"
    ></holdno-upload>
  </div>
</template>

<script>
// get vue-upload-qiniu components
import holdnoUpload from '../../components/holdnoUpload2'

export default {
  components: {
    holdnoUpload
  },
  data () {
    return {
      files: []
    }
  },
  methods: {
    // click pictures call back
    picOption (files, index) {
      console.log(files)
      // 删除图片
      // this.files.splice(index, 1)
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