<template>
  <div class="dataMain">
    <div class="title">
      {{'Statistic Analysis' | translate}}
    </div>
    <div class="born">
      {{'born' | translate}}
    </div>
    <div class="charttitle">{{'linetitle' | translate}}</div>
    <div class="chart2" v-if="eng==='en'">
      <lchart ref =lchart :chart-data="ldata" :llegend="llegend"/>
    </div>
    <div class="chart4" v-if="eng==='zh-CN'">
      <clchart ref =clchart :chart-data="cldata" :llegend="cllegend"/>
    </div>
    <div class="engskill">
      {{'engskill' | translate}}
    </div>
    <div class="charttitle">{{'pietitle' | translate}}</div>
    <div class="chart1"  v-if="eng==='en'">
      <lpie ref="pchart" :pdata="pdata" :plegend="plegend" :name="name"/>
    </div>
    <div class="chart1"  v-if="eng==='zh-CN'">
      <clpie ref="cpchart" :pdata="cpdata" :plegend="cplegend" :name="name"/>
    </div>
    <div class="culture">
      {{'culture' | translate}}
    </div>
    <div class="charttitle">{{'bartitle' | translate}}</div>
    <div  class="chart3" v-if="eng==='en'">
      <bchart ref="bchart" :chart-data="bdata" :blegend="blegend"/>
    </div>
    <div  class="chart3" v-if="eng==='zh-CN'">
      <cbchart ref="cbchart" :chart-data="cbdata" :blegend="cblegend"/>
    </div>
  </div>
</template>
<i18n>
  born:
    zh-CN: 从这些2016年已公开的数据上来看，亚裔人口有一个明显的提升。
    en: These open data were released by the Australian Bureau of Statistics in 2016. Visualization shows that there was an obvious growth of the Asian-borned population.
  engskill:
    zh-CN: 根据这个饼图，我们看到有大多数的人口没有很好的英语技能。然而很多属于EAL能很好的理解墨尔本文化。
    en: Meanwhile, according to this pie chart, we can find that a large proportion of the population does not have good English skills. Many of them belong to the EAL group. Therefore, we provide a language switch to help EAL groups have a better understanding of Melbourne culture.
  culture:
    zh-CN: 从这个图可以看到维多利亚州儿童（5-14岁）喜欢选择什么样的文化。我们在这个游戏里选择了多种聚会形式。
    en: From this chart, we can clearly see that for Australian teenagers(Aged 5-14 years) in VIC,  what kinds of cultural venues and events are they preferred to select. According to this chart, we select several cultural venues as feature units in our game.
  linetitle:
    zh-CN: 出生地曲线图
    en: Place of birth line chart!
  bartitle:
    zh-CN: 文化背景柱状图
    en: Culture background bar chart!
  pietitle:
    zh-CN: 英语技能饼状图
    en: English skill pie chart!
  Statistic Analysis:
    zh-CN: 静态分析
    en: Statistic Analysis
  My Account:
    zh-CN: 我的账号
    en: My Account
