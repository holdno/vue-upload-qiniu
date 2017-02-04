<template>

  <div>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
  
</template>
<script>
export default {
  data () {
    return {
      pageTitle: '集合云'
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
.vux-header h1 {
  color: #000 !important;
}
body {
  background-color: #fbf9fe;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}
</style>
