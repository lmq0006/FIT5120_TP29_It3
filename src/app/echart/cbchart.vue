<template>
  <div id="cbchart" :class="className" style="min-height:260px;margin-top: 1em;" :style="{height:height,width:width}"/>
</template>

<script>
  import echarts from 'echarts'
  require('echarts/theme/macarons') // echarts theme
  import { debounce } from './bounce'
  const animationDuration = 6000
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
        default: '300px'
      },
      autoResize: {
        type: Boolean,
        default: true
      },
      chartData: {
        type: Object,
        required: true
      },
      blegend: {
        type: Array,
        required: true
      },
      id: {
        type: String,
        default: 'chart'
      }
    },
    data () {
      return {
        chart: null,
        subTitle: '         (单位: 占比)'
      }
    },
    watch: {
      chartData: {
        deep: true,
        handler (val) {
          this.setOptions(val)
        }
      }
    },
    mounted () {
      this.initChart()
      this.setOptions(this.chartData, this.blegend)
      if (this.autoResize) {
        this.__resizeHandler = debounce(() => {
          if (this.chart) {
            this.chart.resize()
          }
        }, 100)
        window.addEventListener('resize', this.__resizeHandler)
      }

      // 监听侧边栏的变化
      const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
      sidebarElm.addEventListener('transitionend', this.sidebarResizeHandler)
    },
    beforeDestroy () {
      if (!this.chart) {
        return
      }
      if (this.autoResize) {
        window.removeEventListener('resize', this.__resizeHandler)
      }

      const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
      sidebarElm.removeEventListener('transitionend', this.sidebarResizeHandler)

      this.chart.dispose()
      this.chart = null
    },
    methods: {
      sidebarResizeHandler (e) {
        if (e.propertyName === 'width') {
          this.__resizeHandler()
        }
      },
      setOptions ({ expectedData, actualData, axislabel } = {}, lengend) {
        this.chart.setOption({
          title: {
            subtext: this.subTitle, // .split('').join('\n'),
            subtextStyle: {
              align: 'center',
              color: '#f01414',
              fontSize: 10
            }
          },
          tooltip: {
            trigger: 'axis',
            extraCssText: 'z-index: 9999999',
            position: ['20%', '90%'],
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            top: 10,
            left: '2%',
            right: '2%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            data: axislabel,
            axisTick: {
              alignWithLabel: true
            }
          }],
          yAxis: [{
            type: 'value',
            axisTick: {
              show: false
            }
          }],
          series: [{
            name: '数量',
            type: 'bar',
            stack: 'vistors',
            barWidth: '60%',
            data: expectedData,
            animationDuration
          }]
        })
      },
      initChart () {
        // this.chart = echarts.init(this.$el, 'macarons')
        this.chart = echarts.init(document.getElementById('cbchart'), 'macarons')
        // this.setOptions(this.chartData, this.blegend)
      }
    }
  }
</script>
<style>
  #bchart {
    z-index: 1
  }
</style>