</i18n>
<script>
  // import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem } from 'vux'
  import lchart from '../echart/lchart'
  import clchart from '../echart/clchart'
  import lpie from '../echart/lpie'
  import clpie from '../echart/clpie'
  import cbchart from '../echart/cbchart'
  import bchart from '../echart/bchart'
  import { getborn, getengskill, getculture } from '../../common/js/getdata'
  import Vue from 'vue'
  export default {
    name: 'showdata',
    components: {
      clchart,
      lchart,
      clpie,
      lpie,
      cbchart,
      bchart
    },
    created () {
      this.$bus.on('changeLang', (locale) => {
        this.eng = locale
        // console.log('Change Lang: ' + this.locale)
      })
      getborn().then(response => {
        if (response.data.length > 0) {
          for (let i = 0; i < response.data.length; i++) {
            if (this.eng === 'en') {
            } else {
            }
            this.ldata.expectedData[i] = response.data[i]['asian_Born_Total']
            this.ldata.actualData[i] = response.data[i]['eu_Born_Total']
            this.ldata.axislabel[i] = response.data[i]['age_group']
            this.cldata.expectedData[i] = response.data[i]['asian_Born_Total']
            this.cldata.actualData[i] = response.data[i]['eu_Born_Total']
            this.cldata.axislabel[i] = response.data[i]['cAge_group']
          }
        } else {
          this.ldata.expectedData = []
          this.ldata.actualData = []
          this.ldata.axislabel = []
          this.cldata.expectedData = []
          this.cldata.actualData = []
          this.cldata.axislabel = []
          this.ldata.expectedData[0] = 100
          this.ldata.actualData[0] = 100
          this.ldata.axislabel[0] = 'Database Connection Broken'
          this.llegend[0] = 'Database Connection Broken'
          this.llegend[1] = 'Database Connection Broken'
          this.cldata.expectedData[0] = 100
          this.cldata.actualData[0] = 100
          this.cldata.axislabel[0] = '数据库链接有误'
          this.cllegend[0] = '数据库链接有误'
          this.cllegend[1] = '数据库链接有误'
        }
        if (this.eng === 'en') {
          this.$refs.lchart.setOptions(this.ldata, this.llegend)
        } else {
          this.$refs.clchart.setOptions(this.cldata, this.cllegend)
        }
        // console.log(this.ldata)
        // console.log('born: ' + JSON.stringify(response.data))
      }).catch(() => {
        this.ldata.expectedData = []
        this.ldata.actualData = []
        this.ldata.axislabel = []
        this.cldata.expectedData = []
        this.cldata.actualData = []
        this.cldata.axislabel = []
        this.ldata.expectedData[0] = 100
        this.ldata.actualData[0] = 100
        this.ldata.axislabel[0] = 'Database Connection Broken'
        this.llegend[0] = 'Database Connection Broken'
        this.llegend[1] = 'Database Connection Broken'
        this.cldata.expectedData[0] = 100
        this.cldata.actualData[0] = 100
        this.cldata.axislabel[0] = '数据库链接有误'
        this.cllegend[0] = '数据库链接有误'
        this.cllegend[1] = '数据库链接有误'
        if (this.eng === 'en') {
          this.$refs.lchart.setOptions(this.ldata, this.llegend)
        } else {
          this.$refs.clchart.setOptions(this.cldata, this.cllegend)
        }
        console.log('Con not get Data')
      })
      getculture().then(response => {
        if (response.data.length > 0) {
          for (let i = 0; i < response.data.length; i++) {
            this.bdata.expectedData[i] = response.data[i]['quantity']
            this.bdata.axislabel[i] = response.data[i]['name']
            this.cbdata.expectedData[i] = response.data[i]['quantity']
            this.cbdata.axislabel[i] = response.data[i]['cname']
          }
        } else {
          this.bdata.expectedData = []
          this.bdata.axislabel = []
          this.bdata.expectedData[0] = 10
          this.bdata.axislabel = ['Database Connection Broken']
          this.cbdata.expectedData = []
          this.cbdata.axislabel = []
          this.cbdata.expectedData[0] = 10
          this.cbdata.axislabel = ['数据库链接有误']
        }
        if (this.eng === 'en') {
          this.$refs.bchart.setOptions(this.bdata, this.blegend)
        } else {
          this.$refs.cbchart.setOptions(this.cbdata, this.cblegend)
        }
        // this.$refs.cbchart.setOptions(this.cbdata, this.cblegend)
        // console.log('culture: ' + JSON.stringify(response.data))
      }).catch(() => {
        this.bdata.expectedData = []
        this.bdata.axislabel = []
        this.bdata.expectedData[0] = 10
        this.bdata.axislabel = ['Database Connection Broken']
        this.cbdata.expectedData = []
        this.cbdata.axislabel = []
        this.cbdata.expectedData[0] = 10
        this.cbdata.axislabel = ['数据库链接有误']
        if (this.eng === 'en') {
          this.$refs.bchart.setOptions(this.bdata, this.blegend)
        } else {
          this.$refs.cbchart.setOptions(this.cbdata, this.cblegend)
        }
        console.log('culture get bad')
      })
      getengskill().then(response => {
        console.log(response.data.length)
        if (response.data.length > 0) {
          for (let i = 0; i < response.data.length; i++) {
            this.pdata[i].value = response.data[i].quantity
            this.pdata[i].name = response.data[i].proficiency
            this.plegend[i] = response.data[i].proficiency
            this.cpdata[i].value = response.data[i].quantity
            this.cpdata[i].name = response.data[i].cProficiency
            this.cplegend[i] = response.data[i].cProficiency
            // this.pdata[i].value = response.data[i].quantity
          }
          this.pdatlen = true;
        } else {
          this.pdata = []
          this.plegend = []
          this.pdata = [{name: 'Database Connection Broken', value: 50}]
          this.plegend = ['Database Connection Broken']
          this.pdatlen = false;
          this.cpdata = []
          this.cplegend = []
          this.cpdata = [{name: '数据库链接有误', value: 50}]
          this.cplegend = ['数据库链接有误']
          this.pdatlen = false;
        }
        // this.$refs.pchart.initChart();
        this.$refs.pchart.setOptions(this.pdata, this.plegend)
        this.$refs.cpchart.setOptions(this.cpdata, this.cplegend)
      })
    },
    watch: {
      eng () {
        console.log('watch eng')
      }
    },
    data () {
      return {
        eng: Vue.locale.get(),
        ldata: {
          expectedData: [714, 632, 739, 2644, 4998, 1468, 7435, 7014, 1344, 150],
          actualData: [928, 304, 55, 89, 259, 134, 872, 390, 417, 660],
          axislabel: ['0-4years', '5-9years', '10-14years', '15-19years', '20-24years', '25-29years', '30-34years', '35-39years', '40-44years', '45-49years']
        },
        cldata: {
          expectedData: [714, 632, 739, 2644, 4998, 1468, 7435, 7014, 1344, 150],
          actualData: [928, 304, 55, 89, 259, 134, 872, 390, 417, 660],
          axislabel: ['0-4岁', '5-9岁', '10-14岁', '15-19岁', '20-24岁', '25-29岁', '30-34岁', '35-39岁', '40-44岁', '45-49岁']
        },
        bdata: {
          expectedData: [0.8, 0.9, 0.6, 0.8, 0.1, 0.8, 1.0, 0.2, 2.0],
          actualData: [0, 0, 0, 0, 0, 0, 0, 0, 0],
          axislabel: ['Art galleries', 'Museums', 'Libraries and archives', 'Live music concerts and performances', 'Theatre performances', 'Dance performances', 'Musicals and operas', 'Other performing arts', 'Cinemas and drive-ins']
        },
        cbdata: {
          expectedData: [0.8, 0.9, 0.6, 0.8, 0.1, 0.8, 1.0, 0.2, 2.0],
          actualData: [0, 0, 0, 0, 0, 0, 0, 0, 0],
          axislabel: ['美术馆', '展览馆', '图书馆', '现场音乐和表演', '戏剧表演', '舞蹈表演', '音乐和歌剧', '其它表演艺术', '电影及露天电影']
        },
        pdatlen: false,
        pdata: [
          { value: 100, name: 'Very well' },
          { value: 100, name: 'Well' },
          { value: 100, name: 'Not well' },
          { value: 100, name: 'Not at all' },
          { value: 100, name: 'Not stated' },
          { value: 100, name: 'ENGP Not Stated' }
        ],
        cpdata: [
          { value: 100, name: '很好' },
          { value: 100, name: '好' },
          { value: 100, name: '不好' },
          { value: 100, name: '一点不会说' },
          { value: 100, name: '没说明' },
          { value: 100, name: 'ENGP 没说' },
          { value: 100, name: '总计' }
        ],
        plegend: ['Very well', 'Well', 'Not well', 'Not at all', 'Not stated', 'ENGP Not Stated', 'Total'],
        cplegend: ['很好', '好', '不好', '一点不会说', '没说明', 'ENGP 没说', '总计'],
        llegend: ['Asian-Born Populations', 'European-Born Populations'],
        cllegend: ['亚洲出生人口', '欧洲出生人口'],
        blegend: ['Culture', ''],
        cblegend: ['文化', ''],
        img1: require('./ana1.jpg'),
        img2: require('./ana2.jpg'),
        name: ''
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
      font-weight: 700;
      font-size: 2.0rem;
      text-align: center;
      margin-top: 30px;
    }
    .engskill {
      font-family: 'Baloo Tammudu 2', sans-serif;
      font-weight: 600;
      text-align: center;
      width: 90%;
      margin: auto auto;
    }
    .charttitle {
      font-family: 'Grandstander', cursive;
      font-weight: 700;
      text-align: center;
      font-size: 1.2rem;
      margin: 10px 0 -30px 0;
      color: rgba(240, 20, 20, 0.8)
    }
    .born {
      font-family: 'Baloo Tammudu 2', sans-serif;
      font-weight: 600;
      text-align: center;
      width: 90%;
      margin: auto auto;
    }
    .culture {
      font-family: 'Baloo Tammudu 2', sans-serif;
      font-weight: 600;
      text-align: center;
      width: 90%;
      margin: auto auto;
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
    .chart1 {
      margin: 0px auto;
    }
    .chart2 {
      width: 90%;
      margin: 0px auto 30px;
    }
    .chart4 {
      margin: 0px auto 30px;
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
