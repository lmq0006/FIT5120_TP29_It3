<template>
  <div>
    <div ref="main">
      <div v-show="slidList.length<=0">{{'NoInfo' | translate}}</div>
      <swiper height="260px" auto :list="slidList" v-model="swiper1_index" @on-index-change="onIndexChange"></swiper>
      <!--<swiper auto>
        <swiper-item  @click.native="onItemClick(0)" class="black" style='background-image:url(./mel01.jpg); background-size:100% 100%;opacity: 0.7;'>
        </swiper-item>
        <swiper-item  @click.native="onItemClick(0)" class="black" style='background-image:url(./mel02.jpg); background-size:100% 100%;opacity: 0.7;'>
        </swiper-item>
        <swiper-item  @click.native="onItemClick(0)" class="black" style='background-image:url(./mel03.jpg); background-size:100% 100%;opacity: 0.7;'>
        </swiper-item>
      </swiper> -->
      <div class="swiper-container" v-model="index" height="900px" :show-dots="false">
        <div class="swiperTab"  :key="0">
          <div v-show="update" class="content-container">
            <div ></div>
            <div class="enPara" v-show="paramId===2 && eng==='en'">
              <h1 class="title">{{'Humble Rays Melbourne' | translate}}</h1>
              <div class="address">
                <div class="img"><img src="http://18.180.147.97:8080/hotme/pics/at.png" alt=""></div>
                <div class="addrtxt">Address: 71 Bouverie St, Carlton VIC 3053</div>
              </div>
            </div>
            <div class="zhPara" v-show="paramId===2 && eng==='zh-CN'">
              <h1 class="title">{{'Humble Rays Melbourne' | translate}}</h1>
              <div class="address">
                <div class="img"><img src="http://18.180.147.97:8080/hotme/pics/at.png" alt=""></div>
                <div class="addrtxt">地址：维多利亚州3053，卡尔顿，71 Bouverie St</div>
              </div>
            </div>
            <div class="enPara" v-show="paramId===4 && eng==='en'">
              <h1 class="title">{{'Nambawan Hot Pot&Grill' | translate}}</h1>
              <div class="address">
                <div class="img"><img src="http://18.180.147.97:8080/hotme/pics/at.png" alt=""></div>
                <div class="addrtxt">Address: 555  Swanston,Carlton</div>
              </div>
            </div>
            <div class="zhPara" v-show="paramId===4 && eng==='zh-CN'">
              <h1 class="title">{{'Nambawan Hot Pot&Grill' | translate}}</h1>
              <div class="address">
                <div class="img"><img src="http://18.180.147.97:8080/hotme/pics/at.png" alt=""></div>
                <div class="addrtxt">地址：555 Swanston，卡尔顿</div>
              </div>
            </div>
            <div class="enPara" v-show="paramId===6 && eng==='en'">
              <h1 class="title">{{'Niku Ou Janpanese Charcoal Grill' | translate}}</h1>
              <div class="address">
                <div class="img"><img src="http://18.180.147.97:8080/hotme/pics/at.png" alt=""></div>
                <div class="addrtxt">Address: 9-10/108 Bourke Street Melbourne 3000 </div>
              </div>
            </div>
            <div class="zhPara" v-show="paramId===6 && eng==='zh-CN'">
              <h1 class="title">{{'Niku Ou Janpanese Charcoal Grill' | translate}}</h1>
              <div class="address">
                <div class="img"><img src="http://18.180.147.97:8080/hotme/pics/at.png" alt=""></div>
                <div class="addrtxt">地址：9-10 / 108伯克街墨尔本3000</div>
              </div>
            </div>
            <div class="enPara" v-show="paramId===8 && eng==='en'">
              <h1 class="title">{{'Jang Gun' | translate}}</h1>
              <div class="address">
                <div class="img"><img src="http://18.180.147.97:8080/hotme/pics/at.png" alt=""></div>
                <div class="addrtxt">Address: 3/21 Healeys Ln, Melbourne VIC 3000</div>
              </div>
            </div>
            <div class="zhPara" v-show="paramId===8 && eng==='zh-CN'">
              <h1 class="title">{{'Jang Gun' | translate}}</h1>
              <div class="address">
                <div class="img"><img src="http://18.180.147.97:8080/hotme/pics/at.png" alt=""></div>
                <div class="addrtxt">地址：墨尔本希利斯路3/21号维多利亚州3000</div>
              </div>
            </div>
            <div class="enPara" v-show="paramId===10 && eng==='en'">
              <h1 class="title">{{'Top Tea' | translate}}</h1>
              <div class="address">
                <div class="img"><img src="http://18.180.147.97:8080/hotme/pics/at.png" alt=""></div>
                <div class="addrtxt">Address: 242 Swanston Street, Melbourne 3000</div>
              </div>
            </div>
            <div class="zhPara" v-show="paramId===10 && eng==='zh-CN'">
              <h1 class="title">{{'Top Tea' | translate}}</h1>
              <div class="address">
                <div class="img"><img src="http://18.180.147.97:8080/hotme/pics/at.png" alt=""></div>
                <div class="addrtxt">地址：墨尔本斯旺斯顿街242号3000</div>
              </div>
            </div>
            <div class="enPara" v-show="paramId===12 && eng==='en'">
              <h1 class="title">{{'Unabara Lobster&Oyster Bar' | translate}}</h1>
              <div class="address">
                <div class="img"><img src="http://18.180.147.97:8080/hotme/pics/at.png" alt=""></div>
                <div class="addrtxt">Address: Level 1，Shop 36，Emporium Melbourne，287 Lonsdale St，Melbourne VIC 3000</div>
              </div>
            </div>
            <div class="zhPara" v-show="paramId===12 && eng==='zh-CN'">
              <h1 class="title">{{'Unabara Lobster&Oyster Bar' | translate}}</h1>
              <div class="address">
                <div class="img"><img src="http://18.180.147.97:8080/hotme/pics/at.png" alt=""></div>
                <div class="addrtxt">地址：1楼，墨尔本Emporium 36号商店，伦敦Lonsdale St 287号，墨尔本VIC 3000</div>
              </div>
            </div>
            <div class="enPara" v-show="positions[paramId-1].label !=='' && eng==='en'">
              <div class="address">
                <div class="linkImg"><img src="http://18.180.147.97:8080/hotme/pics/street.png" alt=""></div>
                <div class="addrtxt" @click="visitSite(paramId-1)">Visit Website!</div>
              </div>
            </div>
            <div class="zhPara" v-show="positions[paramId-1].label !=='' && eng==='zh-CN'">
              <div class="address">
                <div class="linkImg"><img src="http://18.180.147.97:8080/hotme/pics/street.png" alt=""></div>
                <div class="addrtxt" @click="visitSite(paramId-1)">点击访问官网!</div>
              </div>
            </div>
            <div class="enPara" v-show=" positions[paramId-1].label !=='' && eng==='en'">
              <div class="address">
                <div class="linkImg"><img src="http://18.180.147.97:8080/hotme/pics/link.png" alt=""></div>
                <div class="addrtxt">VR Street View!</div>
              </div>
            </div>
            <div class="zhPara" v-show=" positions[paramId-1].label !=='' && eng==='zh-CN'">
              <div class="address">
                <div class="linkImg"><img src="http://18.180.147.97:8080/hotme/pics/link.png" alt=""></div>
                <div class="addrtxt">VR 街景!</div>
              </div>
            </div>
            <gmap-street-view-panorama ref="streetView" v-if=" positions[paramId-1].label !==''" id="pano"
                                       :position="{lat: positions[paramId-1].lat, lng: positions[paramId-1].lng}"
                                       :pov="{ heading: -10, pitch: 10}"
                                       :motionTracking="false"
            ></gmap-street-view-panorama>
            <div class="enPara" v-show="paramId===2 && eng==='en'">
              <p>Known For:  Asian influenced new-style brunch dishes in a cheerful plant-strung haven
                Popular Dishes: Crabmeat, Egg Waffle, Bingsu, Sunny Side, Matcha Latte, Croissant
                People Say This Place Is Known For: Student Crowd, Brunch Place, Packed on Weekends, Interesting Menu, Decoration, Big Portion
                Average Cost: $50 for two people (approx.)
              </p>
            </div>
            <div class="zhPara" v-show="paramId===2 && eng==='zh-CN'">
              <p>闻名： 亚洲人在充满欢乐的植物串成的避风港中影响了新型早午餐
                热门菜： 蟹肉，鸡蛋华夫饼，炳素，阳光明媚的一面，抹茶拿铁，新月形面包
                人们说这个地方出名： 学生人群，早午餐的地方，周末装满，有趣的菜单，装饰，大部分
                平均费用： 两个人$ 50（大约）
              </p>
            </div>
            <div class="enPara" v-show="paramId===4 && eng==='en'">
              <p>Cuisines: ChineseHot PotBBQ
                People Say This Place Is Known For: Young Crowd, Customizable Food, Fresh Food, Quality, Price, Experience
                Average Cost: $60 for two people (approx.) Without alcohol
              </p>
            </div>
            <div class="zhPara" v-show="paramId===4 && eng==='zh-CN'">
              <p>美食： 中国火锅烧烤
                人们说这个地方出名： 青年人群，可定制食品，新鲜食品，质量，价格，经验
                平均费用： 两个人约60美元（不含酒精）
              </p>
            </div>
            <div class="enPara" v-show="paramId===6 && eng==='en'">
              <p>
                Known For: Niku Ou showcases Japanese wagyu with certificates tracing the bloodline of each wagyu cow. Expect prime marbled cuts in a modern Japanese fit out
                Popular Dishes: Beef Tongue, Wagyu Meat, Sukiyaki, Sashimi Platter, Foie Gras, Bbq
                People Say This Place Is Known For: Themed Decor, Comfortable Seating Area, Packed on Weekends, Friendly Service, Interior, Quality
                Average Cost: $100 for two people (approx.) Without alcohol
              </p>
            </div>
            <div class="zhPara" v-show="paramId===6 && eng==='zh-CN'">
              <p>
                闻名： Niku Ou向日本和牛展示了可追溯每只和牛奶牛血统的证书。 期待现代日本风格的大理石花纹切割
                热门菜： 牛舌，和牛肉，寿喜烧，生鱼片拼盘，鹅肝，烧烤
                人们说这个地方出名： 主题装饰，舒适的休息区，周末打包，友善的服务，室内，品质
                平均费用： 两个人约100美元（不含酒精）
              </p>
            </div>
            <div class="enPara" v-show="paramId===8 && eng==='en'">
              <p>Cuisines: Korean
                People Say This Place Is Known For: Elaborate Menu, Spicy, Good Quality, Fresh Food, Price, Service
                Popular Dishes: Corn Cheese, Kimchi Pancake, Seafood Pancake, Egg Roll, Bibimbap, Spicy Chicken
                People Say This Place Is Known For: Gastronomical Experience, Student Crowd, Spicy, Portion, Good Place, Great Place
                Average Cost: $65 for two people (approx.) Without alcohol
              </p>
            </div>
            <div class="zhPara" v-show="paramId===8 && eng==='zh-CN'">
              <p>美食：韩料
                人们说这个地方出名： 精致菜单，香辣，优质，新鲜食品，价格，服务
                热门菜： 玉米奶酪，泡菜煎饼，海鲜煎饼，蛋卷，石锅拌饭，香辣鸡肉
                人们说这个地方出名： 美食体验，学生人群，香辣，部分，好地方
                平均费用： 两个人大约65美元的价格，不含酒精
              </p>
            </div>
            <div class="enPara" v-show="paramId===10 && eng==='en'">
              <p>Known For: Top Tea offer numerous flavours of freshly brewed tea paired with toppings for boundless customisable drinks
                Popular Dishes: Strawberry Cheese, Mango Cream, Bubble Tea, Breads, Drinks
                People Say This Place Is Known For: Tasty, Bread, Quality, Flavour, Staff
                Average Cost: $15 for two people (approx.)
              </p>
            </div>
            <div class="zhPara" v-show="paramId===10 && eng==='zh-CN'">
              <p>闻名： 顶级茶提供多种口味的现煮茶和浇头，可无限量定制饮料
                热门菜： 草莓奶酪，芒果奶油，泡泡茶，面包，饮料
                人们说这个地方出名： 美味，面包，品质，风味，员工
                平均费用： 两个人$ 15（大约）
              </p>
            </div>
            <div class="enPara" v-show="paramId===12 && eng==='en'">
              <p>Cuisines: SeafoodJapanese
                Popular Dishes: Lobster Linguini, Seafood Bowl, Lobster Risotto, Lobster Bun, Fried Mushrooms, Seafood Linguine
                People Say This Place Is Known For: Friendly Stuff, Amazing Customer Service, Polite Service, Great Presentation, Family Place, Good for Large Groups
                Average Cost: $70 for two people (approx.) Without alcohol
              </p>
            </div>
            <div class="zhPara" v-show="paramId===12 && eng==='zh-CN'">
              <p>美食： 海鲜日本料理
                热门菜： 龙虾扁面条，海鲜碗，龙虾烩饭，龙虾面包，炸蘑菇，海鲜扁面条
                人们说这个地方出名： 友善的员工，令人赞叹的客户服务，礼貌的服务，出色的介绍，家庭聚餐，适合大型团体
                平均费用： 两个人约70美元（不含酒精）
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br/>
    <br/>
    <x-button class="btn" @click.native="goBack">{{ `${goback}` }}</x-button>
  </div>
