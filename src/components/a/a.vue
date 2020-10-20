<template>
  <div style="height:100%;">
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
              <div class="xuangroup1"  @click.prevent="onXuanClick(index,ind,descitem)">
                <check-icon class="xuangroup" @click.native="clickSelection('ZH',index,ind)" :value.sync="descitem.mode">
                  <span class="xuantitle"></span>
                  <li class="weui-media-box__info__meta"  v-html="descitem.desc"></li>
                </check-icon>
              </div>
            </ul>
            <group style="margin: 0 auto;" title="">
              <x-button v-show="confirmAnswer0" ref="btn" :disabled="confirmAnswer[index]" style="width: 80%;" @click.native.prevent="confirmAns(index)" type="primary">{{'GameConfirm' | translate}}</x-button>
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
              <div v-show="refre" class="xuangroup1"  @click.prevent="onXuanClickEn(index,ind,descitem)">
                <check-icon class="xuangroup" @click.native="clickSelection('EN',index,ind)" :value.sync="descitem.mode">
                  <div class="xuantitle"></div>
                  <li class="weui-media-box__info__meta"  v-html="descitem.desc"></li>
                </check-icon>
              </div>
            </ul>
            <group style="margin: 0 auto;" title="">
              <x-button v-show="confirmAnswer0" ref="btn" :disabled="confirmAnswer[index]" style="width: 80%;" @click.native.prevent="confirmAns(index)" type="primary">{{'GameConfirm' | translate}}</x-button>
            </group>
          </div>
        </swiper-item>
      </swiper>
    <div v-show="eng==='en'">
      <div v-show="!confirmAnswer[index]" class="answerHintEmpty" v-html=""></div>
      <div v-show="confirmAnswer[index] && list[index].timutype!==1" class="answerHint">
        <div class="answerClosure">
          <div v-show="list[index].answer===list[index].getanswer" class="img"><img src="http://18.180.147.97:8080/hotme/pics/correct.png" alt=""></div>
          <div v-show="list[index].answer!==list[index].getanswer" class="img"><img src="http://18.180.147.97:8080/hotme/pics/incorrect.png" alt=""></div>
          <div class="imgText"><span>Your Answer: </span><span class="error" :class="{'correct':listEn[index].answer===listEn[index].getanswer}">{{listEn[index].getanswerInd}}</span></div>
        </div>
        <div class="imgText" v-show="list[index].answer!==list[index].getanswer"><span class="correct">The correct answer was: </span><span class="correctR">&nbsp;{{listEn[index].answer}}:&nbsp;{{listEn[index].answerInd}}</span></div>
        <div v-show="confirmAnswer[index]" class="answerHintDetail" v-html="answerHintEn[index]"></div>
      </div>
    </div>
    <div v-show="eng==='zh-CN'">
      <div v-show="!confirmAnswer[index]" class="answerHintEmpty" v-html=""></div>
      <div v-show="confirmAnswer[index] && list[index].timutype!==1" class="answerHint">
        <div class="answerClosure">
          <div v-show="list[index].answer===list[index].getanswer" class="img"><img src="http://18.180.147.97:8080/hotme/pics/correct.png" alt=""></div>
          <div v-show="list[index].answer!==list[index].getanswer" class="img"><img src="http://18.180.147.97:8080/hotme/pics/incorrect.png" alt=""></div>
          <div class="imgText"><span>你的答案: </span><span class="error" :class="{'correct':list[index].answer===list[index].getanswer}">{{list[index].getanswerInd}}</span></div>
        </div>
        <div class="imgText" v-show="list[index].answer!==list[index].getanswer"><span class="correct">正确答案: </span><span class="correctR">&nbsp;{{list[index].answer}}:&nbsp;{{list[index].answerInd}}</span></div>
        <div v-show="confirmAnswer[index]" class="answerHintDetail" v-html="answerHint[index]"></div>
      </div>
    </div>
    <!--
    <checklist v-if="eng==='en'" title="Please choose your favorite place" :options="favoritePlaceEN" v-model="inlineDescListValue" @on-change="change"></checklist>
    <checklist v-if="eng==='zh-CN'" title="请选择你最喜爱的地方" :options="favoritePlaceCN" v-model="inlineDescListValue" @on-change="change"></checklist>
    <group style="margin: 0 auto;" title="">
      <x-button style="width: 80%;" @click.native.prevent="confirm(2)" type="primary">{{'GameConfirm' | translate}}</x-button>
    </group>
    -->
    <div style="height: 400px;" class="chart1"  v-if="eng==='en' && refreshActive && index===5">
      <lpie ref="pchart" :pdata="pdata" :plegend="plegend" :name="name"/>
    </div>
    <div style="height: 400px;" class="chart1"  v-if="eng==='zh-CN' && refreshActive&& index===5">
      <clpie ref="cpchart" :pdata="cpdata" :plegend="cplegend" :name="name"/>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model="showSigDlg" class="dialog-demo">

        <p class="dialog-title">{{'LoginInfo' | translate}}</p>
        <div class="img-box" style="height:140px;padding:15px 0;overflow:scroll;-webkit-overflow-scrolling:touch;">

          <group style="margin-top:-20px;" title="">
            <x-input style="height:40px;font-size:22px;" v-if="eng==='zh-CN'" title="账户名：" v-model="account" type="text" placeholder="输入用户名"  @on-change="change"></x-input>
            <x-input style="height:40px;font-size:22px;" v-if="eng==='en'" title="Account:" v-model="account" type="text" placeholder="input account"  @on-change="change"></x-input>
            <x-input style="height:40px;font-size:22px;" v-if="eng==='zh-CN'" title="密 码："  v-model="password" type="password" placeholder="密码" ></x-input>
            <x-input style="height:40px;font-size:22px;" v-if="eng==='en'" title="Password:"  v-model="password" type="password" placeholder="password" ></x-input>
          </group>
        </div>

        <div style="padding:15px;margin-top:-40px;">
          <x-button @click.native="resetLogin" type="primary">{{'Reset' | translate}}</x-button>
          <x-button @click.native.prevent="handleSig" type="primary">{{'Login' | translate}}</x-button>
          <x-button @click.native.prevent="ret" type="primary">{{'return' | translate}}</x-button>
        </div>
      </x-dialog>
    </div>
    <toast class="toast" v-model="databasefailure" type="text" :time="1800" is-show-mask text="Cannot get data from database!" :position="position">Chcek database link!</toast>
    <toast class="toast" v-model="databasefailureCN" type="text" :time="1800" is-show-mask text="连接不到数据库!" :position="position">连接不到数据库!</toast>
    <toast class="toast" v-model="userEmpty" type="text" :time="1800" is-show-mask text="Account can not be empty!" :position="position">Account can not be empty!</toast>
    <toast class="toast" v-model="userEmptyCN" type="text" :time="1800" is-show-mask text="账户不能为空!" :position="position">"账户不能为空!</toast>
    <toast class="toast" v-model="passwordEmpty" type="text" :time="1800" is-show-mask text="Password can not be empty!" :position="position">Password can not be empty!</toast>
    <toast class="toast" v-model="passwordEmptyCN" type="text" :time="1800" is-show-mask text="密码不能为空!" :position="position">密码不能为空!</toast>
    <toast class="toast" v-model="accountPasswordError" type="text" :time="1800" is-show-mask text="Account or Password incorrect!" :position="position">Account or Password incorrect!</toast>
    <toast class="toast" v-model="accountPasswordErrorCN" type="text" :time="1800" is-show-mask text="用户名或密码错误!" :position="position">用户名或密码错误!</toast>
    <toast class="toast" v-model="loginHint" type="text" :time="2800" is-show-mask text="Only if you make login, then you can take quiz!" :position="position">Only you make login you can take quiz!</toast>
    <toast class="toast" v-model="loginHintCN" type="text" :time="2800" is-show-mask text="只有你登录后才能做测试!" :position="position">只有你登录后才能做测试!</toast>
    <toast class="toast" v-model="repQuizHint" type="text" :time="1800" is-show-mask text="You have already taken the quiz!" :position="position">You have already taken the quiz!</toast>
    <toast class="toast" v-model="repQuizHintCN" type="text" :time="1800" is-show-mask text="你已经做过测试了!" :position="position">你已经做过测试了!</toast>
    <toast class="toast" v-model="favoriteEmpty" type="text" :time="1800" is-show-mask text="Please select your favorite place!" :position="position">Please select your favorite place!</toast>
    <toast class="toast" v-model="favoriteEmptyCN" type="text" :time="1800" is-show-mask text="请选择你最喜爱的地方!" :position="position">请选择你最喜爱的地方!</toast>
    <toast class="toast" v-model="quiz" type="text" :time="1800" is-show-mask text="Please make your selection!" :position="position">Please make your selection!</toast>
    <toast class="toast" v-model="quizCN" type="text" :time="1800" is-show-mask text="请做出你的选择!" :position="position">请做出你的选择!</toast>

  </div>
