<template>
  <div class="dataMain">
    <div class="title">
      {{'Statistic Analysis' | translate}}
    </div>
    <img class="img1" :src="img1">
    <img class="img2" :src="img2">
  </div>
</template>
<i18n>
  Statistic Analysis:
    zh-CN: 静态分析
    en: Statistic Analysis
  My Account:
    zh-CN: 我的账号
    en: My Account
</i18n>
<script>
  // import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem } from 'vux'
  export default {
    name: 'showinfo',
    data () {
      return {
        img1: require('./ana1.jpg'),
        img2: require('./ana2.jpg')
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../styles/1px.less';
  @import '../../styles/center.less';
  @import url('https://fonts.googleapis.com/css?family=Baloo+Tammudu+2|Grandstander|Roboto+Condensed|Lobster|Montserrat|Cabin|Herr+Von+Muellerhoff|Source+Sans+Pro:400,900&display=swap');
  .dataMain {
    text-align: center;
    .title {
      font-family: 'Baloo Tammudu 2', sans-serif;
      font-weight: 500;
      font-size: 1.5rem;
      text-align: center;
      margin-top: 30px;
    }
    .img1 {
      display: block;
      margin: 20px auto;
      width: 360px;
      height: 280px;
    }
    .img2 {
      display: block;
      margin: 20px auto;
      width: 360px;
      height: 280px;
    }
    @media (max-width: 320px) {
      .img1 {
        display: block;
        width: 300px;
        height: 200px;
      }
      .img2 {
        display: block;
        width: 300px;
        height: 200px;
      }
    }
  }
</style>
