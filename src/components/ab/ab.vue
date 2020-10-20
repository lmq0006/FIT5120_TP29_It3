<template>
  <div>
    <div>
      <swiper v-if="eng==='zh-CN'" v-model="index" width="90%" :height="`${swiperheight}px`" ref="swi" :show-dots="true">
        <swiper-item class="swiperTab" v-for="(item, index) in list" :key="index">
          <!-- <div class="tab-swiper vux-center">{{item}} Container</div> -->
          <div ref="sliderGroup"
            class="weui-media-box weui-media-box_text"
          >
            <div >
              <div class="weui-media-box__hd" v-if="list[index].src">
                <img
                  class="weui-media-box__thumb"
                  @error="onImgError(list[index], $event)"
                  :src="list[index].src"
                  alt
                >
              </div>
              <div class="weui-media-box__bd">
                <p>
                  <span class="" v-html="list[index].title"> </span>
                </p>
              </div>
            </div>
            <ul class="weui-media-box__info" v-for="(descitem,ind) in list[index].desclist" v-if="descitem.desc">
              <div class="xuangroup"  @click.prevent="onXuanClick(index,ind,descitem)">
                <div class="xuantitle">{{xuanTitle[ind]}}</div>
                <li class="weui-media-box__info__meta"  v-html="descitem.desc"></li>
              </div>
            </ul>
            <group style="margin: 0 auto;" title="">
              <x-button style="width: 80%;" @click.native.prevent="confirm" type="primary">{{'GameConfirm' | translate}}</x-button>
            </group>
          </div>
        </swiper-item>
      </swiper>
      <swiper v-if="eng==='en'" v-model="index" width="90%" :height="`${swiperheight}px`" ref="swi" :show-dots="true">
        <swiper-item class="swiperTab" v-for="(item, index) in listEn" :key="index">
          <!-- <div class="tab-swiper vux-center">{{item}} Container</div> -->
          <div ref="sliderGroup"
               class="weui-media-box weui-media-box_text"
          >
            <div >
              <div class="weui-media-box__hd" v-if="listEn[index].src">
                <img
                  class="weui-media-box__thumb"
                  @error="onImgError(list[index], $event)"
                  :src="list[index].src"
                  alt
                >
              </div>
              <div class="weui-media-box__bd">
                <p>
                  <span class="" v-html="listEn[index].title"> </span>
                </p>
              </div>
            </div>
            <ul class="weui-media-box__info" v-for="(descitem,ind) in listEn[index].desclist" v-if="descitem.desc">
              <div class="xuangroup"  @click.prevent="onXuanClick(index,ind,descitem)">
                <div class="xuantitle">{{xuanTitle[ind]}}</div>
                <li class="weui-media-box__info__meta"  v-html="descitem.desc"></li>
              </div>
            </ul>
            <group style="margin: 0 auto;" title="">
              <x-button v-show="confirmAnswer0" ref="btn" :disabled="confirmAnswer[index]" style="width: 80%;" @click.native.prevent="confirmAns" type="primary">{{'GameConfirm' | translate}}</x-button>
            </group>
          </div>
        </swiper-item>
      </swiper>
    </div>
    <div v-show="!confirmAnswer[index]" class="answerHint" v-html="answerHint[0]">
    </div>
    <div v-show="confirmAnswer[index]" class="answerHint" v-html="answerHint[index+1]">
    </div>
    <x-button class="btn" @click.native="goBack">Go back to Game!</x-button>
  </div>
</template>

