<template>
  <div style="height:100%;">
    <checklist v-if="eng==='en'" title="Please choose your favorite place" :options="favoritePlaceEN" v-model="inlineDescListValue" @on-change="change"></checklist>
    <checklist v-if="eng==='zh-CN'" title="请选择你最喜爱的地方" :options="favoritePlaceCN" v-model="inlineDescListValue" @on-change="change"></checklist>
    <group style="margin: 0 auto;" title="">
      <x-button style="width: 80%;" @click.native.prevent="confirm" type="primary">{{'GameConfirm' | translate}}</x-button>
    </group>
    <div style="height: 400px;" class="chart1"  v-if="eng==='en'">
      <lpie ref="pchart" :pdata="pdata" :plegend="plegend" :name="name"/>
    </div>
    <div style="height: 400px;" class="chart1"  v-if="eng==='zh-CN'">
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
      confirm () {
        console.log(this.selectItem)
        if (this.registerAccount === '') {
          this.showSigDlg = true
        }
        if (this.registerAccount === '') {
          return
        }
        if (this.eng === 'en') {
          this.favoriteEmpty = true
        } else {
          this.favoriteEmptyCN = true
        }
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
              console.log("statics:", this.pdata)
              console.log("statics:", this.cpdata)
            } else {
            }
          }).catch(() => {
          })
          this.$refs.pchart.setOptions(this.pdata, this.plegend)
          this.$refs.cpchart.setOptions(this.cpdata, this.cplegend)
        }, 300)
      },
      change (val, label) {
        this.selectItem = val
        console.log('change', this.selectItem)
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
      console.log('aaaaa local: ' + Vue.locale.get())
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
        console.log("statics:", this.pdata)
        console.log("statics:", this.cpdata)
        } else {
        }
      }).catch(() => {
      })
    },
    watch: {
      eng () {
        console.log('watch eng')
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
        showTabBar: false,
        showSigDlg: false
      }
    }
  }
</script>
<style lang="less">
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
</style>

