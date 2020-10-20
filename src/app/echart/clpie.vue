<template>
  <div id="clpie" :class="className" :style="{height:height,width:width,padding:'30px 0 0 0',margin:'40px 0px 0 0'}"/>

</template>

<script>
  import echarts from 'echarts'
  require('echarts/theme/macarons') // echarts theme
  import { debounce } from './bounce'

  export default {
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '90%'
      },
      height: {
        type: String,
        default: '250px'
      },
      pdata: {
        type: Array,
        default: []
      },
      plegend: {
        type: Array,
        default: []
      },
      name: {
        type: String,
        default: ''
      }
    },
    watch: {
      pdata: {
        deep: true,
        handler (val) {
          this.setOptions(val, this.plegend)
        }
      }
    },
    data () {
      return {
        chart: null,
        subTitle: '\n\n\n\n  (单位: 人)'
      }
    },
    mounted () {
      this.initChart()
      this.setOptions(this.pdata, this.plegend)
      this.__resizeHandler = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHandler)
    },
    beforeDestroy () {
      if (!this.chart) {
        return
      }
      window.removeEventListener('resize', this.__resizeHandler)
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      setOptions (data, plegend) {
        this.chart.setOption({
          title: {
            text: this.subTitle, // .split('').join('\n'),
            textStyle: {
              align: 'right',
              margin: '-20px 0',
              verticalAlign: 'top',
              color: '#f01414',
              fontSize: 12
            }
          },
          tooltip: {
            trigger: 'item',
            position: ['20%', '70%'],
            extraCssText: 'z-index: 999999',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            y: '-0px',
            orient: 'vertical',
            left: 'right',
            data: plegend
          },
          calculable: true,
          series: [
            {
              name: this.name,
              type: 'pie',
              // roseType: 'angle', // 'radius',
              radius: '65%', // radius: [15, 95],
              center: ['50%', '45%'],
              hoverAnimation: true,
              data: data,
              animationEasing: 'cubicInOut',
              animationDuration: 2600
            }
          ]
        })
      },
      initChart () {
        this.chart = echarts.init(document.getElementById('clpie'), 'macarons')
      }
    }
  }
</script>
<style>
  #lpie {
    z-index: 1
  }
</style>
