<template>
  <div>
    <holdno-upload 
      title="图片上传" 
      :picOption="picOption" 
      :getFiles="getFiles" 
      :overMax="overMax"
      :max="9"
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
    },
    overMax () {
      // 提醒用户超出上传上限
    }
  }
}
</script>

<style>
/* write your css */
</style>