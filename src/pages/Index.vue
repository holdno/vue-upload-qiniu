<template>
  <div>
  <swiper loop auto :list="demo06_list" :index="demo06_index" @on-index-change="demo06_onIndexChange"></swiper>
  
  <card :header="{title:'服务窗'}" v-if="scroller.length > 0">
    <scroller lock-y :scrollbar-x="false" slot="content">
      <div class="box1" :style="'width:' + boxWidth + 'px'">
        <div class="box1-item" v-for="i in scroller">
          <img :src="i.img"/>
          <div class="box1-content">
            嘉庚包车专线
          </div>
          <div class="box1-content2 gray">
            提供嘉庚到省内各市直达包车服务
          </div>
        </div>
      </div>
    </scroller>
  </card>

  <card :header="{title:'活动列表'}" :footer="{title:'更多',link:'/component/panel'}" v-if="activity.length > 0">
    <router-link :to="'/pages/activityInfo/activityInfo?id='+item.id" slot="content" class="golorry__activity-box" v-for="item in activity">
      <div class="golorry__activity-user">
        <div class="golorry__activity-user-head" catchtap="goUserPage">
          <img class="golorry__activity-user-head-img" :src="item.user.head"/>
        </div>
        <div class="golorry__activity-user-name">{{item.user.name}}</div> 
        <div class="gray">{{item.create_time}}</div> 
      </div>
      <div class="golorry__activity-information">
        <div class="golorry__activity-img-box">
          <img mode="aspectFit" class="golorry__activity-img" :src="item.img[0]"/>
        </div>
        <div class="golorry__activity-text">
          <div style="color:#000">{{item.title}}</div>
          <div>活动时间:{{item.time}}</div>
          <div class="golorry__activity-info">报名截止:{{item.end_time}}</div>
        </div>
      </div>
      <div class="golorry__activity-address">
        <img class="golorry__activity-addressicon" src="/static/img/icon/address.png"/>{{item.address}}
      </div>
    </router-link>
  </card>
  </div>
</template>

<script>
  import { Flexbox, FlexboxItem, Card, Spinner, Swiper, Scroller } from 'vux'

  const baseList = [{
    url: 'javascript:',
    img: 'https://static.vux.li/demo/1.jpg',
    title: '送你一朵fua'
  }, {
    url: 'javascript:',
    img: 'https://static.vux.li/demo/2.jpg',
    title: '送你一辆车'
  }, {
    url: 'javascript:',
    img: 'https://static.vux.li/demo/3.jpg',
    title: '送你一次旅行'
  }]

  const urlList = baseList.map((item, index) => ({
    url: 'http://m.baidu.com',
    img: item.img,
    title: `(可点击)${item.title}`
  }))

  export default {
    components: {
      Flexbox,
      FlexboxItem,
      Card,
      Spinner,
      Swiper,
      Scroller
    },
    data () {
      return {
        activity: [],
        city: '',
        weather: '',
        demo06_index: 0,
        demo06_list: urlList,
        scroller: [1, 2, 3, 4, 5, 6, 7],
        boxWidth: 10000
      }
    },
    created () {
      this.title('集合云')
      this.boxWidth = Number(this.scroller.length * 135) + Number(15)
      // 检测是否已经获取过地理位置
      let city = this.$store.state.basic.city
      if(city){
        this.getActivity(city)
        this.city = city
      }else{
        let countDown = setInterval(() => {
          if(this.$store.state.basic.city){
            this.getActivity(city)
            this.city = city
            clearInterval(countDown)
          }
        }, 500)
      }
    },
    methods: {
      getActivity (city) {
        console.log(123)
        let verify = this.public.makeKey()
        let data = {
          cityName: city,
          verifyTime: verify.verifyTime,
          key: verify.key
        }
        this.$http.get('/Api/Activity', data).then((response) => {
          response = response.body
          if(response.errno === 0){
            this.activity = response.data
            console.log(this.activity)
          }
        })
      },
      demo06_onIndexChange (index) {
        this.demo06_index = index
      }
    },
    computed: {
      cityTwo () {
        console.log('cityChange')
        this.getActivity(this.$store.state.basic.city)
        return this.$store.state.basic.city
      },
      weather () {
        return this.$store.state.basic.weather
      }
    }
  }
</script>


<style>
.weui_panel_hd{
  font-size: 13pt !important;
  color: #000 !important;
}
.weui_panel_hd:after{
  border-bottom: 0 !important;
}
.index__color-box{
  width: 100%;
  height: 280px;
  position: relative;
  box-sizing: border-box;
  padding-top:20px;
}
.index__logo-box{
  width: 100%;
  height: 120px;
  position: relative;
  text-align: center;
}
.index__logo{
  width: 120px;
  height:120px;
}
.index__search-button{
  width: 90%;
  height: 40px;
  margin: 0 auto;
  margin-top: 20px;
  overflow: hidden;
}
.index__search-button .search-button{
  border:none;
  height: 40px;
  line-height: 40px;
  border-radius: 25px 4px 25px 4px;
  text-align: center;
  background: #f8f8f8;
}

.index__search-button button:after{
  border:none;
}

.index__remind{
  width: 30px;
  height: 30px;
  position: absolute;
  top: 10px;
  right: 20px;
  transition: all 1s;
  z-index: 999;
}
.index__remind img{
  width: 100%;
  height: 100%;
}
.remind__animation-start{
  opacity: 1;
}
.remind__animation-end{
  opacity: 0.1;
}

.weui_panel:before{
  border-top: none !important;
}

.weui_panel:after {
  border-bottom: none !important;
}

.box1 {
  height: 100px;
  position: relative;
}

.box1-item {
  width: 120px;
  height: 165px;
  display:inline-block;
  margin-left: 15px;
  float: left;
  text-align: left;
}

.box1-item img {
  border-radius: 5px;
  width: 100%;
  height: 90px;
  background-color: #ccc;
}

.box1-content {
  height: 20px;
  line-height: 20px;
  font-size: 12px;
}

.box1-content2 {
  height: 14px;
  line-height: 14px;
  font-size: 12px;
}

/*.box1-item:first-child {
  margin-left: 0;
}*/

.box2-wrap {
  height: 300px;
  overflow: hidden;
}
</style>