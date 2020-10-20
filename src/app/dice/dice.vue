<template>
  <div class='run_dice'>
    <div class="perspective">
      <div class='dice' :class="showDice">
        <div class='side top'></div>
        <div class='side front'></div>
        <div class='side left'></div>
        <div class='side back'></div>
        <div class='side right'></div>
        <div class='side bottom'></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'dice',
    props: {
      num: {
        type: Number,
        default: 1
      }
    },
    data () {
      return {
        dice: 1
      }
    },
    created () {
      /* setTimeout(() => {
            this.dice = 5;
      }, 900); */
    },
    computed: {
      showDice () {
        return 'show' + this.num;
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .run_dice
    // position: fixed
    display: inline-block
    width: 100px
    height: 100px
    border-radius: 15px
    background-color: rgba(39, 40, 34, 0.7)
    .perspective
      display: inline-block;
      margin: 0 auto;
      width: 100px;
      height: 100px;
      perspective: 100px
      .dice
        position: relative;
        width: 100%;
        height: 100%;
        transform-style: preserve-3d;
        transition: transform 0.5s
        .side
          position: absolute
          width: 100px
          height: 100px
          background-image: url('./dice-compressor-half.png')
          border-radius: 15px
          border: 1px solid #ccc
          opacity: 0.75
        .front
          background-position: -12px -12px
          transform: rotateY(0deg) translateZ(50px)
        .back
          background-position: -232px -120px
          transform: rotateX(180deg) translateZ(50px)
        .right
          background-position: -118px -6px
          transform: rotateY(90deg) translateZ(50px)
        .left
          background-position: -121px -118px
          transform: rotateY(-90deg) translateZ(50px)
        .top
          background-position: -230px -6px
          transform: rotateX(90deg) translateZ(50px)
        .bottom
          background-position: -6px -118px
          transform: rotateX(-90deg) translateZ(50px)
      .show1
        transform: translateZ(-50px) rotateY(0deg)
      .show6
        transform: translateZ(-50px) rotateX(-180deg)
      .show2
        transform: translateZ(-50px) rotateY(-90deg)
      .show5
        transform: translateZ(-50px) rotateY(90deg)
      .show3
        transform: translateZ(-50px) rotateX(-90deg)
      .show4
        transform: translateZ(-50px) rotateX(90deg)
</style>