<script>
  // import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem } from 'vux'
  import { Tab, TabItem } from '../../components/tab'
  import Sticky from '../../components/sticky'
  import Divider from '../../components/divider'
  import XButton from '../../components/x-button'
  import { Swiper, SwiperItem } from '../../components/swiper'
  import Group from '../../components/group'
  import Vue from 'vue'
  export default {
    components: {
      Tab,
      TabItem,
      Sticky,
      Divider,
      XButton,
      Swiper,
      SwiperItem,
      Group
    },
    data () {
      return {
        hint0: true,
        confirmAnswer0: true,
        confirmAnswer: [false, false, false, false, false],
        eng: Vue.locale.get(),
        swiperheight: 420,
        answerHint: [
          '为你提示题目的目的及标准答案',
          '澳大利亚是海洋性国家，一年有分明的四季',
          '澳大利是海洋国家，其陆地不和任何国家接壤',
          '袋鼠及考拉是澳大利亚的独有的动物种类，广泛分布于澳大利亚各地，受到全世界人民的喜爱',
          '澳大利亚属于西方世界国家，其饮食习惯和东方有明显的区别',
          '澳大利亚最著名的大学是墨尔本大学，其在世界上都很知名'
        ],
        answerHintEn: [
          'provide you correct answers',
          'Australia 澳大利亚是海洋性国家，一年有分明的四季',
          'Australia 澳大利是海洋国家，其陆地不和任何国家接壤',
          'Australia 袋鼠及考拉是澳大利亚的独有的动物种类，广泛分布于澳大利亚各地，受到全世界人民的喜爱',
          'Australia 澳大利亚属于西方世界国家，其饮食习惯和东方有明显的区别',
          'Australia 澳大利亚最著名的大学是墨尔本大学，其在世界上都很知名'
        ],
        list: [
          {
            title: '有关于澳大利亚的几个传说，下面那个是对的',
            answer: 'B',
            getanswer: '',
            score: '4',
            getscore: '',
            timutype: 0,
            desclist: [
              { desc: '澳大利亚没有明显的四季区分' },
              { desc: '澳大利亚的动物都是有带类动物' },
              { desc: '澳大利亚处于南半球' },
              { desc: '澳大利亚是发展中国家' },
              { desc: '澳大利亚是个人口众多的国家' }
            ],
            url: '/component/cell'

          }, {
            title: '澳大利于和那个国家接壤',
            answer: 'A',
            getanswer: '',
            score: '4',
            getscore: '',
            timutype: 0,
            desclist: [
              { desc: '日本' },
              { desc: '韩国' },
              { desc: '菲律宾' },
              { desc: '马来西亚' },
              { desc: '' }
            ],
            url: {
              path: '/component/radio',
              replace: false
            }
          }, {
            title: '澳大利亚的国家动物是',
            answer: 'CA',
            getanswer: '',
            score: '4',
            getscore: '',
            timutype: 1,
            desclist: [
              { desc: '袋鼠' },
              { desc: '澳洲野狗' },
              { desc: '考拉' },
              { desc: '比目鱼' },
              { desc: '' }
            ],
            url: {
              path: '/component/radio',
              replace: false
            }
          }, {
            title: '澳大利亚美食',
            answer: 'DAB',
            getanswer: '',
            score: '4',
            getscore: '',
            timutype: 1,
            desclist: [
              { desc: '西餐' },
              { desc: '披萨' },
              { desc: '大米' },
              { desc: '面包' },
              { desc: '' }
            ],
            url: {
              path: '/component/radio',
              replace: false
            }
          }, {
            src: '',
            title: '澳大利亚最著名的大学',
            answer: 'B',
            getanswer: '',
            score: '4',
            getscore: '',
            timutype: 2,
            desclist: [
              { desc: '迪肯大学' },
              { desc: '墨尔本大学' },
              { desc: '墨尔本科技大学' }
            ],
            url: {
              path: '/component/radio',
              replace: false
            }
          }
        ],
        listEn: [
          {
            title: 'About Australia which item is correct',
            answer: 'B',
            getanswer: '',
            score: '4',
            getscore: '',
            timutype: 0,
            desclist: [
              { desc: 'There is four senson in Australia' },
              { desc: 'All animails of Australia is kangroo' },
              { desc: 'Australia is of north half earth' },
              { desc: 'Australia is developing country' },
              { desc: 'There is great population in Australia' }
            ],
            url: '/component/cell'

          }, {
            title: 'Which country is Australia near ',
            answer: 'A',
            getanswer: '',
            score: '4',
            getscore: '',
            timutype: 0,
            desclist: [
              { desc: 'Japan' },
              { desc: 'Korean' },
              { desc: 'Philipen' },
              { desc: 'Maylia' },
              { desc: '' }
            ],
            url: {
              path: '/component/radio',
              replace: false
            }
          }, {
            title: 'Australian animals is',
            answer: 'CA',
            getanswer: '',
            score: '4',
            getscore: '',
            timutype: 1,
            desclist: [
              { desc: 'kangruoo' },
              { desc: 'Auatralia wild dog' },
              { desc: 'Kaola' },
              { desc: 'Bimu Fish' },
              { desc: '' }
            ],
            url: {
              path: '/component/radio',
              replace: false
            }
          }, {
            title: 'Australis Delicious',
            answer: 'DAB',
            getanswer: '',
            score: '4',
            getscore: '',
            timutype: 1,
            desclist: [
              { desc: 'West Food' },
              { desc: 'Pizza' },
              { desc: 'Rice' },
              { desc: 'Bread' },
              { desc: '' }
            ],
            url: {
              path: '/component/radio',
              replace: false
            }
          }, {
            src: '',
            title: 'Australia Most famous university',
            answer: 'B',
            getanswer: '',
            score: '4',
            getscore: '',
            timutype: 2,
            desclist: [
              { desc: 'Diken University' },
              { desc: 'Melburun University' },
              { desc: 'Melburun Science University' }
            ],
            url: {
              path: '/component/radio',
              replace: false
            }
          }
        ],
        index: 0,
        swiper1_index: 0,
        getBarWidth: function (index) {
          return (index + 1) * 22 + 'px'
        },
        shitiTitleEn: ['Quiz One:', 'Quiz Two:', 'Quiz Three:', 'Quiz Four:', 'Quiz Five:', 'Quiz Six:', 'Quiz Seven:', 'Quiz Eight:', 'Quiz Nine:', 'Quiz Ten:',
          'Quiz Eleven:', 'Quiz Twelve:', 'Quiz Thirteen:', 'Quiz Fourteen:', 'Quiz Fifteen:', '试题十六：', '试题十七：', '试题十八：', '试题十九：', '试题二十：',
          '试题二十一：', '试题二十二：', '试题二十三：', '试题试题二十四：', '试题二十五：', '试题试题二十六：', '试题二十七：', '试题二十八：', '试题二十九：', '试题三十：',
          '试题三十一：', '试题三十二：', '试题三十三：', '试题三十四：', '试题三十五：', '试题三十六：', '试题三十七：', '试题三十八：', '试题三十九：', '试题四十：',
          '试题四十一：', '试题四十二：', '试题四十三：', '试题四十四：', '试题四十五：', '试题四十六：', '试题四十七：', '试题四十八：', '试题四十九：', '试题五十：',
          '试题五十一：', '试题五十二：', '试题五十三：', '试题五十四：', '试题五十五：', '试题五十六：', '试题五十七：', '试题五十八：', '试题五十九：', '试题六十：',
          '试题六十一：', '试题六十二：', '试题六十三：', '试题六十四：', '试题六十五：', '试题六十六：', '试题六十七：', '试题六十八：', '试题六十九：', '试题七十：',
          '试题七十一：', '试题七十二：', '试题七十三：', '试题七十四：', '试题七十五：', '试题七十六：', '试题七十七：', '试题七十八：', '试题七十九：', '试题八十：',
          '试题八十一：', '试题八十二：', '试题八十三：', '试题八十四：', '试题八十五：', '试题八十六：', '试题八十七：', '试题八十八：', '试题八十九：', '试题九十：',
          '试题九十一：', '试题九十二：', '试题九十三：', '试题九十四：', '试题九十五：', '试题九十六：', '试题九十七：', '试题九十八：', '试题九十九：', '试题一百：' ],
        xuanTitle: ['A： ', 'B： ', 'C： ', 'D： ', 'E： ', 'F： ', 'G： ', 'H： ', 'I： ', 'J： ', 'K： ', 'L： ', 'M： ', 'N： ', 'O： ', 'P： ', 'Q： ', 'R： ', 'S： ', 'T： ', 'U： ', 'V： ', 'W： ', 'X： ', 'Y： ', 'Z： '],
        shitiTitle: ['试题一：', '试题二：', '试题三：', '试题四：', '试题五：', '试题六：', '试题七：', '试题八：', '试题九：', '试题十：',
          '试题十一：', '试题十二：', '试题十三：', '试题十四：', '试题十五：', '试题十六：', '试题十七：', '试题十八：', '试题十九：', '试题二十：',
          '试题二十一：', '试题二十二：', '试题二十三：', '试题试题二十四：', '试题二十五：', '试题试题二十六：', '试题二十七：', '试题二十八：', '试题二十九：', '试题三十：',
          '试题三十一：', '试题三十二：', '试题三十三：', '试题三十四：', '试题三十五：', '试题三十六：', '试题三十七：', '试题三十八：', '试题三十九：', '试题四十：',
          '试题四十一：', '试题四十二：', '试题四十三：', '试题四十四：', '试题四十五：', '试题四十六：', '试题四十七：', '试题四十八：', '试题四十九：', '试题五十：',
          '试题五十一：', '试题五十二：', '试题五十三：', '试题五十四：', '试题五十五：', '试题五十六：', '试题五十七：', '试题五十八：', '试题五十九：', '试题六十：',
          '试题六十一：', '试题六十二：', '试题六十三：', '试题六十四：', '试题六十五：', '试题六十六：', '试题六十七：', '试题六十八：', '试题六十九：', '试题七十：',
          '试题七十一：', '试题七十二：', '试题七十三：', '试题七十四：', '试题七十五：', '试题七十六：', '试题七十七：', '试题七十八：', '试题七十九：', '试题八十：',
          '试题八十一：', '试题八十二：', '试题八十三：', '试题八十四：', '试题八十五：', '试题八十六：', '试题八十七：', '试题八十八：', '试题八十九：', '试题九十：',
          '试题九十一：', '试题九十二：', '试题九十三：', '试题九十四：', '试题九十五：', '试题九十六：', '试题九十七：', '试题九十八：', '试题九十九：', '试题一百：' ],
        timu: ['单选题：', '多选题：', '判断题：'],
        timuEn: ['Single Selection:', 'Multiple Selection:', 'Correct:']
      }
    },
    methods: {
      confirmAns () {
        this.confirmAnswer[this.index] = true
        this.confirmAnswer0 = false
        setTimeout(() => {
          this.confirmAnswer0 = true
        }, 5)
        console.log(this.confirmAnswer[this.index])
      },
      onImgError (item, $event) {
        this.$emit('on-img-error', JSON.parse(JSON.stringify(item)), $event);
        if (item.fallbackSrc) {
          $event.target.src = item.fallbackSrc;
        }
      },
      onXuanClick (index, ind, descitem) {
        // console.log('the index is:' + index)
        // console.log('the ind is:' + ind)
        // console.log('the click is:' + descitem.index)
        this.list[index].title = this.list[index].title.split('(')[0]
        // this.list[index].getanswer = this.xuanTitle[ind].split('：')[0]
        if (this.list[index].timutype === 0 || this.list[index].timutype === 2) {
          this.list[index].getanswer.trim()
          this.list[index].getanswer = this.xuanTitle[ind].split('：')[0]
        } else if (this.list[index].timutype === 1) {
          this.list[index].getanswer.trim()
          if (!this.list[index].getanswer.includes(this.xuanTitle[ind].split('：')[0])) {
            this.list[index].getanswer = this.list[index].getanswer + this.xuanTitle[ind].split('：')[0]
          } else {
            let iiidn = this.list[index].getanswer.indexOf(this.xuanTitle[ind].split('：')[0])
            console.log('the iiidn is:' + iiidn)
            this.list[index].getanswer = this.list[index].getanswer.slice(0, iiidn) + this.list[index].getanswer.slice(iiidn + 1)
          }
        }
        let ss = this.list[index].getanswer.split('')
        this.list[index].getanswer = ss.sort().join('')
        let tt = this.list[index].answer.split('')
        this.list[index].answer = tt.sort().join('')
        if (this.list[index].getanswer === this.list[index].answer){
          this.list[index].getscore = this.list[index].score
          console.log('get score:' + this.list[index].getscore)
        } else {
          this.list[index].getscore = 0
          console.log('get score:' + this.list[index].getscore)
        }

        this.list[index].title = this.list[index].title + '( '+ this.timu[this.list[index].timutype]+ this.list[index].score + '分)'+'('  + this.list[index].getanswer + ')'
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
        if (this.index === this.list.length - 1) {
          this.index = 0
        } else {
          ++this.index
        }
      },
      prev () {
        if (this.index === 0) {
          this.index = this.list.length - 1
        } else {
          --this.index
        }
      }
    },
    mounted () {
      // this.currentValue = parseInt(this.list.value);
      // this.currentValue = 1
      // console.log('the url : ' +  getUrl(this.list[1].url))
      for (let ii = 0; ii < this.list.length; ii++) {
        this.list[ii].title = this.shitiTitle[ii] + this.list[ii].title + '( ' + this.timu[this.list[ii].timutype] + this.list[ii].score + '分)' + '(   )'
        let desctemp = [...this.list[ii].desclist]
        for (let jj = 0; jj < this.list[ii].desclist.length; jj++) {
          if (this.list[ii].desclist[jj].desc) {
            this.list[ii].desclist[jj].desc = this.list[ii].desclist[jj].desc;
            console.log(this.list[ii].desclist[jj].desc)
          }
        }
      }
      for (let ii = 0; ii < this.listEn.length; ii++) {
        this.listEn[ii].title = this.shitiTitleEn[ii] + ' ' + this.listEn[ii].title + '( ' + this.timuEn[this.listEn[ii].timutype] + this.listEn[ii].score + 'S)' + '(   )'
        let desctemp = [...this.listEn[ii].desclist]
        for (let jj = 0; jj < this.listEn[ii].desclist.length; jj++) {
          if (this.listEn[ii].desclist[jj].desc) {
            this.listEn[ii].desclist[jj].desc = this.listEn[ii].desclist[jj].desc;
            console.log(this.listEn[ii].desclist[jj].desc)
          }
        }
      }
      setTimeout(() => {
        this.children = this.$refs.sliderGroup.children
        this.swiperheight = this.$refs.sliderGroup[this.index].clientHeight
        // this.showSwiper = false
        /* setTimeout(() => {
          this.showSwiper = true
        }, 20) */
        this.$refs.swi.$el.style.height = this.swiperheight + 10 + 'px'
      }, 40)
      // this.updateStyle()
    },
    created () {
      // console.log('Created    lllll: ')
      this.$bus.on('changeLang', (locale) => {
        this.eng = locale
        // this.lang = locale
        // console.log('Change Lang: ' + this.locale)
      })
    },
    watch: {
      eng () {
        console.log('watch eng')
      },
      index () {
        this.children = this.$refs.sliderGroup.children
        this.swiperheight = this.$refs.sliderGroup[this.index].clientHeight
        // this.showSwiper = false
        /* setTimeout(() => {
          this.showSwiper = true
        }, 20) */
        this.$refs.swi.$el.style.height = this.swiperheight + 10 + 'px'
        // this.$refs.swi.height = this.swiperheight + 'px'
        console.log(this.$refs.swi)
        console.log(this.$refs.sliderGroup[this.index].clientHeight)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../styles/weui/widget/weui_cell/weui_cell_global";
  @import "../../styles/weui/widget/weui_cell/weui_access";
  @import "../../styles/weui/widget/weui_panel/weui_panel";
  @import "../../styles/weui/widget/weui_media_box/weui_media_box";

  @import '../../styles/1px.less';
  @import '../../styles/center.less';

  .box {
    padding: 15px;
  }
  .tab-swiper {
    background-color: #fff;
    height: 100px;
  }
  .swiperTab {
    overflow-y: auto
  }
  .weui-media-box__bd {
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: 400;
  }
  .weui-media-box__desc {
    color: rgba(20, 20, 20, 1);
    margin-bottom: 25px;
    font-size: 18px;
    font-weight: 400;
    overflow: inherit;
    white-space: revert;
    text-overflow: unset;
  }
  .weui-media-box__info {
    color: rgba(60, 60, 60, 1);
    margin-bottom: 0px;
    font-size: 15px;
    font-weight: 400;
    line-height: 20px;
    overflow: inherit;
    white-space: revert;
    text-overflow: unset;
    .xuangroup {
      margin-bottom: 0px;
      display: flex;
      .xuantitle {
        flex: 0 0 10px;
      }
      .weui-media-box__info__meta {
        flex: 1;
      }
    }
  }
  .btn {
    position: absolute;
    bottom: 0px
  }
  .vux-rater {
    text-align: left;
    display: inline-block;
    line-height: normal;
    text-align: center;
    align: center;
  }
  .vux-rater a {
    display: inline-block;
    text-align: center;
    cursor: pointer;
    color: #ccc;
  }
  .vux-rater a:last-child {
    padding-right: 2px !important;
    margin-right: 0px !important;
  }
  .vux-rater a:hover {
    color: #ffdd99;
  }
  .vux-rater a.is-disabled {
    color: #ccc !important;
    cursor: not-allowed;
  }
  .vux-rater-box {
    position: relative;
  }
  .vux-rater-inner {
    position: relative;
    display: inline-block;
  }
  .vux-rater-outer {
    position: absolute;
    left: 0;
    top: 0;
    display: inline-block;
    overflow: hidden;
  }
</style>
