<template>
  <div class="showcase">
    <div class="showcase-top">
      <img src="./hot.png" alt="Hotmel">
      <!--<a href="#" class="btn btn-rounded">Sign In</a>-->
    </div>
    <div class="showcase-content">
      <h1>{{'navigating' | translate}}</h1>
      <h1>{{'melbourne' | translate}}</h1>
      <p>Try it</p>
      <a @click="showLoadingPage" class="btn btn-xl">
        {{'learningmore' | translate}} <font-awesome-icon :icon="['fas', 'angle-right']" :class="btn-lg"></font-awesome-icon>
      </a>
    </div>
  </div>
</template>

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
  @import url('https://fonts.googleapis.com/css?family=Roboto+Condensed|Lobster|Montserrat|Cabin|Herr+Von+Muellerhoff|Source+Sans+Pro:400,900&display=swap');
  .showcase
    z-index: 100
    width: 100%
    height: 100vh
    position: fixed
    background: url('./mel.png') no-repeat center center/cover
    &:after
      content: ''
      position: fixed
      z-index: 100
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: 1
      background: rgba(0, 0, 0, 0.6)
      box-shadow: inset 40px 40px 60px #000, inset -40px -40px 60px #000
    .showcase-top
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
      margin: auto
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      text-align: center
      margin-top: 7rem
      color: #fff;
      h1
        //font-family: 'Herr Von Muellerhoff', cursive
        //color: #fff
        //letter-spacing: 0.3rem
        font-weight: 700
        font-size: 2.2rem
        lint-height: 1.1
        margin: 0 0 0px
      p
        font-family: 'Source Sans Pro', sans-serif
        text-transform: uppercase
        color: #fff
        font-weight: 400
        font-size: 1.3rem
        line-height: 1.25
        margin: 1rem 0 0rem
      .btn-xl
        font-size: 1rem
        padding: 0.5rem 0.6rem
        margin-top: 30px
        text-transform: uppercase
        color: #fff
        background: #e50914
        border-radius: 20px
        box-shadow: 0 1px 0 rgba(0, 0, 0, 0.45)
</style>