</template>
<script>
  // import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem } from 'vux'
  // import { Toast, XButton, XInput, XDialog, Radio, Group, Cell, Badge, Divider, Drawer, Actionsheet, ButtonTab, ButtonTabItem, ViewBox, XHeader, Tabbar, TabbarItem, Loading, TransferDom } from 'vux'
  import { Tab, TabItem } from '../../components/tab'
  import Sticky from '../../components/sticky'
  import Divider from '../../components/divider'
  import XButton from '../../components/x-button'
  import XInput from '../../components/x-input'
  import Toast from '../../components/toast'
  import XDialog from '../../components/x-dialog'
  import Group from '../../components/group'
  import Radio from '../../components/radio'
  import Checklist from '../../components/checklist'
  import CheckIcon from '../../components/check-icon'
  import { ButtonTab, ButtonTabItem } from '../../components/button-tab'
  import TransferDom from '../../directives/transfer-dom'
  import { Swiper, SwiperItem } from '../../components/swiper'
  import { getFavorite, getAccount, insertAccount, insertFavorite} from '../../common/js/getdata'
  import Vue from 'vue'
  import { mapState } from 'vuex'
  import lpie from '../../app/echart/lpie'
  import clpie from '../../app/echart/clpie'

  export default {
    props: {
      showDlg: {
        type: Boolean,
        default: true
      }
    },
    directives: {
      TransferDom
    },
    components: {
      Tab,
      TabItem,
      Sticky,
      Divider,
      XButton,
      Swiper,
      SwiperItem,
      XInput,
      Toast,
      XDialog,
      Group,
      Radio,
      ButtonTab,
      ButtonTabItem,
      Checklist,
      CheckIcon,
      lpie,
      clpie
    },
    created () {
      // console.log('Created    lllll: ')
      this.$bus.on('changeLang', (locale) => {
        this.eng = locale
        // this.lang = locale
        // console.log('Change Lang: ' + this.locale)
      })
    },
    methods: {
      clickSelection (sel, index, ind) {
        if (this.confirmAnswer[index]) {
          if (this.list[index].desclist[ind].preMode && this.listEn[index].desclist[ind].preMode) {
            this.list[index].desclist[ind].mode = true
            this.listEn[index].desclist[ind].mode = true
            this.list[index].desclist[ind].preMode = true
            this.listEn[index].desclist[ind].preMode = true
            return
          }
          this.list[index].desclist[ind].mode = false
          this.listEn[index].desclist[ind].mode = false
          this.list[index].desclist[ind].preMode = false
          this.listEn[index].desclist[ind].preMode = false
          return
        }
        if (sel === 'ZH') {
          if (this.list[index].timutype === 0) {
            for (let i = 0; i < this.list[index].desclist.length; i++) {
              if (i !== ind) {
                this.list[index].desclist[i].mode = false
                this.listEn[index].desclist[i].mode = false
                this.list[index].desclist[i].preMode = false
                this.listEn[index].desclist[i].preMode = false
              } else {
                this.list[index].desclist[i].mode = true
                this.listEn[index].desclist[i].mode = true
                this.list[index].desclist[i].preMode = true
                this.listEn[index].desclist[i].preMode = true
              }
            }
          } else {
            console.log('ZH: ' + this.list[index].desclist[ind].preMode)
            if (!this.list[index].desclist[ind].preMode) {
              this.list[index].desclist[ind].preMode = true
              this.list[index].desclist[ind].mode = true
              this.listEn[index].desclist[ind].preMode = true
              this.listEn[index].desclist[ind].mode = true
            } else {
              this.list[index].desclist[ind].preMode = false
              this.list[index].desclist[ind].mode = false
              this.listEn[index].desclist[ind].preMode = false
              this.listEn[index].desclist[ind].mode = false
              console.log('aaa ZH: ' + this.list[index].desclist[ind].mode)
            }
          }
          return
        }
        if (sel === 'EN') {
          if (this.listEn[index].timutype === 0) {
            for (let i = 0; i < this.listEn[index].desclist.length; i++) {
              if (i !== ind) {
                this.listEn[index].desclist[i].mode = false
                this.list[index].desclist[i].mode = false
                this.listEn[index].desclist[i].preMode = false
                this.list[index].desclist[i].preMode = false
              } else {
                this.listEn[index].desclist[i].mode = true
                this.list[index].desclist[i].mode = true
                this.listEn[index].desclist[i].preMode = true
                this.list[index].desclist[i].preMode = true
              }
            }
          } else {
            console.log('EN: ' + this.listEn[index].desclist[ind].preMode)
            if (!this.listEn[index].desclist[ind].preMode) {
              this.listEn[index].desclist[ind].preMode = true
              this.listEn[index].desclist[ind].mode = true
              this.list[index].desclist[ind].preMode = true
              this.list[index].desclist[ind].mode = true
            } else {
              this.listEn[index].desclist[ind].preMode = false
              this.listEn[index].desclist[ind].mode = false
              this.list[index].desclist[ind].preMode = false
              this.list[index].desclist[ind].mode = false
              console.log('aaa ZH: ' + this.list[index].desclist[ind].mode)
            }
          }
          return
        }
        this.refre = false
        setTimeout(() => {
          this.refre = true
        }, 10)
      },
      confirmAns (id) {
        console.log(id)
        if (this.registerAccount === '') {
          this.showSigDlg = true
        }
        if (this.registerAccount === '') {
          return
        }
        if (this.eng === 'en') {
          if (this.listEn[this.index].getanswer === '') {
            this.quiz = true
            return
          }
        } else {
          if (this.list[this.index].getanswer === '') {
            this.quizCN = true
            return
          }
        }
        if (id === 5) {
          this.confirm()
        }
       // if (id === 1) {
          this.confirmAnswer[this.index] = true
          this.confirmAnswer0 = false
          setTimeout(() => {
            this.confirmAnswer0 = true
          }, 5)
          console.log(this.confirmAnswer[this.index])
       // }
      },
      onImgError (item, $event) {
        this.$emit('on-img-error', JSON.parse(JSON.stringify(item)), $event);
        if (item.fallbackSrc) {
          $event.target.src = item.fallbackSrc;
        }
      },
      onXuanClick (index, ind, descitem) {
        // this.onXuanClickEn(index, ind, descitem)
        // console.log('the index is:' + index)
        // console.log('the ind is:' + ind)
        // console.log('the click is:' + descitem.index)
        if (this.confirmAnswer[index]) {
          return
        }
        if (index === 5) {
          let i = 0;
          for (; i < this.selectItem.length; i++) {
            if (this.selectItem[i] === ind) {
              // i = ind
              this.selectItem.splice(i,1)
              i--
              break
            }
          }
          if (i >= this.selectItem.length) {
            this.selectItem.push(ind)
          }
          console.log(this.selectItem)
        }
        this.list[index].title = this.list[index].title.split('(')[0]
        // this.list[index].getanswer = this.xuanTitle[ind].split('：')[0]
        if (this.list[index].timutype === 0 || this.list[index].timutype === 2) {
          this.list[index].getanswer.trim()
          if ( this.list[index].getanswer === this.xuanTitle[ind].split('：')[0]) {
            this.list[index].getanswer = ''
          } else {
            this.list[index].getanswer = this.xuanTitle[ind].split('：')[0]
          }
          console.log('type 0:' + this.list[index].getanswer)
        } else if (this.list[index].timutype === 1 ) {
          this.list[index].getanswer.trim()
          if (!this.list[index].getanswer.includes(this.xuanTitle[ind].split('：')[0])) {
            this.list[index].getanswer = this.list[index].getanswer + this.xuanTitle[ind].split('：')[0]
          } else {
            let iiidn = this.list[index].getanswer.indexOf(this.xuanTitle[ind].split('：')[0])
            console.log('the iiidn is:' + iiidn)
            this.list[index].getanswer = this.list[index].getanswer.slice(0,iiidn) + this.list[index].getanswer.slice(iiidn+1)
          }
        }
        this.list[index].getanswerInd = this.list[index].desclist[this.list[index].getanswer.charCodeAt(0) - 65].desc
        this.listEn[index].getanswerInd = this.listEn[index].desclist[this.list[index].getanswer.charCodeAt(0) - 65].desc
        // console.log('Chinese: ' + this.list[index].getanswerInd)
        // console.log('English: ' + this.listEn[index].getanswerInd)
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
        this.listEn[index].getanswer = this.list[index].getanswer
        this.listEn[index].getscore = this.list[index].getscore
        console.log('multiple: ' + this.listEn[index].getanswer)
        this.list[index].title =  '( '+ this.timu[this.list[index].timutype]+ this.list[index].score + '分)'+'('  + this.list[index].getanswer + ')'
        this.list[index].title = this.list[index].const + this.list[index].title
        this.listEn[index].title = '( ' + this.timuEn[this.list[index].timutype] + this.listEn[index].score + 'Score)' + '(' + this.list[index].getanswer + ')'
        this.listEn[index].title = this.listEn[index].const + this.listEn[index].title
      },
      onXuanClickEn (index, ind, descitem) {
        // this.onXuanClick(index, ind, descitem)
        // console.log('the index is:' + index)
        // console.log('the ind is:' + ind)
        // console.log('the click is:' + descitem.index)
        if (this.confirmAnswer[index]) {
          return
        }
        if (index === 5) {
          let i = 0
          for (; i < this.selectItem.length; i++) {
            if (this.selectItem[i] === ind) {
              // i = ind
              this.selectItem.splice(i,1)
              i--
              break
            }
          }
          if (i >= this.selectItem.length) {
            this.selectItem.push(ind)
          }
          console.log(this.selectItem)
        }
        this.listEn[index].title = this.listEn[index].title.split('(')[0]
        // this.list[index].getanswer = this.xuanTitle[ind].split('：')[0]
        if (this.listEn[index].timutype === 0 || this.listEn[index].timutype === 2) {
          this.listEn[index].getanswer.trim()
          if ( this.listEn[index].getanswer === this.xuanTitle[ind].split('：')[0]) {
            this.listEn[index].getanswer = ''
          } else {
            this.listEn[index].getanswer = this.xuanTitle[ind].split('：')[0]
          }
        } else if (this.listEn[index].timutype === 1 ) {
          this.listEn[index].getanswer.trim()
          if (!this.listEn[index].getanswer.includes(this.xuanTitle[ind].split('：')[0])) {
            this.listEn[index].getanswer = this.listEn[index].getanswer + this.xuanTitle[ind].split('：')[0]
          } else {
            let iiidn = this.listEn[index].getanswer.indexOf(this.xuanTitle[ind].split('：')[0])
            console.log('the iiidn is:' + iiidn)
            this.listEn[index].getanswer = this.listEn[index].getanswer.slice(0,iiidn) + this.listEn[index].getanswer.slice(iiidn+1)
          }
        }
        this.listEn[index].getanswerInd = this.listEn[index].desclist[this.listEn[index].getanswer.charCodeAt(0) - 65].desc
        this.list[index].getanswerInd = this.list[index].desclist[this.listEn[index].getanswer.charCodeAt(0) - 65].desc
        // console.log('English: ' + this.listEn[index].getanswerInd)
        // console.log('Chinese: ' + this.list[index].getanswerInd)
        let ss = this.listEn[index].getanswer.split('')
        this.listEn[index].getanswer = ss.sort().join('')
        let tt = this.listEn[index].answer.split('')
        this.listEn[index].answer = tt.sort().join('')
        if (this.listEn[index].getanswer === this.listEn[index].answer){
          this.listEn[index].getscore = this.listEn[index].score
          console.log('get score:' + this.listEn[index].getscore)
        } else {
          this.listEn[index].getscore = 0
          console.log('get score:' + this.listEn[index].getscore)
        }
        this.list[index].getanswer = this.listEn[index].getanswer
        this.list[index].getscore = this.listEn[index].getscore
        console.log('multiple: ' + this.list[index].getanswer)
        this.listEn[index].title = '( ' + this.timuEn[this.list[index].timutype] + this.listEn[index].score + 'Score)' + '(' + this.listEn[index].getanswer + ')'
        this.listEn[index].title = this.listEn[index].const + this.listEn[index].title
        this.list[index].title = '( '+ this.timu[this.list[index].timutype]+ this.list[index].score + '分)'+'('  + this.listEn[index].getanswer + ')'
        this.list[index].title = this.list[index].const + this.list[index].title
      },
      onIndexChange (index) {
        this.swiper1_index = index
      },
      confirm (id) {
        console.log(id)
        console.log('select Item: ' + this.selectItem)
        if (this.registerAccount === '') {
          this.showSigDlg = true
        }
        if (this.registerAccount === '') {
          return
        }
        /*
        if (this.eng === 'en') {
          this.favoriteEmpty = true
        } else {
          this.favoriteEmptyCN = true
        } */
        for (let i = 0; i < this.selectItem.length; i++) {
          console.log(this.favoritePlace[this.selectItem[i]])
          insertFavorite(this.registerAccount, this.favoritePlace[this.selectItem[i]]).then(response => {
            if (response.data.length > 0) {
              console.log(response.data)
            } else {
            }
          }).catch((e) => {
            if (this.eng === 'en') {
              this.databasefailure = true
            } else {
              this.databasefailureCN = true
            }
          })
        }
        setTimeout(() => {
          for (let j = 0; j < this.pdata.length; j++) {
            this.pdata[j].value = 0
            this.cpdata[j].value = 0
          }
          getFavorite().then(response => {
            if (response.data.length > 0) {
              this.favoriteArr = response.data
              console.log(this.favoriteArr)
              for (let i = 0; i < this.favoriteArr.length; i++) {
                for (let j = 0; j < this.pdata.length; j++) {
                  if (this.favoriteArr[i].item === this.pdata[j].name) {
                    this.pdata[j].value++
                    this.cpdata[j].value++
                  }
                }
              }
              console.log('statics:', this.pdata)
              console.log('statics:', this.cpdata)
            } else {
            }
          }).catch(() => {
          })
          this.$refs.pchart.setOptions(this.pdata, this.plegend)
          this.$refs.cpchart.setOptions(this.cpdata, this.cplegend)
        }, 300)
      },
      change (val, label) {
        // console.log('change', this.selectItem)
      },
      resetLogin () {
        // this.showRegDlg = false
        // this.showSigDlg = false
        this.account = ''
        this.password = ''
        this.reppassword = ''
      },
      handleSig () {
        if (this.account === '') {
          if (this.eng === 'en') {
            this.userEmpty = true
          } else {
            this.userEmptyCN = true
          }
          return
        }
        if (this.password === '') {
          if (this.eng === 'en') {
            this.passwordEmpty = true
          } else {
            this.passwordEmptyCN = true
          }
          return
        }
        getAccount().then(response => {
          if (response.data.length > 0) {
            this.accountArr = response.data
            console.log(this.accountArr)
            for (let i = 0; i < this.accountArr.length; i++) {
              if (this.accountArr[i].name === this.account && this.accountArr[i].password === this.password) {
                this.$store.commit('updateAccount', {account: this.accountArr[i].name})
                console.log('registerAccount: ' + this.registerAccount);
                this.showSigDlg = false
                this.inlineDescListValue = []
                return
              }
            }
            if (this.eng === 'en') {
              this.accountPasswordError = true
            } else {
              this.accountPasswordErrorCN = true
            }
            // console.log('Pass: ' + this.password)
          } else {
          }
        }).catch((e) => {
          console.log('Error: ' + e)
          if (this.lang === 'en') {
            this.databasefailure = true
          } else {
            this.databasefailureCN = true
          }
          this.showRegDlg = false
          return
          // this.showRegDlg = false
          // this.databasefailure = true
        })
        // this.showSigDlg = false
      },
      ret () {
        this.showSigDlg = false
        this.$router.go(-1)
      }
    },
    activated () {
      this.refreshActive = false
      setTimeout(() => {
        this.refreshActive = true
      }, 5)
      if (this.eng === 'en') {
        this.loginHint = true
      } else {
        this.loginHintCN = true
      }
      if (this.registerAccount === '') {
        // this.showSigDlg = true
      }
    },
    mounted () {
      console.log('aaaaa local: ' + 'A'.charCodeAt(0))
      for (let ii = 0; ii < this.list.length; ii++) {
        this.list[ii].title = this.shitiTitle[ii] + this.list[ii].title // + '( ' + this.timu[this.list[ii].timutype] + this.list[ii].score + '分)' + '(   )'
        console.log(this.list[ii].title)
        let desctemp = [...this.list[ii].desclist]
        for (let jj = 0; jj < this.list[ii].desclist.length; jj++) {
          if (this.list[ii].desclist[jj].desc) {
            this.list[ii].desclist[jj].desc = this.xuanTitle[jj] + this.list[ii].desclist[jj].desc;
            console.log(this.list[ii].desclist[jj].desc)
          }
        }
      }
      for (let ii = 0; ii < this.listEn.length; ii++) {
        this.listEn[ii].title = this.shitiTitleEn[ii] + ' ' + this.listEn[ii].title // + '( ' + this.timuEn[this.listEn[ii].timutype] + this.listEn[ii].score + ' Score)' + '(   )'
        console.log(this.listEn[ii].title)
        let desctemp = [...this.listEn[ii].desclist]
        for (let jj = 0; jj < this.listEn[ii].desclist.length; jj++) {
          if (this.listEn[ii].desclist[jj].desc) {
            this.listEn[ii].desclist[jj].desc = this.xuanTitle[jj] + this.listEn[ii].desclist[jj].desc;
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
      // this.updateAccount({account: 'long'})
      this.alreadyQuiz = false
      this.lang = Vue.locale.get()
      // this.$store.commit('updateAccount', {account: 'LONG'})
      getFavorite().then(response => {
        if (response.data.length > 0) {
          this.favoriteArr = response.data
          console.log(this.favoriteArr)
          for (let i = 0; i < this.favoriteArr.length; i++) {
            for (let j = 0; j < this.pdata.length; j++) {
              if (this.favoriteArr[i].item === this.pdata[j].name) {
                this.pdata[j].value++
                this.cpdata[j].value++
              }
            }
          }
        this.$refs.pchart.setOptions(this.pdata, this.plegend)
        this.$refs.cpchart.setOptions(this.cpdata, this.cplegend)
        console.log('statics:', this.pdata)
        console.log('statics:', this.cpdata)
        } else {
        }
      }).catch(() => {
      })
    },
    watch: {
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
      },
      eng () {
        console.log('watch eng')
        console.log(this.list[this.index].title)
        console.log(this.listEn[this.index].title)
      },
      showSigDlg () {
        return this.showDlg
      }
    },
    computed: {
      pass () {
        return Vue.i18n.translate('Password');
      },
      ...mapState({
        route: state => state.route,
        path: state => state.route.path,
        deviceready: state => state.app.deviceready,
        demoTop: state => state.vux.demoScrollTop,
        isLoading: state => state.vux.isLoading,
        direction: state => state.vux.direction,
        registerAccount: state => state.vux.account
      }),
      password () {
        return Vue.i18n.translate('Password')
      }
    },
    data () {
      return {
        refreshActive: true,
        refre: true,
        selectItem: [],
        inlineDescList: [
          {key: '0', value: 'Tiger is good', inlineDesc: 'Tiger is the king of mountain'},
          {key: '1', value: 'Lion is better', inlineDesc: 'Lion is the king of woods'},
          {key: '2', value: 'Camel is best, no inline-desc'}
        ],
        staticsCollect: {},
        pdata: [
          { value: 0, name: 'Art galleries' },
          { value: 0, name: 'Museums' },
          { value: 0, name: 'Libraries and archives' },
          { value: 0, name: 'Live music concerts and performances' },
          { value: 0, name: 'Theatre performances' },
          { value: 0, name: 'Dance performances' },
          { value: 0, name: 'Musicals and operas' },
          { value: 0, name: 'Other performing arts' },
          { value: 0, name: 'Cinemas and drive-ins' }
        ],
        cpdata: [
          { value: 0, name: '美术馆' },
          { value: 0, name: '展览馆' },
          { value: 0, name: '图书馆' },
          { value: 0, name: '现场音乐和表演' },
          { value: 0, name: '戏剧表演' },
          { value: 0, name: '舞蹈表演' },
          { value: 0, name: '音乐和歌剧' },
          { value: 0, name: '其它表演艺术' },
          { value: 0, name: '电影及露天电影' }
        ],
        favoritePlace: ['Art galleries', 'Museums', 'Libraries and archives', 'Live music concerts and performances', 'Theatre performances', 'Dance performances', 'Musicals and operas', 'Other performing arts', 'Cinemas and drive-ins'],
        favoritePlaceC: ['美术馆', '展览馆', '图书馆', '现场音乐和表演', '戏剧表演', '舞蹈表演', '音乐和歌剧', '其它表演艺术', '电影及露天电影'],
        favoritePlaceEN: [
          {key: '0', value: 'Art galleries'},
          {key: '1', value: 'Museums'},
          {key: '2', value: 'Libraries and archives'},
          {key: '3', value: 'Live music concerts and performances'},
          {key: '4', value: 'Theatre performances'},
          {key: '5', value: 'Dance performances'},
          {key: '6', value: 'Musicals and operas'},
          {key: '7', value: 'Other performing arts'},
          {key: '8', value: 'Cinemas and drive-ins'}
          ],
        favoritePlaceCN: [
          {key: '0', value: '美术馆'},
          {key: '1', value: '展览馆'},
          {key: '2', value: '图书馆'},
          {key: '3', value: '现场音乐和表演'},
          {key: '4', value: '戏剧表演'},
          {key: '5', value: '舞蹈表演'},
          {key: '6', value: '音乐和歌剧'},
          {key: '7', value: '其它表演艺术'},
          {key: '8', value: '电影及露天电影'}
          ],
        inlineDescListValue: [],
        eng: Vue.locale.get(),
        accountArr: [],
        favoriteArr: [],
        account: '',
        password: '',
        lang: Vue.locale.get(),
        passwd: '',
        position: 'top',
        showToast: false,
        databasefailure: false,
        changelang: false,
        showToastCN: false,
        databasefailureCN: false,
        changelangCN: false,
        passwordEmpty: false,
        passwordEmptyCN: false,
        userEmpty: false,
        userEmptyCN: false,
        loginHint: false,
        loginHintCN: false,
        repQuizHint: false,
        repQuizHintCN: false,
        favoriteEmpty: false,
        favoriteEmptyCN: false,
        accountPasswordError: false,
        accountPasswordErrorCN: false,
        quiz: false,
        quizCN: false,
        showTabBar: false,
        showSigDlg: false,
        hint0: true,
        confirmAnswer0: true,
        confirmAnswer: [false, false, false, false, false, false],
        swiperheight: 510,
        answerHint: [
          '弗林德St站的外建筑实际上是遗产，它和前门的时钟一起列出',
          '皇冠赌场位于南岸，不仅是一家赌场，也是高端时尚、娱乐场所和餐厅的所在地。',
          '一座传统的教堂就在墨尔本市中心，在联邦广场对面，这表明墨尔本真的是一个新旧交融的城市',
          '维多利亚女王市场对于墨尔本人是众所周知的，尤其是水果和蔬菜。它也在夏季经营夜市。',
          '艺术中心是歌剧、芭蕾舞、舞台表演和许多其他艺术相关活动的所在地。它位于南岸区的起点。',
          ''
        ],
        answerHintEn: [
          'The outer building of Flinder St Station is actually heritage listed along with the clocks at the front entrance.',
          'Crown Casino is situated along Southbank and is home to not only a casino but high-end fashion, entertainment venues and restaurants.',
          'A traditional church right in the heart of Melbourne, opposite Federation Square, showing that Melbourne really is a city where new and old blend well.',
          'Queen Victoria Market is well known to Melbournites especially for fruit & vegetables. It also runs a night market over the summer months.',
          'The Arts Center is home to opera, ballet, stage shows and lots of other arts related activities. It is located at the start of the Southbank precinct.',
          ''
        ],
        list: [
          {
            title: '如果我叫你“在钟下见我”，我们会在哪里见面？',
            const: '如果我叫你“在钟下见我”，我们会在哪里见面？',
            answer: 'B',
            getanswer: '',
            answerInd: '弗林德斯街站 ',
            getanswerInd: '',
            score: '4',
            getscore: '',
            timutype: 0,
            desclist: [
              { desc: '墨尔本市中心', mode: false, preMode: false },
              { desc: '弗林德斯街站 ', mode: false, preMode: false },
              { desc: '联合广场', mode: false, preMode: false },
              { desc: '墨尔本市政厅', mode: false, preMode: false }
            ],
            url: '/component/cell'

          }, {
            title: '如果我想在墨尔本玩点21点或是玩点小精灵游戏，我最想去的地方是哪里？',
            const: '如果我想在墨尔本玩点21点或是玩点小精灵游戏，我最想去的地方是哪里？',
            answer: 'D',
            getanswer: '',
            answerInd: '皇冠赌场',
            getanswerInd: '',
            score: '4',
            getscore: '',
            timutype: 0,
            desclist: [
              { desc: '木星赌场', mode: false, preMode: false },
              { desc: '国库赌场', mode: false, preMode: false },
              { desc: '费尔班克赌场', mode: false, preMode: false },
              { desc: '皇冠赌场', mode: false, preMode: false },
              { desc: '' }
            ],
            url: {
              path: '/component/radio',
              replace: false
            }
          }, {
            title: '在车站对面，酒吧和联邦广场，我能找到什么教堂？',
            const: '在车站对面，酒吧和联邦广场，我能找到什么教堂？',
            answer: 'B',
            getanswer: '',
            answerInd: '圣保罗大教堂',
            getanswerInd: '',
            score: '4',
            getscore: '',
            timutype: 0,
            desclist: [
              { desc: '圣彼得大教堂', mode: false, preMode: false },
              { desc: '圣保罗大教堂', mode: false, preMode: false },
              { desc: '圣斯蒂芬大教堂', mode: false, preMode: false },
              { desc: '圣罗大教堂', mode: false, preMode: false }
            ],
            url: {
              path: '/component/radio',
              replace: false
            }
          }, {
            title: '皇后______ 市场是墨尔本哪个著名的市场？',
            const: '皇后______ 市场是墨尔本哪个著名的市场？',
            answer: 'D',
            getanswer: '',
            answerInd: '维多利亚',
            getanswerInd: '',
            score: '4',
            getscore: '',
            timutype: 0,
            desclist: [
              { desc: '玛丽', mode: false, preMode: false },
              { desc: '安妮', mode: false, preMode: false },
              { desc: '伊丽莎白', mode: false, preMode: false },
              { desc: '维多利亚', mode: false, preMode: false }
            ],
            url: {
              path: '/component/radio',
              replace: false
            }
          }, {
            title: '如果我看到的是一个变色的尖顶，我会看到什么样的建筑？',
            const: '如果我看到的是一个变色的尖顶，我会看到什么样的建筑？',
            answer: 'A',
            getanswer: '',
            answerInd: '艺术中心 ',
            getanswerInd: '',
            score: '4',
            getscore: '',
            timutype: 0,
            desclist: [
              { desc: '艺术中心 ', mode: false, preMode: false },
              { desc: '炮塔 ', mode: false, preMode: false },
              { desc: '联合广场', mode: false, preMode: false },
              { desc: '城市广场', mode: false, preMode: false }
            ],
            url: {
              path: '/component/radio',
              replace: false
            }
          }, {
            title: '请选择你最喜爱的地方',
            const: '请选择你最喜爱的地方',
            answer: 'B',
            getanswer: '',
            answerInd: '展览馆',
            getanswerInd: '',
            score: '4',
            getscore: '',
            timutype: 1,
            desclist: [
              { desc:  '美术馆', mode: false, preMode: false },
              { desc:  '展览馆', mode: false, preMode: false },
              { desc:  '图书馆', mode: false, preMode: false },
              { desc:  '现场音乐和表演', mode: false, preMode: false },
              { desc:  '戏剧表演', mode: false, preMode: false },
              { desc:  '舞蹈表演', mode: false, preMode: false },
              { desc:  '音乐和歌剧', mode: false, preMode: false },
              { desc:  '其它表演艺术', mode: false, preMode: false },
              { desc:  '电影及露天电影', mode: false, preMode: false }
            ],
            url: {
              path: '/component/radio',
              replace: false
            }
          }
        ],
        listEn: [
          {
            title: 'If I asked you to meet me under the clocks where would we be meeting?',
            const: 'If I asked you to meet me under the clocks where would we be meeting?',
            answer: 'B',
            getanswer: '',
            answerInd: 'Flinders St Station',
            getanswerInd: '',
            score: '4',
            getscore: '',
            timutype: 0,
            desclist: [
              { desc: 'Melbourne Central', mode: false, preMode: false },
              { desc: 'Flinders St Station', mode: false, preMode: false },
              { desc: 'Federation Square', mode: false, preMode: false },
              { desc: 'Melbourne Town Hall', mode: false, preMode: false }
            ],
            url: '/component/cell'

          }, {
            title: 'If I felt like playing a bit of blackjack or the pokies in Melbourne, where is the most likely place I would go to?',
            const: 'If I felt like playing a bit of blackjack or the pokies in Melbourne, where is the most likely place I would go to?',
            answer: 'D',
            getanswer: '',
            answerInd: 'Crown Casino',
            getanswerInd: '',
            score: '4',
            getscore: '',
            timutype: 0,
            desclist: [
              { desc: 'Jupiters Casino', mode: false, preMode: false },
              { desc: 'Treasury Casino', mode: false, preMode: false },
              { desc: 'Fairbank Casino', mode: false, preMode: false },
              { desc: 'Crown Casino', mode: false, preMode: false }
            ],
            url: {
              path: '/component/radio',
              replace: false
            }
          }, {
            title: 'What church would I find opposite a station, a pub & Federation Square?',
            const: 'What church would I find opposite a station, a pub & Federation Square?',
            answer: 'B',
            getanswer: '',
            answerInd: 'St Pauls Basilica',
            getanswerInd: '',
            score: '4',
            getscore: '',
            timutype: 0,
            desclist: [
              { desc: 'St Peters Cathedral', mode: false, preMode: false },
              { desc: 'St Pauls Basilica', mode: false, preMode: false },
              { desc: 'St Stephens Cathedral', mode: false, preMode: false },
              { desc: 'St Pauls Cathedral', mode: false, preMode: false }
            ],
            url: {
              path: '/component/radio',
              replace: false
            }
          }, {
            title: 'he Queen ______ Market is which well known Melbourne market?',
            const: 'he Queen ______ Market is which well known Melbourne market?',
            answer: 'D',
            getanswer: '',
            answerInd: 'Victoria',
            getanswerInd: '',
            score: '4',
            getscore: '',
            timutype: 0,
            desclist: [
              { desc: 'Mary', mode: false, preMode: false },
              { desc: 'Anne', mode: false, preMode: false },
              { desc: 'Elizabeth', mode: false, preMode: false },
              { desc: 'Victoria', mode: false, preMode: false }
            ],
            url: {
              path: '/component/radio',
              replace: false
            }
          }, {
            title: ' If I was looking at a spire that was changing colours what building would I be looking at?',
            const: ' If I was looking at a spire that was changing colours what building would I be looking at?',
            answer: 'A',
            getanswer: '',
            answerInd: 'Arts Centre',
            getanswerInd: '',
            score: '4',
            getscore: '',
            timutype: 0,
            desclist: [
              { desc: 'Arts Centre', mode: false, preMode: false },
              { desc: 'Shot Tower', mode: false, preMode: false },
              { desc: 'Federation Square', mode: false, preMode: false },
              { desc: 'City Square', mode: false, preMode: false }
            ],
            url: {
              path: '/component/radio',
              replace: false
            }
          }, {
            title: 'Select Your favorite place',
            const: 'Select Your favorite place',
            answer: 'B',
            getanswer: '',
            answerInd: 'Museums',
            getanswerInd: '',
            score: '4',
            getscore: '',
            timutype: 1,
            desclist: [
              {desc: 'Art galleries', mode: false, preMode: false},
              {desc: 'Museums', mode: false, preMode: false},
              {desc: 'Libraries and archives', mode: false, preMode: false},
              {desc: 'Live music concerts and performances', mode: false, preMode: false},
              {desc: 'Theatre performances', mode: false, preMode: false},
              {desc: 'Dance performances', mode: false, preMode: false},
              {desc: 'Musicals and operas', mode: false, preMode: false},
              {desc: 'Other performing arts', mode: false, preMode: false},
              {desc: 'Cinemas and drive-ins', mode: false, preMode: false}
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
    }
  }
</script>
<style lang="less">
  @import "../../styles/weui/widget/weui_cell/weui_cell_global";
  @import "../../styles/weui/widget/weui_cell/weui_access";
  @import "../../styles/weui/widget/weui_panel/weui_panel";
  @import "../../styles/weui/widget/weui_media_box/weui_media_box";
  @import '../../styles/center.less';

  @import '../../styles/reset.less';
  @import '../../styles/1px.less';
  @import '../../styles/tap.less';
  @import '../../common/stylus/icon.less';
  @import url('https://fonts.googleapis.com/css?family=Roboto+Condensed|Lobster|Montserrat|Cabin|Herr+Von+Muellerhoff|Source+Sans+Pro:400,900&display=swap');
  * {
    touch-action: pan-y;
  }
  body {
    background-color: #fbf9fe;
  }
  html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }
  .answerHint {
    width: 90%;
    margin: 10px auto 20px auto;
    padding-bottom: 10px;
    text-align: center;
    font-family: 'Baloo Tammudu 2', sans-serif;
    font-weight: 600;
    font-size: 1rem;
    border-bottom: 2px solid #3c763d;
    .answerClosure {
      display: flex;
      text-align: left;
      .img {
        flex: 0 1 24px;
      }
      img {
        display: inline-block;
        width: 24px;
        height: 24px;
      }
      .imgText {
        padding-top: 2px;
        margin-left: 5px;
        vertical-align: bottom;
        font-weight: 700;
        font-size: 1.2rem;
        flex: 1;
        .error {
          margin-left: 5px;
          color: #f00;
          &.correct {
            color: #3CC51F;
          }
        }
      }
    }
    .imgText {
      text-align: left;
      margin-left: 29px;
      font-weight: 700;
      font-size: 1.2rem;
      .correct {
        margin-left: 5px;
      }
    }
    .answerHintDetail {
      margin: 10px 10px;
    }
  }
  .menu-title {
    color: #000;
  }
  .chart1 {
    padding-top: 0px;
    margin: 20px auto;
  }
  .dialog-demo {
    .weui-btn_primary {
      background: rgba(246, 213, 74, 1);
    }
    .weui-btn {
      color: #000;
    }
    .weui-cell__bd {
      background: rgba(250, 250, 250, 1);
      border-radius: 2px;
    }
    .weui-cell__hd {
      color: #000
    }
    .weui-cell {
      background-color: rgba(109,158,235,1);
    }
    .weui-dialog{
      border-radius: 8px;
      padding-bottom: 8px;
      background-color: rgba(109,158,235,1);
    }
    .dialog-title {
      margin: 15px auto 0 auto;
      width: 270px;
      //background: rgba(13, 13, 13, 0.8);
      background: rgba(246, 213, 74, 1);
      font-weight: 500;
      line-height: 40px;
      color: #000;
      border-radius: 5px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .img-box {
      height: 350px;
      overflow: hidden;
    }
    .vux-close {
      margin-top: 8px;
      margin-bottom: 8px;
    }
    toast {
      color: #f00;
    }
    @media (max-width: 320px) {
      .dialog-title {
        width: 230px;
      }
    }
    .vux-demo-tabbar {
      .tab {
        color: #f00;
        display: flex;
        .home {
          flex: 1;
        }
        .game {
          flex: 1;
        }
      }
    }
  }
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

