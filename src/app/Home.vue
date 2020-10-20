<template>
  <div>
    <div>
      <swiper height="260px" auto :list="list1" v-model="swiper1_index" @on-index-change="onIndexChange"></swiper>
      <!--<swiper auto>
        <swiper-item  @click.native="onItemClick(0)" class="black" style='background-image:url(./mel01.jpg); background-size:100% 100%;opacity: 0.7;'>
        </swiper-item>
        <swiper-item  @click.native="onItemClick(0)" class="black" style='background-image:url(./mel02.jpg); background-size:100% 100%;opacity: 0.7;'>
        </swiper-item>
        <swiper-item  @click.native="onItemClick(0)" class="black" style='background-image:url(./mel03.jpg); background-size:100% 100%;opacity: 0.7;'>
        </swiper-item>
      </swiper> -->
      <div class="swiper-container" v-model="index" height="1000px" :show-dots="false">
        <div class="swiperTab"  :key="0">
          <div class="home-container">
            <div class="hke-title">{{'HKE' | translate}}</div>
            <div class="hke-p">{{'HKEP' | translate}}</div>
            <div @click="playGame" class="hke-img">
              <img width="381" height="214" src="./gamestick.png">
              <div class="img-txt">Play games</div>
            </div>
            <div class="hfck-title">{{'HFCK' | translate}}</div>
            <div class="hfck-p">{{'HFCKP' | translate}}</div>
            <div @click="playData" class="hfck-img">
              <img class="himg" width="321" height="184"  src="./gametable.png">
              <div class="img-txt">Statistic</div>
            </div>
            <div class="hfck-title">{{'QUIZTITLE' | translate}}</div>
            <div class="hfck-p">{{'QUIZ' | translate}}</div>
            <div @click="playQuiz" class="hfck-img">
              <img class="himg" width="321" height="184"  src="./quiz.png">
              <div class="img-txt">Quiz</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br/>
    <br/>
    <x-button class="btn" @click.native="goBack">Go back to Game!</x-button>
  </div>
</template>
<i18n>
  My Account:
    zh-CN: 我的账号
    en: My Account
  HKE:
    zh-CN: HotMel 儿童体验
    en: HotMel Kids Experience
  HKEP:
    zh-CN: 在Monopoly里发现一些吸引人的景点和餐馆！通过我们的网页发现他们的吸引人的地方！
    en: Find some attractions and restaurants classification in a “Monopoly” Game way! Know about each attraction through playing our fun web games! Fun for hours!
  HFCK:
    zh-CN: HotMel中国儿童
    en: HotMel For Chinese Kids
  HFCKP:
    zh-CN: 想发现一个值得推荐的有趣的去处！浏览我们的介绍即使你的英语能力很差也能发现墨尔本的文化背景
    en: Find the recommended attractions in one place! Browse around our introduction of attractions, know about the culture background of Melbourne even with poor English skills!
  QUIZTITLE:
    zh-CN: Hotmel用户测试
    en: Hotmel User Test
  QUIZ:
    zh-CN: 注册并登录参与我们的小测验！加深你对墨尔本的了解并查看其他用户最喜欢的墨尔本文化景点吧
    en: Register and log in to experience a small quiz! Learn more about Melbourne and check out other users' favorite Melbourne cultural attractions!
