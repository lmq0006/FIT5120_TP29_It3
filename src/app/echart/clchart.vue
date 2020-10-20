<template>
  <div id="clchart" :class="className" style="min-height:260px;margin-top: 1em;" :style="{height:height,width:width}"/>
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
      llegend: {
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
        subTitle: '                     (单位: 人)'
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
      this.setOptions(this.chartData, this.llegend)
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
          xAxis: {
            data: axislabel,
            boundaryGap: false,
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#666',
                width: 1
              }
            }
          },
          grid: {
            show: false,
            borderColor: '#000',
            backgroundColor: '#ccc',
            left: 10,
            right: 10,
            bottom: 20,
            top: 30,
            containLabel: true
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            },
            padding: [5, 10],
            position: ['20%', '90%']
          },
          dataZoom: {
            show: true,
            start: 0,
            end: 100,
            maxSpan: 100
            // zoomLock: true
          },
          yAxis: {
            axisTick: {
              show: false
            },
            axisLine: {
             lineStyle: {
               color: '#666',
               width: 1
             }
            }
          },
          legend: {
            y: '10%',
            orient: 'vertical',
            left: 'right',
            data: lengend
          },
          series: [{
            name: lengend[0], // 'Asian-Born',
              itemStyle: {
              normal: {
                color: '#FF005A',
                lineStyle: {
                  color: '#FF005A',
                  width: 2
                }
              }
            },
            smooth: true,
            type: 'line',
            data: expectedData,
            animationDuration: 2800,
            animationEasing: 'cubicInOut'
          },
            {
              name: lengend[1], // 'European-Born',
              smooth: true,
              type: 'line',
              itemStyle: {
                normal: {
                  color: '#3888fa',
                  lineStyle: {
                    color: '#3888fa',
                    width: 2
                  },
                  areaStyle: {
                    color: '#f3f8ff'
                  }
                }
              },
              data: actualData,
              animationDuration: 2800,
              animationEasing: 'quadraticOut'
            }]
        })
      },
      initChart () {
        // this.chart = echarts.init(this.$el, 'macarons')
        this.chart = echarts.init(document.getElementById('clchart'), 'macarons')
        // this.setOptions(this.chartData, this.llegend)
      }
    }
  }
</script>
<style>
  #lchart {
    z-index: 1
  }
</style>
