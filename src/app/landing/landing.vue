<template>
  <div class="showcase" :style="{background: 'url('+require('./mel.jpg') +') repeat-y center/cover'}">
    <!--<div class="showcase-top"> -->
      <!--<img src="./hot.png" alt="Hotmel">-->
      <!--<a href="#" class="btn btn-rounded">Sign In</a>-->
    <!--</div>-->
    <div class="showcase-content">
      <h1 class="h1">{{'navigating' | translate}}</h1>
      <h1>{{'melbourne' | translate}}</h1>
      <p class="p1">{{'P1' | translate}}</p>
      <p class="p2">{{'P2' | translate}}</p>
      <a @click="showLoadingPage" class="btn btn-xl">
        {{'learningmore' | translate}} <font-awesome-icon :icon="['fas', 'angle-right']" :class="btn-lg"></font-awesome-icon>
      </a>
    </div>
  </div>
</template>
<i18n>
  P1:
    zh-CN: 你以一种更有趣
    en: Get to know Melbourne
  P2:
    zh-CN: 的方式了解墨尔本
    en: in a interesting way
</i18n>
<script>
  export default {
    name: 'landing',
    methods: {
      showLoadingPage () {
        this.$emit('showLoading');
        // console.log('showLoadingPage');
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import url('https://fonts.googleapis.com/css?family=Baloo+Tammudu+2|Grandstander|Roboto+Condensed|Lobster|Montserrat|Cabin|Herr+Von+Muellerhoff|Source+Sans+Pro:400,900&display=swap');
  .showcase
    z-index: 100
    width: 100%
    height: 100vh
    position: fixed
    // background: url('./mel.jpg') repeat-y center/cover //:style="{background: 'url(' + reequire('./mel.jpg')+') repeat-y center/cover'}"
    &:after
      content: ''
      position: fixed
      z-index: 100
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: 1
      background: rgba(0, 0, 0, 0.2)
      //box-shadow: inset 40px 40px 60px #000, inset -40px -40px 60px #000
    .showcase-top
      //background-image: url("./hot.png")
      //background-repeat: no-repeat
      margin-top: 30px
      position: relative
      z-index: 100
      height: 90px
      a
        position: absolute
        top: 50%
        right: 0
        transform: translate(-50%, -50%)
      .btn
        display: inline-block
        background: #e50914
        color: #fff
        padding: 0.1rem 0.3rem
        font-size: 1rem
        text-align: center
        border: none
        cursor: point
        margin-right: 0.5rem
        outline: none
        box-shadow: 0 1px 0 rgba(0, 0, 0, 0.45)
        border-radius: 2px
        &:hover
          opacity: 0.8
      .btn-rounded
        border-radius: 5px
      img
        margin-top: 1rem
        width: 170px
        position: absolute
        z-index: 100
        top: 50%
        left: 50%
        transform: translate(-50%, -50%)
    .showcase-content
      position: relative
      z-index: 100
      top: 60px
      margin: auto
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      text-align: center
      margin-top: 7rem
      color: #fff;
      h1
        font-family: 'Grandstander', cursive
        //color: #fff
        //letter-spacing: 0.3rem
        font-weight: 700
        font-size: 2.5rem
        lint-height: 1.0
        margin: 0 0 1rem
      .h1
        margin-bottom: -1rem
      p
        font-family: 'Baloo Tammudu 2', sans-serif
        color: #fff
        font-weight: 500
        font-size: 1.5rem
        line-height: 1.2
        margin: 0rem 0 0rem
      .p2
        margin-bottom: 1rem
      .btn-xl
        font-family: 'Baloo Tammudu 2', sans-serif
        font-size: 1.3rem
        font-weight: 500
        padding: 0.8rem 0.9rem 0
        margin-top: 30px
        text-transform: uppercase
        color: #fff
        background: #6d9eeb
        border-radius: 20px
        box-shadow: 0 1px 0 rgba(0, 0, 0, 0.45)
</style>