</i18n>
<script>
  // import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem } from 'vux'
  import { Tab, TabItem } from '../components/tab'
  import Sticky from '../components/sticky'
  import Divider from '../components/divider'
  import XButton from '../components/x-button'
  import { Swiper, SwiperItem } from '../components/swiper'
  const list = () => ['精选', '美食', '电影']
  const baseList = [{
    url: 'javascript:',
    img: 'http://18.180.147.97:8080/hotme/pics/homeslid1.jpg',
    title: ''
  }, {
    url: 'javascript:',
    img: 'http://18.180.147.97:8080/hotme/pics/homeslid2.jpg',
    title: ''
  }, {
    url: 'javascript:',
    img: 'http://18.180.147.97:8080/hotme/pics/homeslid3.jpg', // 404
    title: '',
    fallbackImg: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg'
  }, {
    url: 'javascript:',
    img: 'http://18.180.147.97:8080/hotme/pics/homeslid4.jpg', // 404
    title: '',
    fallbackImg: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg'
  }
  ]

  export default {
    components: {
      Tab,
      TabItem,
      Sticky,
      Divider,
      XButton,
      Swiper,
      SwiperItem
    },
    computed: {
      paramId () {
        return this.$route.params.data
      }
    },
    data () {
      return {
        list1: baseList,
        list2: list(),
        demo2: '美食',
        index: 0,
        swiper1_index: 0,
        getBarWidth: function (index) {
          return (index + 1) * 22 + 'px'
        }
      }
    },
    methods: {
      playQuiz () {
        this.$router.push('a')
      },
      playGame () {
        this.$router.push('game')
      },
      playData () {
        this.$router.push('showdata')
      },
      onIndexChange (index) {
        this.swiper1_index = index
      },
      goBack () {
        this.$router.back();
      },
      onItemClick (index) {
        console.log('on item click:', index)
      },
      next () {
        if (this.index === this.list2.length - 1) {
          this.index = 0
        } else {
          ++this.index
        }
      },
      prev () {
        if (this.index === 0) {
          this.index = this.list2.length - 1
        } else {
          --this.index
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../styles/1px.less';
  @import '../styles/center.less';

  .box {
    padding: 15px;
  }
  .tab-swiper {
    background-color: #fff;
    padding-top: 100px;
    height: 100px;
  }
  .home-container {
    margin: 20px 20px 0 20px;
    text-align: center;
    overflow: hidden;
    .hke-title {
      font-family: Grandstander;
      font-weight: 700;
      font-size: 30px;
    }
    .hke-p {
      font-family: Regular;
      font-weight: 700;
      font-size: 16px;
    }
    .hfck-title {
      font-family: Grandstander;
      font-weight: 700;
      font-size: 30px;
    }
    .hke-img {
      img {
        display: block;
        animation: scale 1.5s cubic-bezier(0.8,-1.9,0.5,-1.4) infinite;
        //animation-delay: 0.5s
      }
      .img-txt {
        margin-top: -20px;
        font-family: Regular;
        font-weight: 700;
        font-size: 18px;
      }
      margin: 40px auto 40px auto;
      animation: spin 1.5s cubic-bezier(0.8,-1.4,0.5,-1.4) infinite;
    }
    .hfck-p {
      font-family: Regular;
      font-weight: 700;
    }
    .hfck-img {
      margin: 40px auto 40px auto;
      animation: scale 1.5s cubic-bezier(0.8,-1.9,0.5,-1.4) infinite;
      .himg {
        animation: spin1 1.5s cubic-bezier(0.8,-1.0,0.5,-1.4) infinite;
      }
      .img-txt {
        margin-top: -20px;
        font-family: Regular;
        font-weight: 700;
        font-size: 18px;
      }
    }
  }
  .swiper-container {
    background: url("./homebkg1.jpg");
    background-size: 100% 2500px;
    background-repeat: repeat-y;
    background-origin: content-box;
    margin-top: 0px;
    overflow: hidden;
    &:after {
      content: '';
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      background: rgba(0, 0, 0, 0.1);
    }
  }
  .swiperTab {
    overflow-y: auto
  }
  .btn {
    position: absolute;
    bottom: 0px
  }
  @keyframes spin {
    0% {
      transform: rotate(0);
    }
    100% {
      opacity: 1;
      transform: rotate(30deg);
    }
  }
  @keyframes spin1 {
    0% {
      transform: rotate(15);
    }
    100% {
      opacity: 1;
      transform: rotate(0deg);
    }
  }
  @keyframes scale {
    0% {
      transform: scale(1.1);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
</style>
