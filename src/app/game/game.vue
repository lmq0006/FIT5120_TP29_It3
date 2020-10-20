<template>
  <div class="app">
    <button :disabled="btnDisEnable" :class="{'active':btnDisEnable}" class="btn" @click="setDice(1)"></button>
    <button :disabled="btnDisEnable1" :class="{'active':btnDisEnable1}" class="btn1" @click="info"></button>
    <button :disabled="btnDisEnable1" :class="{'active':btnDisEnable1}" class="btn2" @click="change"></button>
    <!--<baidu ref="map" :styleJsonProps="styleJson" @computerplay="computerplay" @disable="disable" @stopMove="stopmove"></baidu>-->
    <gmap v-if="showOriginGame" ref="map" @computerplay="computerplay" @disable="disable" @stopMove="stopmove"></gmap>
    <gmapres  v-if="!showOriginGame" ref="map" @computerplay="computerplay" @disable="disable" @stopMove="stopmove"></gmapres>
    <dice :num="num" v-show="diceVisible"></dice>
    <div v-show="hintBubble" class="hint-wrapper">
      <div class="content">
        <div class="title">
          {{'GameRules' | translate}}
        </div>
        <ul>
          <li>{{'GameStep1' | translate}}</li>
          <li>{{'GameStep2' | translate}}</li>
          <li>{{'GameStep3' | translate}}</li>
          <li>{{'GameStep4' | translate}}</li>
          <li>{{'GameStep5' | translate}}</li>
          <li>{{'GameStep6' | translate}}</li>
          <li>{{'GameStep7' | translate}}</li>
          <li>{{'GameStep8' | translate}}</li>
          <li>{{'GameStep9' | translate}}</li>
        </ul>
        <div class="confirm" @click="confirm">{{'GameConfirm' | translate}}</div>
      </div>
    </div>
    <div v-show="infoBubble" class="info-wrapper">
      <div class="content">
        <div class="title">
          {{'Notifications' | translate}}
        </div>
        <p class="notify">{{'NotificationArea' | translate }}</p>
        <div class="confirm" @click="infoConfirm">{{'GameConfirm' | translate}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import dice from '../dice/dice';
  import baidu from '../baidu/baidu';
  import gmap from '../gmap/gmap';
  import gmapres from '../gmap/gmapres';
  import Vue from 'vue';
  export default {
    name: 'game',
    components: {
      dice,
      baidu,
      gmap,
      gmapres
    },
    methods: {
      stopmove (turn) {
        // console.log('emit stop move');
        this.btnDis = false
      },
      disable (turn) {
        if (turn === 2) {
          this.btnDis = true
        } else if (turn === 1) {
          this.btnDis = false
        }
      },
      computerplay (turn) {
        this.setDice(turn)
      },
      setDice (turn) {
        this.btnDis = true;
        let tmp1 = Math.floor(Math.random() * 6) + 1;
        let tmp2 = Math.floor(Math.random() * 6) + 1;
        if (tmp1 === tmp2) {
          if (tmp1 === 1) {
            tmp1 = 6;
          } else {
            tmp1 = tmp1 - 1;
          }
        }
        this.diceNum = tmp1;
        // console.log('diceNum1: ' + this.diceNum);
        this.diceVisible = true;
        setTimeout(() => {
          this.$refs.map.panto(turn);
          this.diceNum = tmp2;
          // console.log('diceNum2: ' + this.diceNum);
        }, 900);
        setTimeout(() => {
          this.diceVisible = false;
          this.$refs.map.movechar(this.diceNum, turn);
        }, 1700);
        // this.diceVisible = true;
        // this.$refs.map.movechar(1);
      },
      info () {
        this.btnDis = true;
        this.btnDis1 = true;
        this.hintBubble = true;
      },
      change () {
        this.showOriginGame = !this.showOriginGame
        this.$refs.map.ok()
      },
      confirm () {
        this.hintBubble = false;
        this.btnDis1 = false;
        this.btnDis = false;
      },
      infoConfirm () {
        this.infoBubble = false;
        this.btnDis1 = false;
        this.btnDis = false;
      }
    },
    computed: {
      dice () {
        return Vue.i18n.translate('diceTitle');
      },
      num () {
        return this.diceNum;
      },
      btnDisEnable () {
        return this.btnDis;
      },
      btnDisEnable1 () {
        return this.btnDis1;
      }
    },
    data () {
      /* eslint-disable */
      return {
        showOriginGame: true,
        hintBubble: false,
        infoBubble: true,
        btnDis: true,
        btnDis1: true,
        diceVisible: false,
        diceNum: 1,
        styleNull: null,
        styleJson: [
          {
            'featureType': 'poilabel',
            'elementType': 'all',
            'stylers': {
              'visibility': 'on'
            }
          },
          {
            'featureType': 'manmade',
            'elementType': 'all',
            'stylers': {
              'visibility': 'on'
            }
          },
          {
            'featureType': 'building',
            'elementType': 'all',
            'stylers': {
              'visibility': 'on'
            }
          },
          {
            'featureType': 'background',
            'elementType': 'all',
            'stylers': {
              'visibility': 'on'
            }
          },
          {
            'featureType': 'road',
            'elementType': 'all',
            'stylers': {
              'visibility': 'on'
            }
          }
          ,
          {
            'featureType': 'administrative',
            'elementType': 'all',
            'stylers': {
              'visibility': 'on'
            }
          }
        ]
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .app
    position: relative
    top: 0
    .btn
      background: url("./dice.png")
      background-size: 40px 40px
      width: 40px
      height: 40px
      position: fixed
      top: 50px
      left: 10px
      font-size: 20px
      // color: #fff
      z-index: 10
      border: 1px solid rgba(240, 20, 20, 0.9)
      border-radius: 4px
      // background: rgba(7, 17, 27, 0.1)
      &.active
        opacity: 0.5
        //background: rgba(177, 177, 127, 0.9)
    .btn1
      background: url("./i.png")
      background-size: 40px 40px
      width: 40px
      height: 40px
      position: fixed
      top: 95px
      left: 10px
      font-size: 20px
      // color: #fff
      z-index: 10
      border: 1px solid rgba(240, 20, 20, 0.9)
      border-radius: 4px
      // background: rgba(7, 17, 27, 0.1)
      &.active
        opacity: 0.5
    .btn2
      background: url("./c.png")
      background-size: 40px 40px
      width: 40px
      height: 40px
      position: fixed
      top: 145px
      left: 10px
      font-size: 20px
      // color: #fff
      z-index: 10
      border: 1px solid rgba(240, 20, 20, 0.9)
      border-radius: 4px
      // background: rgba(7, 17, 27, 0.1)
      &.active
        opacity: 0.5
        //background: rgba(177, 177, 127, 0.9)
    .run_dice
      position: absolute
      display: block
      top: 30%
      left: calc(50% - 50px)
      z-index: 10
    .hint-wrapper
      position: absolute
      top: 110px
      left: 0
      width: 90%
      // margin: 0 auto
      border-radius: 10px
      padding: 8px 18px 18px 18px
      // filter: blur(1px);
      border: 1px solid rgba(7, 17, 27, 1)
      background: rgba(7, 17, 27, 0.9)
      text-align: left
      font-size: 16px
      color: #fff
      transition: all 0.7s
      ul
        margin-top: 10px
        font-size: 12px
        font:italic 1em Georgia, serif;
        li
          padding: 1px 0
      .title
        text-align: center
        border-bottom: 1px solid rgba(240, 240, 240, 1)
      .confirm
        width: 100px
        margin: 5px auto
        text-align: center
        border: 1px solid rgba(240, 240, 240, 1)
        border-radius: 10px
    .info-wrapper
      position: absolute
      top: 160px
      left: auto
      width: 70%
      margin: 0 10%
      border-radius: 10px
      padding: 8px 18px 18px 18px
      // filter: blur(1px);
      border: 1px solid rgba(7, 17, 27, 1)
      background: rgba(7, 17, 27, 0.9)
      text-align: left
      font-size: 16px
      color: #fff
      transition: all 0.7s
      .title
        text-align: center
        border-bottom: 1px solid rgba(240, 240, 240, 1)
        margin-bottom: 10px
      .notify
        text-align: center
        margin-bottom: 10px
      .confirm
        width: 100px
        margin: 5px auto
        text-align: center
        border: 1px solid rgba(240, 240, 240, 1)
        border-radius: 10px
</style>
