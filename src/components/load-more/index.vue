<template>
  <div class="weui-panel weui-panel_access">
    <div class="weui-panel__hd" v-if="header" @click="onClickHeader" v-html="header">
      <slot name="header"></slot>
    </div>
    <div class="weui-panel__bd">
      <slot name="body">
        <!--type==='1'-->
        <template v-if="type === '1'">
          <a
            :href="getUrl(item.url)"
            v-for="item in list"
            @click.prevent="onItemClick(item)"
            class="weui-media-box weui-media-box_appmsg"
          >
            <div class="weui-media-box__hd" v-if="item.src">
              <img
                class="weui-media-box__thumb"
                :src="item.src"
                @error="onImgError(item, $event)"
                alt
              >
            </div>
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title" v-html="item.title"></h4>
              <p class="weui-media-box__desc" v-html="item.desc"></p>
            </div>
          </a>
        </template>
        <!--type==='2'-->
        <template v-if="type === '2'">
          <div
            class="weui-media-box weui-media-box_text"
            v-for="item in list"
            @click.prevent="onItemClick(item)"
          >
            <h4 class="weui-media-box__title" v-html="item.title"></h4>
            <p class="weui-media-box__desc" v-html="item.desc"></p>
          </div>
        </template>
        <!--type==='3'-->
        <template v-if="type === '3'">
          <div class="weui-media-box weui-media-box_small-appmsg">
            <div class="weui-cells">
              <a
                class="weui-cell weui-cell_access"
                :href="getUrl(item.url)"
                v-for="item in list"
                @click.prevent="onItemClick(item)"
              >
                <div class="weui-cell__hd">
                  <img
                    :src="item.src"
                    alt
                    @error="onImgError(item, $event)"
                    style="width:20px;margin-right:5px;display:block"
                  >
                </div>
                <div class="weui-cell__bd">
                  <p v-html="item.title"></p>
                </div>
                <span class="weui-cell__ft"></span>
              </a>
            </div>
          </div>
        </template>
        <!--type==='4'-->
        <!-- <template v-if="type === '4'">
          <div class="weui-media-box weui-media-box_text" v-for="item in list" @click.prevent="onItemClick(item)">
            <h4 class="weui-media-box__title" v-html="item.title"></h4>
            <p class="weui-media-box__desc" v-html="item.desc"></p>
            <ul class="weui-media-box__info" v-if="item.meta">
              <li class="weui-media-box__info__meta" v-html="item.meta.source"></li>
              <li class="weui-media-box__info__meta" v-html="item.meta.date"></li>
              <li class="weui-media-box__info__meta weui-media-box__info__meta_extra" v-html="item.meta.other"></li>
            </ul>
          </div>
        </template>-->
        <!--type==='4'-->
        <template v-if="type === '4'">
          <a
            :href="getUrl(item.url)"
            v-for="item in list"
            @click.prevent="onItemClick(item)"
            class="weui-media-box weui-media-box_appmsg"
          >
            <div class="weui-media-box__thumb_small" v-if="item.src">
              <img class="weui-media-box__thumb_small" :src="item.src" alt=" 图片">
            </div>
            <div >
              <p class="weui-media-box__title_small">{{item.title}}</p>
              <p class="weui-media-box__desc2">{{item.desc}}</p>

              <p algin = "center" class="vux-rater weui-media-box__desc2">
                 <!-- <input v-model="item.currentValue" style="display:none">  -->
                 <span :style="{color: '#04BE02' ,marginRight:margin+'px',fontSize: fontSize1 + 'px', width: fontSize1 + 'px', height: fontSize1 + 'px', lineHeight: fontSize1 + 'px'}">重要性：</span>
                <a class="vux-rater-box" v-for="i in max" @click="handleClick(i-1)" :class="{'is-active': item.currentValue > i-1}" :style="{color: item.currentValue > i-1 ? '#04BE02' : '#ccc',marginRight:margin+'px',fontSize: fontSize + 'px', width: fontSize + 'px', height: fontSize + 'px', lineHeight: fontSize + 'px'}">
                  <span class="vux-rater-inner"><span v-html="star"></span><span class="vux-rater-outer" :style="{color: activeColor, width: cutPercent + '%'}" v-if="cutPercent > 0 && cutIndex === i-1" v-html="star"></span></span>
                </a>
              </p>
            </div>
          </a>
        </template>


        <!--type==='5'-->
        <template v-if="type === '5'">
          <div
            class="weui-media-box weui-media-box_text"
            v-for="(item,index) in list"
           
          >
            <div >
              <div class="weui-media-box__hd" v-if="item.src">
                <img
                  class="weui-media-box__thumb"
                  @error="onImgError(item, $event)"
                  :src="item.src"
                  alt
                >
              </div>
              <div class="weui-media-box__bd">
               <p>
                <span class="weui-media-box__desc" v-html="item.title"> </span>
                
                </p>
               
              </div>
            </div>
            <ul class="weui-media-box__info" v-for="(descitem,ind) in item.desclist" v-if="descitem.desc">
              <a  @click.prevent="onXuanClick(index,ind,descitem)">
              <li class="weui-media-box__info__meta"  v-html="descitem.desc"></li>
              </a>
              
            </ul>
          </div>
          
        </template>
      </slot>
    </div>

    <div class="weui-panel__ft">
      <a
        class="weui-cell weui-cell_access weui-cell_link"
       
        @click.prevent="onClickFooter"
      >
        <div class="weui-cell__bd" v-html="提交">{{'提交'}}</div>
      </a>
    </div>
  </div>