</template>
<i18n>
  Link:
    zh-CN: 点击访问官网
    en: Visit Website!
</i18n>
<script>
  import { Tab, TabItem } from '../../components/tab'
  import Sticky from '../../components/sticky'
  import Divider from '../../components/divider'
  import XButton from '../../components/x-button'
  import { Swiper, SwiperItem } from '../../components/swiper'
  import Vue from 'vue'
  const list = () => ['精选', '美食', '电影']
  const baseList = [{
    url: 'javascript:',
    img: 'http://18.180.147.97:8080/hotme/pics/homeslid1.jpg', // 'http://39.98.194.195/hotme/pics/homeslid1.jpg',
    title: ''
  }, {
    url: 'javascript:',
    img: 'http://18.180.147.97:8080/hotme/pics/homeslid2.jpg', // 'http://39.98.194.195/hotme/pics/homeslid2.jpg',
    title: ''
  }, {
    url: 'javascript:',
    img: 'http://18.180.147.97:8080/hotme/pics/homeslid3.jpg', // 'http://39.98.194.195/hotme/pics/homeslid3.jpg',
    title: '',
    fallbackImg: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg'
  }
  ]
  const linkArr = [
    {
      url: 'https://www.ngv.vic.gov.au/',
      img: 'http://18.180.147.97:8080/hotme/pics/link.png'
    },
    {
      url: 'https://fedsquare.com/',
      img: 'http://18.180.147.97:8080/hotme/pics/link.png'
    },
    {
      url: 'https://www.zoo.org.au/melbourne/',
      img: 'http://18.180.147.97:8080/hotme/pics/link.png'
    },
    {
      url: 'https://www.unimelb.edu.au/',
      img: 'http://18.180.147.97:8080/hotme/pics/link.png'
    },
    {
      url: 'https://www.oldmelbournegaol.com.au/',
      img: 'http://18.180.147.97:8080/hotme/pics/link.png'
    },
    {
      url: 'https://www.eurekaskydeck.com.au/',
      img: 'http://18.180.147.97:8080/hotme/pics/link.png'
    },
    {
      url: 'https://en.wikipedia.org/wiki/Flinders_Street_railway_station/',
      img: 'http://18.180.147.97:8080/hotme/pics/link.png'
    },
    {
      url: 'https://chinatownmelbourne.com.au/',
      img: 'http://18.180.147.97:8080/hotme/pics/link.png'
    },
    {
      url: 'https://www.rodlaverarena.com.au/',
      img: 'http://18.180.147.97:8080/hotme/pics/link.png'
    },
    {
      url: 'https://www.visitmelbourne.com/regions/Melbourne/Things-to-do/Art-theatre-and-culture/Public-art/VV-Hosier-Lane',
      img: 'http://18.180.147.97:8080/hotme/pics/link.png'
    },
    {
      url: 'https://www.slv.vic.gov.au/',
      img: 'http://18.180.147.97:8080/hotme/pics/link.png'
    },
    {
      url: 'https://museumsvictoria.com.au/',
      img: 'http://18.180.147.97:8080/hotme/pics/link.png'
    },
    {
      url: 'https://cathedral.org.au/',
      img: 'http://18.180.147.97:8080/hotme/pics/link.png'
    },
    {
      url: 'https://www.melbourneaquarium.com.au/',
      img: 'http://18.180.147.97:8080/hotme/pics/link.png'
    },
    {
      url: 'https://www.crownmelbourne.com.au/',
      img: 'http://18.180.147.97:8080/hotme/pics/link.png'
    },
    {
      url: 'https://www.rbg.vic.gov.au/',
      img: 'http://18.180.147.97:8080/hotme/pics/link.png'
    }
  ]
  const listArr = []
  listArr[0] = []
  listArr[1] = []
  listArr[2] = [{
    url: 'javascript:',
    img: 'http://18.180.147.97:8080/hotme/pics/humbleslide01.png',
    title: ''
  }, {
    url: 'javascript:',
    img: 'http://18.180.147.97:8080/hotme/pics/humbleslide02.png',
    title: ''
  }]
  listArr[3] = []
  listArr[4] = [{
    url: 'javascript:',
    img: 'http://18.180.147.97:8080/hotme/pics/nambawanslide01.png',
    title: ''
  }, {
    url: 'javascript:',
    img: 'http://18.180.147.97:8080/hotme/pics/nambawanslide02.jpg',
    title: ''
  }]
  listArr[5] = []
  listArr[6] = [{
    url: 'javascript:',
    img: 'http://18.180.147.97:8080/hotme/pics/nikuslide01.png',
    title: ''
  }, {
    url: 'javascript:',
    img: 'http://18.180.147.97:8080/hotme/pics/nikuslide02.png',
    title: ''
  }, {
    url: 'javascript:',
    img: 'http://18.180.147.97:8080/hotme/pics/nikuslide03.png',
    title: ''
  }]
  listArr[7] = []
  listArr[8] = [{
    url: 'javascript:',
    img: 'http://18.180.147.97:8080/hotme/pics/jangslide01.png',
    title: ''
  }, {
    url: 'javascript:',
    img: 'http://18.180.147.97:8080/hotme/pics/jangslide02.png',
    title: ''
  }]
  listArr[9] = []
  listArr[10] = [{
    url: 'javascript:',
    img: 'http://18.180.147.97:8080/hotme/pics/topteaslide01.jpg',
    title: ''
  }, {
    url: 'javascript:',
    img: 'http://18.180.147.97:8080/hotme/pics/topteaslide02.png',
    title: ''
  }, {
    url: 'javascript:',
    img: 'http://18.180.147.97:8080/hotme/pics/topteaslide03.png',
    title: ''
  }]
  listArr[11] = []
  listArr[12] = [{
    url: 'javascript:',
    img: 'http://18.180.147.97:8080/hotme/pics/unabaraslide01.png',
    title: ''
  }, {
    url: 'javascript:',
    img: 'http://18.180.147.97:8080/hotme/pics/unabaraslide02.png',
    title: ''
  }, {
    url: 'javascript:',
    img: 'http://18.180.147.97:8080/hotme/pics/unabaraslide03.png',
    title: ''
  }]
  listArr[13] = []
  listArr[14] = []
  listArr[15] = []
  export default {
    name: 'abc',
    // <cell :title="`${title}`" link="/a">
    /*
    computed: {
    title () {
      return Vue.i18n.translate('ratings') //'Long'
    }
    */
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
      goback () {
        return Vue.i18n.translate('goback')
      },
      slidList () {
        return listArr[this.paramId]
      },
      paramId () {
        return this.$route.params.data
      },
      isEn () {
        if (Vue.locale.get() === 'en') {
          return true
        } else {
          return false
        }
      }
    },
    watch: {
      eng () {
        this.showStreetView = false
        setTimeout(() => {
          this.showStreetView = true
        }, 90)
        console.log('watch eng')
      }
    },
    data () {
      return {
        positions: [
          {label: '', lat: -37.822501, lng: 144.969325},
          {label: '', lat: -37.8178936, lng: 144.9689882},
          {label: '', lat: -37.7847873, lng: 144.9534259},
          {label: '', lat: -37.7993406, lng: 144.9612954},
          {label: '', lat: -37.807696, lng: 144.965317},
          {label: '', lat: -37.8211815, lng: 144.9647802},
          {label: '', lat: -37.817576, lng: 144.967341},
          {label: '', lat: -37.8117104, lng: 144.9679882},
          {label: '', lat: -37.8211528, lng: 144.9786361},
          {label: '', lat: -37.816747, lng: 144.9691805},
          {label: '', lat: -37.809614, lng: 144.965522},
          {label: '', lat: -37.8038825, lng: 144.9715813},
          {label: '', lat: -37.8175268, lng: 144.9674523},
          {label: '', lat: -37.8209952, lng: 144.9579414},
          {label: '', lat: -37.8242877, lng: 144.9566494},
          {label: '', lat: -37.8305411, lng: 144.9790953},
        ],
        showStreetView: true,
        update: true,
        list1: baseList,
        list2: list(),
        demo2: '美食',
        index: 0,
        locale: '',
        swiper1_index: 0,
        eng: Vue.locale.get(),
        getBarWidth: function (index) {
          return (index + 1) * 22 + 'px'
        }
      }
    },
    created () {
      this.$bus.on('changeLang', (locale) => {
        this.eng = locale
        // console.log('Change Lang: ' + this.locale)
      });
    },
    methods: {
      visitSite (id) {
        // window.location.href = linkArr[id].url
        window.open(linkArr[id].url, '_blank')
        console.log('Click ID: ' + id)
      },
      playGame () {
        this.$router.push('game')
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
  @import '../../styles/1px.less';
  @import '../../styles/center.less';
  @import url('https://fonts.googleapis.com/css?family=Baloo+Tammudu+2|Grandstander|Roboto+Condensed|Lobster|Montserrat|Cabin|Herr+Von+Muellerhoff|Source+Sans+Pro:400,900&display=swap');
  #pano {
    margin: 20px auto;
    left: 0vw;
    width: 90vw;
    height: 95vw;
  }
  .box {
    padding: 15px;
  }
  .tab-swiper {
    background-color: #fff;
    padding-top: 100px;
    height: 100px;
  }
  .content-container {
    margin: 20px 20px 0 20px;
    text-align: left;
    .enPara {
      font-family: 'Baloo Tammudu 2', sans-serif;
      font-weight: 500;
      font-size: 1.5rem;
      .title {
        text-align: center;
        font-size: 2.0rem;
        border-bottom: 1px solid #3c763d;
      }
      .address {
        margin-top: 10px;
        margin-bottom: 10px;
        display: flex;
        border-bottom: 1px solid #3c763d;
        text-align: center;
        img {
          display: inline-block;
          vertical-align: middle;
          width: 32px;
          height: 48px;
          flex: 0 1 40px;
          animation: scale 1.5s cubic-bezier(0.8,-1.9,0.5,-1.4) infinite;
        }
        .linkImg {
          img {
            display: inline-block;
            vertical-align: middle;
            width: 24px;
            height: 24px;
            flex: 0 1 40px;
            animation: scale 1.5s cubic-bezier(0.8,-1.9,0.5,-1.4) infinite;
          }
        }
        .addrtxt {
          flex: 1;
          margin-left: 10px;
          display: inline-block;
          font-size: 1.5rem;
          font-weight: 700
        }
      }
    }
    .zhPara {
      font-family: 'Baloo Tammudu 2', sans-serif;
      font-weight: 500;
      font-size: 1.5rem;
      p {
        text-indent: 2em;
      }
      .title {
        text-align: center;
        font-size: 2.0rem;
        border-bottom: 1px solid #3c763d;
      }
      .address {
        margin-top: 10px;
        margin-bottom: 10px;
        display: flex;
        border-bottom: 1px solid #3c763d;
        img {
          display: inline-block;
          vertical-align: middle;
          width: 32px;
          height: 48px;
          flex: 0 1 40px;
          animation: scale 1.5s cubic-bezier(0.8,-1.9,0.5,-1.4) infinite;
        }
        .linkImg {
          img {
            display: inline-block;
            vertical-align: middle;
            width: 24px;
            height: 24px;
            flex: 0 1 40px;
            animation: scale 1.5s cubic-bezier(0.8,-1.9,0.5,-1.4) infinite;
          }
        }
        .addrtxt {
          flex: 1;
          margin-left: 10px;
          display: inline-block;
          font-size: 1.5rem;
          font-weight: 700;
        }
      }
    }
  }
  .swiper-container {
    //background: url("./homebkg1.jpg");
    background-size: 100% 2500px;
    background-repeat: repeat-y;
    background-origin: content-box;
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
    overflow-y: hidden
  }
  .btn {
    background: #6d9eeb;
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
  @keyframes scale {
    0% {
      transform: scale(1.2);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
</style>
