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
           <a
            :href="getUrl(item.url)"
            v-for="item in list"
            @click.prevent="onItemClick(item)"
            class="weui-media-box weui-media-box_appmsg"
          >
            
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
            v-for="item in list"
            @click.prevent="onItemClick(item)"
          >
            <div class="weui-media-box_appmsg">
              <div class="weui-media-box__hd" v-if="item.src">
                <img
                  class="weui-media-box__thumb"
                  @error="onImgError(item, $event)"
                  :src="item.src"
                  alt
                >
              </div>
              <div class="weui-media-box__bd">
                <h4 class="weui-media-box__title" v-html="item.title"></h4>
                <p class="weui-media-box__desc" v-html="item.desc"></p>
              </div>
            </div>
            <ul class="weui-media-box__info" v-if="item.meta">
              <li class="weui-media-box__info__meta" v-html="item.meta.source"></li>
              <li class="weui-media-box__info__meta" v-html="item.meta.date"></li>
              <li
                class="weui-media-box__info__meta weui-media-box__info__meta_extra"
                v-html="item.meta.other"
              ></li>
            </ul>
          </div>
        </template>
      </slot>
    </div>
    <div class="weui-panel__ft">
      <a
        class="weui-cell weui-cell_access weui-cell_link"
        :href="getUrl(footer.url)"
        v-if="footer && footer.title && type !== '3'"
        @click.prevent="onClickFooter"
      >
        <div class="weui-cell__bd" v-html="footer.title"></div>
      </a>
    </div>
  </div>
</template>

<script>
import { go, getUrl } from "../../libs/router";

export default {
  name: "palist",
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
      currentValue: 0
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