</template>

<script>
import { go, getUrl } from "../../libs/router";

export default {
  name: "panel",
  created() {
    this.currentValue = parseInt(this.value);
   // console.log('the vaule : '+  this.currentValue)
    // this.currentValue = 2
    //this.updateStyle()
  },
  mounted() {
    //this.currentValue = parseInt(this.list.value);
   // this.currentValue = 1
    console.log('the url : '+  getUrl(this.list[1].url))
    for (let ii = 0; ii < this.list.length; ii++) {
      this.list[ii].title = this.shitiTitle[ii] + this.list[ii].title + '( '+this.timu[this.list[ii].timutype] + this.list[ii].score + '分)'+'(   )'
      let desctemp = [...this.list[ii].desclist]
      for (let jj = 0; jj <this.list[ii].desclist.length; jj++) {
        if (this.list[ii].desclist[jj].desc) {
          this.list[ii].desclist[jj].desc = this.xuanTitle[jj] + this.list[ii].desclist[jj].desc;
        }
      }
    }
    //this.updateStyle()
  },
  props: {
    header: String,
    footer: Object,
    list: Array,
    type: {
      type: String,
      default: "1"
    },
    value: {
      type: [Number],
      default: 1
    },
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 3
    },
    currentValue: {
      type: [Number, String],
      default: 0
    },
    disabled: Boolean,
    star: {
      type: String,
      default: "★"
    },
    activeColor: {
      type: String,
      default: "#04BE02"
    },
    margin: {
      type: Number,
      default: 2
    },
    fontSize: {
      type: Number,
      default: 20
    },
    fontSize1: {
      type: Number,
      default: 16
    }
  },
  computed: {
    sliceValue() {
      const _val = this.currentValue.toFixed(2).split(".");
      return _val.length === 1 ? [_val[0], 0] : _val;
    },
    cutIndex() {
      return this.sliceValue[0] * 1;
    },
    cutPercent() {
      return this.sliceValue[1] * 1;
    }
  },
  methods: {
    onImgError(item, $event) {
      this.$emit("on-img-error", JSON.parse(JSON.stringify(item)), $event);
      if (item.fallbackSrc) {
        $event.target.src = item.fallbackSrc;
      }
    },
    getUrl(url) {
      return getUrl(url, this.$router);
    },
    onClickFooter() {
      this.$emit("on-click-footer");
      go(this.footer.url, this.$router);
    },
    onClickHeader() {
      this.$emit("on-click-header");
    },
    onItemClick(item) {
      this.$emit("on-click-item", item);
      console.log('the desc2 is:' + item.desc2)
      console.log('the item url:' + item.url)
      go(item.url, this.$router, item.desc2);
    },
    onXuanClick(index,ind,descitem) {
      //console.log('the index is:' + index)
     // console.log('the ind is:' + ind)
     // console.log('the click is:' + descitem.index)
      this.list[index].title = this.list[index].title.split('(')[0]
     // this.list[index].getanswer = this.xuanTitle[ind].split('：')[0]
      if (this.list[index].timutype === 0 || this.list[index].timutype === 2) {
        this.list[index].getanswer.trim()
        this.list[index].getanswer = this.xuanTitle[ind].split('：')[0]
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
    handleClick(i, force) {
      if (!this.disabled || force) {
        if (this.currentValue === i + 1) {
          this.currentValue = i < this.min ? this.min : i;
          this.updateStyle();
        } else {
          this.currentValue = i + 1 < this.min ? this.min : i + 1;
        }
      }
    },
    updateStyle() {
      for (var j = 0; j < this.max; j++) {
        if (j <= this.currentValue - 1) {
          this.$set(this.colors, j, this.activeColor);
        } else {
          this.$set(this.colors, j, "#ccc");
        }
      }
    }
  },
  data() {
    return {
      colors: [],
      currentValue: 0,
      shitiTitle: ['试题一：','试题二：','试题三：','试题四：','试题五：','试题六：','试题七：','试题八：','试题九：','试题十：',
      '试题十一：','试题十二：','试题十三：','试题十四：','试题十五：','试题十六：','试题十七：','试题十八：','试题十九：','试题二十：',
      '试题二十一：','试题二十二：','试题二十三：','试题试题二十四：','试题二十五：','试题试题二十六：','试题二十七：','试题二十八：','试题二十九：','试题三十：',
      '试题三十一：','试题三十二：','试题三十三：','试题三十四：','试题三十五：','试题三十六：','试题三十七：','试题三十八：','试题三十九：','试题四十：', 
      '试题四十一：','试题四十二：','试题四十三：','试题四十四：','试题四十五：','试题四十六：','试题四十七：','试题四十八：','试题四十九：','试题五十：',
      '试题五十一：','试题五十二：','试题五十三：','试题五十四：','试题五十五：','试题五十六：','试题五十七：','试题五十八：','试题五十九：','试题六十：',
      '试题六十一：','试题六十二：','试题六十三：','试题六十四：','试题六十五：','试题六十六：','试题六十七：','试题六十八：','试题六十九：','试题七十：',
      '试题七十一：','试题七十二：','试题七十三：','试题七十四：','试题七十五：','试题七十六：','试题七十七：','试题七十八：','试题七十九：','试题八十：',
      '试题八十一：','试题八十二：','试题八十三：','试题八十四：','试题八十五：','试题八十六：','试题八十七：','试题八十八：','试题八十九：','试题九十：',
      '试题九十一：','试题九十二：','试题九十三：','试题九十四：','试题九十五：','试题九十六：','试题九十七：','试题九十八：','试题九十九：','试题一百：' ],
      xuanTitle: ['A： ','B： ','C： ','D： ','E： ','F： ','G： ','H： ','I： ','J： ','K： ','L： ','M： ','N： ','O： ','P： ','Q： ','R： ','S： ','T： ','U： ','V： ','W： ','X： ','Y： ','Z： '],
      timu: ['单选题：','多选题：','判断题：']
    };
  },
  watch: {
    currentValue(val) {
      this.updateStyle();
      this.$emit("input", val);
    },
    value(val) {
      this.currentValue = val;
    }
  }
};
</script>

<style lang="less">
@import "../../styles/weui/widget/weui_cell/weui_cell_global";
@import "../../styles/weui/widget/weui_cell/weui_access";
@import "../../styles/weui/widget/weui_panel/weui_panel";
@import "../../styles/weui/widget/weui_media_box/weui_media_box";

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
