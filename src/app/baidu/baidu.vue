<template>
  <div class="container">
    <baidu-map @dragstart="mapScroll" @click="mapClick" ak="0OIDQ50iIsKfa2gmRjMNDTTYvZ3kUkZ2" class="map" :center="center" :min-zoom="zoom-1" :max-zoom="zoom+1" :zoom="zoom" @ready="handler">
      <new-polyline
        v-if="points && points.length >= 2 && checkpoints({ points })"
        :path="points"
        stroke-color= "#ec5454"
        :stroke-opacity="0.8"
        :stroke-weight="16"
      ></new-polyline>
      <bm-marker v-for="item of nodepointsCpu" :key="item._id" :position="{lng: item.lng, lat: item.lat}"
                @click="clickMark(item._id)" :icon="{url: item.url, size: {width: item.iconSize, height: item.iconSize}}"

      >
        <bm-info-window :title="infoWindow.info.title" :position="{lng: item.lng, lat: item.lat}" :show="item.show" :closeOnClick="false" @close="infoWindowClose(item)" @open="infoWindowOpen(item)">
          <P><span width="100px" class="left">{{infoWindow.info.title}}</span>&nbsp;&nbsp;<span class="right">{{infoWindow.info.subtitle}}</span></P>
          <p><img src="./rich.png"></p>
        </bm-info-window>
      </bm-marker>
    </baidu-map>
    <transition name="fade">
      <div v-show="bubble" class="content-wrapper">
        <div class="avatar">
          <img width="96" height="96" src="./mouniver.png">
        </div>
        <div class="content">
          <div class="title">
            {{title}}
          </div>
          <div class="subtitle">
            {{subtitle}}
          </div>
          <div class="description1">
            {{desc1}}
          </div>
          <div class="description2">
            {{desc2}}
          </div>
          <div class="info">
            {{info}}
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div v-show="buyBubble" class="buyinfo-wrapper">
      <div class="content">
        <div class="Title">
          {{'info' | translate}}
        </div>
        <div class="subtitle">
          {{subtitle}}
        </div>
        <div class="description1">
          {{desc1}}
        </div>
        <div class="inner">
          <div @click="buy" class="buy">
            {{'buy'| translate}}
          </div>
          <div @click="cancel" class="cancel">
            {{'cancel' | translate}}
          </div>
        </div>
      </div>
    </div>
    </transition>
    <transition name="fade">
      <div v-show="hintInfoBubble" class="hintinfo-wrapper">
        <div class="content">
          <div class="Title">
            {{'info' | translate}}
          </div>
          <div class="subtitle">
            {{hintInfo1}}
          </div>
          <div class="description1">
            {{hintInfo2}}
          </div>
          <div class="description2">
            {{hintInfo3}}
          </div>
          <div class="inner">
            <div @click="confirm" class="buy">
              {{'GameConfirm'| translate}}
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div v-show="hintBubble" class="hint-wrapper">
      <div class="content">
        <div class="Title">
          {{'info' | translate}}
        </div>
        <div class="subtitle">
          {{area}}
        </div>
        <div class="description1">
          {{ypay}}
        </div>
      </div>
    </div>
    </transition>
    <transition name="fade">
      <div v-show="overBubble" class="over-wrapper">
      <div class="content">
        <div class="Title">
          {{'over' | translate}}
        </div>
        <div class="subtitle">
          {{winlose}}
        </div>
        <div @click="ok" class="OK">
          {{'ok' | translate}}
        </div>
      </div>
    </div>
    </transition>
    <div v-show="true"  class="infowindow">
      <div class="left">
        <div class="left1">{{'yasserts' | translate}}</div>
        <div class="left2">${{yassets}}</div>
        <div class="left3">{{'oasserts'| translate}}</div>
        <div class="left4">${{oassets}}</div>
      </div>
      <div class="right">
        <div class="right1">{{hint1}}</div>
        <div class="right2">{{hint2}}</div>
        <div class="right3">{{hint3}}</div>
        <div class="right4">{{hint4}}</div>
      </div>
      <div class="background">
        <img src="./mel.png" width="100%" height="100%">
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */  // "#0091ea"
  import BaiduMap from 'vue-baidu-map/components/map/Map.vue';
  import NewPolyline from '../polyline/polyline';
  // import BmView from "vue-baidu-map/components/map/MapView";
  // import BmLocalSearch from "vue-baidu-map/components/search/LocalSearch";
  import BmMarker from "vue-baidu-map/components/overlays/Marker"; //Marker
  import BmInfoWindow from "vue-baidu-map/components/overlays/InfoWindow";
  import Vue from 'vue';

  const coins = 10000;
  const allSteps = 16;
  const allMinorSteps = 16 * 4;
  const playerMarker = allSteps + 1;
  const opponentMarker = allSteps;
  export default {
    name: 'baidu',
    components: {
      BaiduMap,
      NewPolyline,
      BmMarker,
      BmInfoWindow
    },
    props: {
      styleJsonProps: {
        type: []
      }
    },
    data () {
      return {
        map: {},
        BMap: {},
        center: { lng: 144.964564, lat: -37.817304 }, // { lng: 144.979633, lat: -37.823845 },
        zoom: 14,
        points: [],
        icons: [],
        nodepoints: [],
        internalpoints: [],
        centerArr: [],
        node: require('./node.png'),
        nodes: require('./nodes.png'),
        nodec: require('./nodec.png'),
        rich: require('./rich.png'),
        computer: require('./computer.png'),
        playerPos: 0,
        opponentPos: 0,
        count: 0,
        step: 0,
        minSteps: 0,
        timer: null,
        turn: 1, // 1: player 2: opponent
        stepTurn: 1,
        isPlaying: false,
        isShowInfo: false,
        infoWindow: {
          info: {}
        },
        bubble: false,
        buyBubble: false,
        hintBubble: false,
        overBubble: false,
        styleJson: [
          {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": {
              "visibility": "off"
            }
          },
          {
            "featureType": "poilabel",
            "elementType": "all",
            "stylers": {
              "visibility": "on"
            }
          },
          {
            "featureType": "manmade",
            "elementType": "all",
            "stylers": {
              "visibility": "on"
            }
          },
          {
            "featureType": "building",
            "elementType": "all",
            "stylers": {
              "visibility": "on"
            }
          }
        ],
        styleJsonNull: [],
        title: 'Title 1',
        subtitle: 'Sub Title',
        desc1: 'This is description one',
        desc2: 'This is description two',
        info: 'This is information',
        area: '',
        ypay: '',
        yassets: coins,
        oassets: coins,
        yEnergy: 1, // multiply * 2 * 1.5
        oEnergy: 1, // do not clear，keep
        yDoubleDice: false, // true player dice number double after false
        oDoubleDice: false, // true opponent dice number double after false
        yRepeatDice: false, // player play twice  after set false
        oRepeatDice: false, // opponent play twice after set false
        yDenyDice: false, // player can not play after set false
        oDenyDice: false, // opponent can not play after set false
        yPrevDoubleDice: false,
        oPrevDoubleDice: false,
        yPrevRepeatDice: false, // player last play twice after set false
        oPrevRepeatDice: false, // opponent last play twice after set false
        yPrevDenyDice: false, // player last can not play after set false false
        oPrevDenyDice: false, // opponent last can not play after false
        fromPlayer: false,
        fromOpponent: false,
        yPlayed: 0, // played set 0
        oPlayed: 0, //
        hint1: ' ',
        hint2: ' ',
        hint3: ' ',
        hint4: ' ',
        winlose: '',
        turnHint: false,
        allenergy: 1,
        yAllSteps: 0,
        oAllSteps: 0,
        hintInfo1: '',
        hintInfo2: '',
        hintInfo3: '',
        hintInfoBubble: false,
        buyed: false,
        scrollMap: false,
        lookMarker: false,
        timeStamp: 0,
        prevStamp: 0,
        ysecondStep: false,
        osecondStep: false,
        styleJson1: [
          {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": {
              "visibility": "off"
            }
          },
          {
            "featureType": "poilabel",
            "elementType": "all",
            "stylers": {
              "visibility": "on"
            }
          },
          {
            "featureType": "manmade",
            "elementType": "all",
            "stylers": {
              "visibility": "on"
            }
          },
          {
            "featureType": "building",
            "elementType": "all",
            "stylers": {
              "visibility": "on"
            }
          },
          {
          "featureType": "land",
          "elementType": "geometry",
          "stylers": {
            "color": "#fffff9ff"
          }
        }, {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": {
            "color": "#69b0acff"
          }
        }, {
          "featureType": "highway",
          "elementType": "geometry.fill",
          "stylers": {
            "color": "#b5caa0ff"
          }
        }, {
          "featureType": "highway",
          "elementType": "geometry.stroke",
          "stylers": {
            "color": "#94ad79ff"
          }
        }, {
          "featureType": "nationalway",
          "elementType": "geometry.fill",
          "stylers": {
            "color": "#b5caa0ff"
          }
        }, {
          "featureType": "arterial",
          "elementType": "geometry.fill",
          "stylers": {
            "color": "#d4e2c6ff"
          }
        }, {
          "featureType": "cityhighway",
          "elementType": "geometry.fill",
          "stylers": {
            "color": "#d4e2c6ff"
          }
        }, {
          "featureType": "provincialway",
          "elementType": "geometry.fill",
          "stylers": {
            "color": "#d4e2c6ff"
          }
        }, {
          "featureType": "provincialway",
          "elementType": "geometry.stroke",
          "stylers": {
            "color": "#b5caa0ff"
          }
        }, {
          "featureType": "tertiaryway",
          "elementType": "geometry.fill",
          "stylers": {
            "color": "#ffffffff"
          }
        }, {
          "featureType": "tertiaryway",
          "elementType": "geometry.stroke",
          "stylers": {
            "color": "#b5caa0ff"
          }
        }, {
          "featureType": "fourlevelway",
          "elementType": "geometry.fill",
          "stylers": {
            "color": "#ffffffff"
          }
        }, {
          "featureType": "fourlevelway",
          "elementType": "geometry.stroke",
          "stylers": {
            "color": "#b5caa0ff"
          }
        }, {
          "featureType": "subway",
          "elementType": "geometry",
          "stylers": {
            "visibility": "on"
          }
        }, {
          "featureType": "railway",
          "elementType": "geometry",
          "stylers": {
            "visibility": "on"
          }
        }, {
          "featureType": "highwaysign",
          "elementType": "labels",
          "stylers": {
            "visibility": "on"
          }
        }, {
          "featureType": "highwaysign",
          "elementType": "labels.icon",
          "stylers": {
            "visibility": "on"
          }
        }, {
          "featureType": "nationalwaysign",
          "elementType": "labels",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "nationalwaysign",
          "elementType": "labels.icon",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "provincialwaysign",
          "elementType": "labels",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "provincialwaysign",
          "elementType": "labels.icon",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "tertiarywaysign",
          "elementType": "labels",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "tertiarywaysign",
          "elementType": "labels.icon",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "subwaylabel",
          "elementType": "labels",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "subwaylabel",
          "elementType": "labels.icon",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "nationalway",
          "elementType": "geometry.stroke",
          "stylers": {
            "color": "#94ad79ff"
          }
        }, {
          "featureType": "cityhighway",
          "elementType": "geometry.stroke",
          "stylers": {
            "color": "#b5caa0ff"
          }
        }, {
          "featureType": "arterial",
          "elementType": "geometry.stroke",
          "stylers": {
            "color": "#b5caa0ff"
          }
        }, {
          "featureType": "highway",
          "stylers": {
            "curZoomRegionId": "0",
            "curZoomRegion": "6,9",
            "level": "6"
          }
        }, {
          "featureType": "highway",
          "stylers": {
            "curZoomRegionId": "0",
            "curZoomRegion": "6,9",
            "level": "7"
          }
        }, {
          "featureType": "highway",
          "stylers": {
            "curZoomRegionId": "0",
            "curZoomRegion": "6,9",
            "level": "8"
          }
        }, {
          "featureType": "highway",
          "stylers": {
            "curZoomRegionId": "0",
            "curZoomRegion": "6,9",
            "level": "9"
          }
        }, {
          "featureType": "highway",
          "elementType": "geometry",
          "stylers": {
            "visibility": "off",
            "curZoomRegionId": "0",
            "curZoomRegion": "6,9",
            "level": "6"
          }
        }, {
          "featureType": "highway",
          "elementType": "geometry",
          "stylers": {
            "visibility": "off",
            "curZoomRegionId": "0",
            "curZoomRegion": "6,9",
            "level": "7"
          }
        }, {
          "featureType": "highway",
          "elementType": "geometry",
          "stylers": {
            "visibility": "off",
            "curZoomRegionId": "0",
            "curZoomRegion": "6,9",
            "level": "8"
          }
        }, {
          "featureType": "highway",
          "elementType": "geometry",
          "stylers": {
            "visibility": "off",
            "curZoomRegionId": "0",
            "curZoomRegion": "6,9",
            "level": "9"
          }
        }, {
          "featureType": "highway",
          "elementType": "labels",
          "stylers": {
            "visibility": "off",
            "curZoomRegionId": "0",
            "curZoomRegion": "6,9",
            "level": "6"
          }
        }, {
          "featureType": "highway",
          "elementType": "labels",
          "stylers": {
            "visibility": "off",
            "curZoomRegionId": "0",
            "curZoomRegion": "6,9",
            "level": "7"
          }
        }, {
          "featureType": "highway",
          "elementType": "labels",
          "stylers": {
            "visibility": "off",
            "curZoomRegionId": "0",
            "curZoomRegion": "6,9",
            "level": "8"
          }
        }, {
          "featureType": "highway",
          "elementType": "labels",
          "stylers": {
            "visibility": "off",
            "curZoomRegionId": "0",
            "curZoomRegion": "6,9",
            "level": "9"
          }
        }, {
          "featureType": "nationalway",
          "stylers": {
            "curZoomRegionId": "0",
            "curZoomRegion": "6,9",
            "level": "6"
          }
        }, {
          "featureType": "nationalway",
          "stylers": {
            "curZoomRegionId": "0",
            "curZoomRegion": "6,9",
            "level": "7"
          }
        }, {
          "featureType": "nationalway",
          "stylers": {
            "curZoomRegionId": "0",
            "curZoomRegion": "6,9",
            "level": "8"
          }
        }, {
          "featureType": "nationalway",
          "stylers": {
            "curZoomRegionId": "0",
            "curZoomRegion": "6,9",
            "level": "9"
          }
        }, {
          "featureType": "nationalway",
          "elementType": "geometry",
          "stylers": {
            "visibility": "off",
            "curZoomRegionId": "0",
            "curZoomRegion": "6,9",
            "level": "6"
          }
        }, {
          "featureType": "nationalway",
          "elementType": "geometry",
          "stylers": {
            "visibility": "off",
            "curZoomRegionId": "0",
            "curZoomRegion": "6,9",
            "level": "7"
          }
        }, {
          "featureType": "nationalway",
          "elementType": "geometry",
          "stylers": {
            "visibility": "off",
            "curZoomRegionId": "0",
            "curZoomRegion": "6,9",
            "level": "8"
          }
        }, {
          "featureType": "nationalway",
          "elementType": "geometry",
          "stylers": {
            "visibility": "off",
            "curZoomRegionId": "0",
            "curZoomRegion": "6,9",
            "level": "9"
          }
        }, {
          "featureType": "nationalway",
          "elementType": "labels",
          "stylers": {
            "visibility": "off",
            "curZoomRegionId": "0",
            "curZoomRegion": "6,9",
            "level": "6"
          }
        }, {
          "featureType": "nationalway",
          "elementType": "labels",
          "stylers": {
            "visibility": "off",
            "curZoomRegionId": "0",
            "curZoomRegion": "6,9",
            "level": "7"
          }
        }, {
          "featureType": "nationalway",
          "elementType": "labels",
          "stylers": {
            "visibility": "off",
            "curZoomRegionId": "0",
            "curZoomRegion": "6,9",
            "level": "8"
          }
        }, {
          "featureType": "nationalway",
          "elementType": "labels",
          "stylers": {
            "visibility": "off",
            "curZoomRegionId": "0",
            "curZoomRegion": "6,9",
            "level": "9"
          }
        }, {
          "featureType": "provincialway",
          "stylers": {
            "curZoomRegionId": "0",
            "curZoomRegion": "8,9",
            "level": "8"
          }
        }, {
          "featureType": "provincialway",
          "stylers": {
            "curZoomRegionId": "0",
            "curZoomRegion": "8,9",
            "level": "9"
          }
        }, {
          "featureType": "provincialway",
          "elementType": "geometry",
          "stylers": {
            "visibility": "off",
            "curZoomRegionId": "0",
            "curZoomRegion": "8,9",
            "level": "8"
          }
        }, {
          "featureType": "provincialway",
          "elementType": "geometry",
          "stylers": {
            "visibility": "off",
            "curZoomRegionId": "0",
            "curZoomRegion": "8,9",
            "level": "9"
          }
        }, {
          "featureType": "provincialway",
          "elementType": "labels",
          "stylers": {
            "visibility": "off",
            "curZoomRegionId": "0",
            "curZoomRegion": "8,9",
            "level": "8"
          }
        }, {
          "featureType": "provincialway",
          "elementType": "labels",
          "stylers": {
            "visibility": "off",
            "curZoomRegionId": "0",
            "curZoomRegion": "8,9",
            "level": "9"
          }
        }, {
          "featureType": "cityhighway",
          "stylers": {
            "curZoomRegionId": "0",
            "curZoomRegion": "6,9",
            "level": "6"
          }
        }, {
          "featureType": "cityhighway",
          "stylers": {
            "curZoomRegionId": "0",
            "curZoomRegion": "6,9",
            "level": "7"
          }
        }, {
          "featureType": "cityhighway",
          "stylers": {
            "curZoomRegionId": "0",
            "curZoomRegion": "6,9",
            "level": "8"
          }
        }, {
          "featureType": "cityhighway",
          "stylers": {
            "curZoomRegionId": "0",
            "curZoomRegion": "6,9",
            "level": "9"
          }
        }, {
          "featureType": "cityhighway",
          "elementType": "geometry",
          "stylers": {
            "visibility": "off",
            "curZoomRegionId": "0",
            "curZoomRegion": "6,9",
            "level": "6"
          }
        }, {
          "featureType": "cityhighway",
          "elementType": "geometry",
          "stylers": {
            "visibility": "off",
            "curZoomRegionId": "0",
            "curZoomRegion": "6,9",
            "level": "7"
          }
        }, {
          "featureType": "cityhighway",
          "elementType": "geometry",
          "stylers": {
            "visibility": "off",
            "curZoomRegionId": "0",
            "curZoomRegion": "6,9",
            "level": "8"
          }
        }, {
          "featureType": "cityhighway",
          "elementType": "geometry",
          "stylers": {
            "visibility": "off",
            "curZoomRegionId": "0",
            "curZoomRegion": "6,9",
            "level": "9"
          }
        }, {
          "featureType": "cityhighway",
          "elementType": "labels",
          "stylers": {
            "visibility": "off",
            "curZoomRegionId": "0",
            "curZoomRegion": "6,9",
            "level": "6"
          }
        }, {
          "featureType": "cityhighway",
          "elementType": "labels",
          "stylers": {
            "visibility": "off",
            "curZoomRegionId": "0",
            "curZoomRegion": "6,9",
            "level": "7"
          }
        }, {
          "featureType": "cityhighway",
          "elementType": "labels",
          "stylers": {
            "visibility": "off",
            "curZoomRegionId": "0",
            "curZoomRegion": "6,9",
            "level": "8"
          }
        }, {
          "featureType": "cityhighway",
          "elementType": "labels",
          "stylers": {
            "visibility": "off",
            "curZoomRegionId": "0",
            "curZoomRegion": "6,9",
            "level": "9"
          }
        }, {
          "featureType": "entertainment",
          "elementType": "geometry",
          "stylers": {
            "color": "#e4f0d7ff"
          }
        }, {
          "featureType": "manmade",
          "elementType": "geometry",
          "stylers": {
            "color": "#effcf0ff",
            "visibility": "off"
          }
        }, {
          "featureType": "education",
          "elementType": "geometry",
          "stylers": {
            "color": "#e3f7e4ff"
          }
        }, {
          "featureType": "building",
          "elementType": "geometry.stroke",
          "stylers": {
            "color": "#a1cfa4ff",
            "visibility": "off"
          }
        }, {
          "featureType": "poilabel",
          "elementType": "labels",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "poilabel",
          "elementType": "labels.icon",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "education",
          "elementType": "labels.text.fill",
          "stylers": {
            "color": "#7a7a7aff"
          }
        }, {
          "featureType": "education",
          "elementType": "labels.text.stroke",
          "stylers": {
            "color": "#ffffffff"
          }
        }, {
          "featureType": "education",
          "elementType": "labels.text",
          "stylers": {
            "fontsize": 26
          }
        }, {
          "featureType": "manmade",
          "elementType": "labels.text.fill",
          "stylers": {
            "color": "#afafafff"
          }
        }, {
          "featureType": "manmade",
          "elementType": "labels.text",
          "stylers": {
            "fontsize": 26
          }
        }, {
          "featureType": "scenicspotslabel",
          "elementType": "labels.text.fill",
          "stylers": {
            "color": "#376b6dff"
          }
        }, {
          "featureType": "scenicspots",
          "elementType": "labels",
          "stylers": {
            "visibility": "on"
          }
        }, {
          "featureType": "scenicspotslabel",
          "elementType": "labels",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "scenicspotslabel",
          "elementType": "labels.text.stroke",
          "stylers": {
            "color": "#ffffffff",
            "weight": 4
          }
        }, {
          "featureType": "country",
          "elementType": "labels.text.fill",
          "stylers": {
            "color": "#376b6dff"
          }
        }, {
          "featureType": "country",
          "elementType": "labels.text.stroke",
          "stylers": {
            "color": "#ffffffff",
            "weight": 3
          }
        }, {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": {
            "color": "#ffffffff"
          }
        }, {
          "featureType": "water",
          "elementType": "labels.text.stroke",
          "stylers": {
            "color": "#ffffff00"
          }
        }, {
          "featureType": "water",
          "elementType": "labels.text",
          "stylers": {
            "fontsize": 24
          }
        }],
    }
    },
    methods: {
      mapScroll () {
        this.prevStamp = Math.floor(Date.now() / 1000);
        console.log('scroll map');
      },
      mapClick () {
        this.prevStamp = Math.floor(Date.now() / 1000);
        console.log('click map');
      },
      clickMark (id) {
        if (this.isPlaying || this.isShowInfo) {
          return;
        }
        if (id === 17) {
          id = this.opponentPos + 1;
        }
        if (id === 18) {
          id = this.playerPos + 1;
        }
        console.log('id: ' + id);
         this.$router.push({
          name: 'abc',
          params: { data: id }
        });
      },
      handler ({ BMap, map }) {
        // console.log(BMap, map)
       this.map = map;
       this.BMap = BMap;
        console.log(this.map)
        let mapStyle={
          // features: ['road', 'building', 'water', 'land'],
          style: 'midnight'
        };
        // map.setMapStyleV2({styleJson: this.styleJson1});
      // map.clickable = false;
       // map.centerAndZoom( this.playerPos.lng , this.playerPos.lat , this.zoom);
       // map.disableDragging();
       //map.disableScrollWheelZoom();
       if(this.styleJsonProps) {
          map.setMapStyle({
            styleJson: this.styleJsonProps,
          });
          console.log('you can shu')
        } else {
          console.log('wu can shu')
        }

        this.points = this.getPointsSomehow(BMap);
        this.nodepoints = this.getNodePoints();
        // this.calculate(BMap);
        // this.center.lng = 144.981433
        // this.center.lat = -37.810845
        // this.zoom = 14
        var sy = new BMap.Symbol(BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW, {
          scale: 0.6,
          strokeColor: '#fff',
          strokeWeight: '2'
        });
        let icons = new BMap.IconSequence(sy, '5%', '15%');
        this.icons.push(icons);

        setTimeout(() => {
          map.centerAndZoom( this.center.lng , this.center.lat , this.zoom +1);
        }, 1000);

      },
      getPointsSomehow (BMap) {
        let arr = [
          { lng: 144.909155, lat: -37.834977 },
          { lng: 144.923672, lat: -37.811547 },
          { lng: 144.936608, lat: -37.792444 },
          { lng: 144.946310, lat: -37.792444 },
          { lng: 144.964695, lat: -37.806643 },
          { lng: 144.980949, lat: -37.794040 },
          { lng: 144.994244, lat: -37.793755 },
          { lng: 145.009948, lat: -37.815822 },
          { lng: 145.022433, lat: -37.834976 },
          { lng: 145.009479, lat: -37.834292 },
          { lng: 144.999053, lat: -37.817418 },
          { lng: 144.989429, lat: -37.802251 },
          { lng: 144.964564, lat: -37.817304 },
          { lng: 144.943939, lat: -37.802251 },
          { lng: 144.936076, lat: -37.816278 },
          { lng: 144.925115, lat: -37.835122 },
          { lng: 144.909155, lat: -37.834977 },

        ];
        for(let i = 0; i < allMinorSteps; i++) {
         this.internalpoints[i] = { lng: this.center.lng, lat: this.center.lat };
        }
        for(let j = 0; j < (allSteps - 1); j++) {
          this.calculate(BMap, arr[j], arr[j+1], j);
        }
        this.calculate(BMap, arr[15], arr[0], allSteps - 1);

        for(let i = 0; i < allMinorSteps; i++) {
          console.log(i +' :lng: ' + this.internalpoints[i].lng + ' lat: ' + this.internalpoints[i].lat);
        }
        for(let k = 0; k < allMinorSteps; k++) {
          let point = new BMap.Point(this.internalpoints[k].lng, this.internalpoints[k].lat); // - 0.022);
          this.centerArr.push(point);
        }
        let point = new BMap.Point(this.center.lng, this.center.lat);
        this.centerArr.push(point);
        // console.log(BMap);
        return arr;
      },
      getNodePoints () {
        const arr = [
          { _id: 1, url: this.node, lng: 144.909155, lat: -37.834977, owner: 0, type: 7, buy: 2000, fee: 500, title: 'Title',subtitle: 'gallery',desc1: 'this is desc1 of 1',desc2: 'this is desc2 of 1',info: 'info1', show: false, iconSize: 32 },
          { _id: 2, url: this.node, lng: 144.923672, lat: -37.811547, owner: 0, type: 7, buy: 1000, fee: 250, title: 'Title',subtitle: 'Chinese Restaurant',desc1: 'this is desc1 of 2',desc2: 'this is desc2 of 2',info: 'info2', show: false, iconSize: 32 },
          { _id: 3, url: this.node, lng: 144.936608, lat: -37.792444, owner: 0, type: 7, buy: 2000, fee: 500, title: 'Title',subtitle: 'zoo',desc1: 'this is desc1 of 3',desc2: 'this is desc2 of 3',info: 'info3', show: false, iconSize: 32 },
          { _id: 4, url: this.node, lng: 144.946310, lat: -37.792444, owner: 0, type: 2, buy: 2000, fee: 500, title: 'Title',subtitle: 'university',desc1: 'this is desc1 of 4',desc2: 'this is desc2 of 4',info: 'info4', show: false, iconSize: 32 },
          { _id: 5, url: this.node, lng: 144.964695, lat: -37.806643, owner: 0, type: 3, buy: 2000, fee: 500, title: 'Title',subtitle: 'gaol',desc1: 'this is desc1 of 5',desc2: 'this is desc2 of 5',info: 'info5', show: false, iconSize: 32 },
          { _id: 6, url: this.node, lng: 144.980949, lat: -37.794040, owner: 0, type: 7, buy: 1000, fee: 250, title: 'Title',subtitle: 'Korean Restaurant',desc1: 'this is desc1 of 6',desc2: 'this is desc2 of 6',info: 'info6', show: false, iconSize: 32 },
          { _id: 7, url: this.node, lng: 144.994244, lat: -37.793755, owner: 0, type: 5, buy: 2000, fee: 500, title: 'Title',subtitle: 'station',desc1: 'this is desc1 of 7',desc2: 'this is desc2 of 7',info: 'info7', show: false, iconSize: 32 },
          { _id: 8, url: this.node, lng: 145.009948, lat: -37.815822, owner: 0, type: 7, buy: 1000, fee: 250, title: 'Title',subtitle: 'Indian Restaurant',desc1: 'this is desc1 of 8',desc2: 'this is desc2 of 8',info: 'info8', show: false, iconSize: 32 },
          { _id: 9, url: this.node, lng: 145.022433, lat: -37.834976, owner: 0, type: 7, buy: 2000, fee: 500, title: 'Title',subtitle: 'arena',desc1: 'this is desc1 of 9',desc2: 'this is desc2 of 9',info: 'info9', show: false, iconSize: 32 },
          { _id: 10, url: this.node, lng: 145.009479, lat: -37.834292, owner: 0, type: 7, buy: 1000, fee: 250, title: 'Title',subtitle: 'Japanese Restaurant',desc1: 'this is desc1 of 10',desc2: 'this is desc2 of 10',info: 'info10', show: false, iconSize: 32 },
          { _id: 11, url: this.node, lng: 144.999053, lat: -37.817418, owner: 0, type: 1, buy: 2000, fee: 500, title: 'Title',subtitle: 'library',desc1: 'this is desc1 of 11',desc2: 'this is desc2 of 11',info: 'info11', show: false, iconSize: 32 },
          { _id: 12, url: this.node, lng: 144.989429, lat: -37.802251, owner: 0, type: 7, buy: 2000, fee: 500, title: 'Title',subtitle: 'museum',desc1: 'this is desc1 of 12',desc2: 'this is desc2 of 12',info: 'info12', show: false, iconSize: 32 },
          { _id: 13, url: this.node, lng: 144.964564, lat: -37.817304, owner: 0, type: 4, buy: 2000, fee: 500, title: 'Title',subtitle: 'cathedral',desc1: 'this is desc1 of 13',desc2: 'this is desc2 of 13',info: 'info13', show: false, iconSize: 32 },
          { _id: 14, url: this.node, lng: 144.943939, lat: -37.802251, owner: 0, type: 7, buy: 2000, fee: 500, title: 'Title',subtitle: 'aquarium',desc1: 'this is desc1 of 14',desc2: 'this is desc2 of 14',info: 'info14', show: false, iconSize: 32 },
          { _id: 15, url: this.node, lng: 144.936076, lat: -37.816278, owner: 0, type: 6, buy: 2000, fee: 500, title: 'Title',subtitle: 'casino',desc1: 'this is desc1 of 12',desc2: 'this is desc2 of 12',info: 'info12', show: false, iconSize: 32 },
          { _id: 16, url: this.node, lng: 144.925115, lat: -37.835122, owner: 0, type: 7, buy: 1000, fee: 250, title: 'Title',subtitle: 'Western Restaurant',desc1: 'this is desc1 of 10',desc2: 'this is desc2 of 10',info: 'info10', show: false, iconSize: 32 },
          { _id: 17, url: this.computer, lng: 144.909155, lat: -37.834977, owner: 0, type: 0, buy: 2000, fee: 500, title: 'Title',subtitle: 'Sub Title',desc1: 'this is desc1 of 13',desc2: 'this is desc2 of 13',info: 'info13', show: false, iconSize: 48 },
          { _id: 18, url: this.rich, lng: 144.909155, lat: -37.834977, owner: 0, type: 0, buy: 2000, fee: 500, title: 'Title',subtitle: 'Sub Title',desc1: 'this is desc1 of 14',desc2: 'this is desc2 of 14',info: 'info14', show: false, iconSize: 48 },

        ];
        return arr;
      },
      checkpoints ({ points }) {
        var originpoint = points[0];
        for (var i = 1; i < points.length; i++) {
          if (
            points[i].lat !== originpoint.lat ||
            points[i].lng !== originpoint.lng
          ) {
            return true;
          }
        }
        return false;
      },
      move () {
        // if((this.playerPos + this.step) <= 11) {
        if (this.stepTurn === 1) {
          this.isPlaying = true;
          this.nodepoints[playerMarker].lng = this.internalpoints[(this.playerPos * 4 + this.minSteps) % allMinorSteps].lng;
          this.nodepoints[playerMarker].lat = this.internalpoints[(this.playerPos * 4 + this.minSteps) % allMinorSteps].lat;
          //this.map.centerAndZoom(this.centerArr[(this.playerPos * 4 + this.minSteps) % 48], this.zoom);
          this.map.panTo(this.centerArr[(this.playerPos * 4 + this.minSteps) % allMinorSteps]);
          if (this.minSteps < this.count) {
            this.minSteps++;
            if(this.minSteps % 4 ===0) {
              this.yAllSteps++;
              if(this.yAllSteps < this.oAllSteps) {
                if(this.yAllSteps % allSteps === 0) {
                  this.allenergy += 1;
                  console.log('allenerty: ' + this.allenergy);
                  this.newHint(Vue.i18n.translate('allenergy'));
                }
              }
            }
          } else {
            this.ysecondStep = false;
            this.minSteps = 0;
            this.playerPos += this.step;
            this.playerPos = this.playerPos % allSteps;
            this.hintInfo1='';
            this.hintInfo2='';
            this.hintInfo3='';
            this.buyed = false;
            this.hintInfo1 = Vue.i18n.translate('arrive')+Vue.i18n.translate(this.nodepoints[this.playerPos].subtitle);
            this.newHint(this.hintInfo1);
            if (this.nodepoints[this.playerPos].type === 3) {
              this.yPrevDenyDice = true;
              this.hintInfo2=Vue.i18n.translate('stop');
              this.newHint(this.hintInfo2);
              // console.log('type 3');
            }
            if (this.nodepoints[this.playerPos].type === 4) {
              this.yDoubleDice = true;
              this.hintInfo2=Vue.i18n.translate('double');
              this.newHint(this.hintInfo2);
              // console.log('type 3');
            }
            if (this.nodepoints[this.playerPos].type === 5) {
              this.yPrevRepeatDice = true;
              this.hintInfo2=Vue.i18n.translate('twice');
              this.newHint(this.hintInfo2);
              console.log('player type 5');
            }
            if (this.nodepoints[this.playerPos].type === 1) {
              this.yEnergy *= 1.5;
              this.hintInfo2=Vue.i18n.translate('onehalf');
              this.newHint(this.hintInfo2);
              console.log('type 1');
            }
            if (this.nodepoints[this.playerPos].type === 2) {
              this.yEnergy *= 2;
              this.hintInfo2=Vue.i18n.translate('two');
              this.newHint(this.hintInfo2);
              console.log('type 2');
            }
            if (this.nodepoints[this.playerPos].type === 6) {
              let tmp = Math.floor(Math.random() * 100) + 1;
              if(tmp < 11) {
                this.hintInfo2=Vue.i18n.translate('congrate') + 5000;
                this.newHint(this.hintInfo2);
                this.yassets += 5000;
              }
              if(tmp > 10 && tmp < 41) {
                this.hintInfo2=Vue.i18n.translate('congrate') + 3000;
                this.newHint(this.hintInfo2);
                this.yassets += 3000;
              }
              if(tmp > 40) {
                this.hintInfo2=Vue.i18n.translate('unfor') + 1000;
                this.newHint(this.hintInfo2);
                this.yassets -= 1000;
              }
              console.log('type 6: ' + this.yassets);
            }
          //  this.newHint(Vue.i18n.translate('arrive')+Vue.i18n.translate(this.nodepoints[this.playerPos].subtitle));
            if (this.nodepoints[this.playerPos].type === 7) {
                if(this.nodepoints[this.playerPos].owner === 2) {
                  this.oassets += this.nodepoints[this.playerPos].fee * this.oEnergy * this.allenergy;
                  this.yassets -= this.nodepoints[this.playerPos].fee * this.oEnergy * this.allenergy;
                  this.area = Vue.i18n.translate(this.nodepoints[this.playerPos].subtitle) + Vue.i18n.translate('area');
                  this.ypay = Vue.i18n.translate('ypay') + this.nodepoints[this.playerPos].fee * this.oEnergy  * this.allenergy;
                  this.hintInfo2=this.area;
                  this.hintInfo3=this.ypay;
                  this.newHint(this.area);
                  this.newHint(this.ypay);
                  //this.hintBubble = true;
                  //this.isShowInfo = true;
                  //this.hideHintBubble();
                }
              if((this.yassets >= this.nodepoints[this.playerPos].buy  * this.allenergy) && (this.nodepoints[this.playerPos].owner === 0)) {
                this.buyBubble = true;
                this.isShowInfo = true;
                this.buyed = true;
              }
              if ((this.yassets < this.nodepoints[this.playerPos].buy  * this.allenergy) && (this.nodepoints[this.playerPos].owner === 0)) {
                this.hintInfo2=Vue.i18n.translate('yconnotafford');
                this.newHint(this.hintInfo2);
              }
            }
            if (this.buyed === false) {
              this.isShowInfo = true;
              this.hintInfoBubble = true;
            }
            //this.newHint('You buy the house');
            setTimeout(() => {
              this.title = this.nodepoints[this.playerPos].title;
              this.subtitle = '';
              this.subtitle =Vue.i18n.translate('arrive') + Vue.i18n.translate(this.nodepoints[this.playerPos].subtitle);
              this.desc1 = Vue.i18n.translate('value') + this.nodepoints[this.playerPos].buy  * this.allenergy + Vue.i18n.translate('want');
              this.desc2 = this.nodepoints[this.playerPos].desc2;
              this.info = this.nodepoints[this.playerPos].info;
            }, 1000);
            // this.turn = 2;
            // this.$emit('stopMove', this.turn);
            this.isPlaying = false;
            // console.log('from baidu');
            this.fromPlayer = true;
            this.fromOpponent = false;
            clearInterval(this.timer);
          }
        } else if (this.stepTurn === 2) {
          this.isPlaying = true;
          this.nodepoints[opponentMarker].lng = this.internalpoints[(this.opponentPos * 4 + this.minSteps) % allMinorSteps].lng;
          this.nodepoints[opponentMarker].lat = this.internalpoints[(this.opponentPos * 4 + this.minSteps) % allMinorSteps].lat;
          //this.map.centerAndZoom(this.centerArr[(this.opponentPos * 4 + this.minSteps) % 48], this.zoom);
          this.map.panTo(this.centerArr[(this.opponentPos * 4 + this.minSteps) % allMinorSteps]);
          if (this.minSteps < this.count) {
            this.minSteps++;
            if(this.minSteps % 4 === 0) {
              this.oAllSteps++;
              if(this.oAllSteps < this.yAllSteps) {
                if(this.oAllSteps % allSteps === 0) {
                  this.allenergy += 1;
                  console.log('allenerty: ' + this.allenergy);
                  this.newHint(Vue.i18n.translate('allenergy'));
                }
              }
            }
          } else {
            this.turnHint = false;
            this.minSteps = 0;
            this.opponentPos += this.step;
            this.opponentPos = this.opponentPos % allSteps;
            this.hintInfo1='';
            this.hintInfo2='';
            this.hintInfo3='';
            this.buyed = false;
            this.hintInfo1=Vue.i18n.translate('oarrive')+Vue.i18n.translate(this.nodepoints[this.opponentPos].subtitle);
            this.newHint(this.hintInfo1);
            if (this.nodepoints[this.opponentPos].type === 3) {
              this.oPrevDenyDice = true;
              this.hintInfo2=Vue.i18n.translate('ostop');
              this.newHint(this.hintInfo2);
              // console.log('opponent type 3');
            }
            if (this.nodepoints[this.opponentPos].type === 4) {
              this.oDoubleDice = true;
              this.hintInfo2=Vue.i18n.translate('odouble');
              this.newHint(this.hintInfo2);
              // console.log('opponent type 3');
            }
            if (this.nodepoints[this.opponentPos].type === 5) {
              this.oPrevRepeatDice = true;
              this.hintInfo2=Vue.i18n.translate('otwice');
              this.newHint(this.hintInfo2);
              console.log('opponent type 5');
            }
            if (this.nodepoints[this.opponentPos].type === 1) {
              this.oEnergy *= 1.5;
              this.hintInfo2=Vue.i18n.translate('oonehalf');
              this.newHint(this.hintInfo2);
              console.log('Opp type 1');
            }
            if (this.nodepoints[this.opponentPos].type === 2) {
              this.oEnergy *= 2;
              this.hintInfo2=Vue.i18n.translate('otwo');
              this.newHint(this.hintInfo2);
              console.log('Opp type 2');
            }
            if (this.nodepoints[this.opponentPos].type === 6) {
              let tmp = Math.floor(Math.random() * 100) + 1;
              if(tmp < 11) {
                this.hintInfo2=Vue.i18n.translate('ocongrate') + 5000;
                this.newHint(this.hintInfo2);
                this.oassets += 5000;
              }
              if(tmp > 10 && tmp < 41) {
                this.hintInfo2=Vue.i18n.translate('ocongrate') + 3000;
                this.newHint(this.hintInfo2);
                this.oassets += 3000;
              }
              if(tmp > 40) {
                this.hintInfo2=Vue.i18n.translate('ounfor') + 1000;
                this.newHint(this.hintInfo2);
                this.oassets -= 1000;
              }
              console.log('Opp type 6: ' + this.oassets);
            }
            if (this.nodepoints[this.opponentPos].type === 7) {
              if((this.oassets >= this.nodepoints[this.opponentPos].buy * this.allenergy) && (this.nodepoints[this.opponentPos].owner === 0)) {
                let tmp = Math.floor(Math.random() * 2) + 1;
                console.log("opponent random: " + tmp);
                if(tmp === 1) {
                  this.oassets -= this.nodepoints[this.opponentPos].buy  * this.allenergy;
                  this.nodepoints[this.opponentPos].owner = 2;
                  this.nodepoints[this.opponentPos].url = this.nodec;
                  this.hintInfo2=Vue.i18n.translate('obuy')+Vue.i18n.translate(this.nodepoints[this.opponentPos].subtitle);
                  this.hintInfo3=Vue.i18n.translate('ocost') + this.nodepoints[this.opponentPos].buy  * this.allenergy;
                  this.newHint(this.hintInfo2);
                  this.newHint(this.hintInfo3);
                }
              }
              if((this.oassets < this.nodepoints[this.opponentPos].buy * this.allenergy) && (this.nodepoints[this.opponentPos].owner === 0)) {
                this.hintInfo2=Vue.i18n.translate('oconnotafford');
                this.newHint(this.hintInfo2);
              }
              if(this.nodepoints[this.opponentPos].owner === 1) {
                this.yassets += this.nodepoints[this.opponentPos].fee * this.yEnergy  * this.allenergy;
                this.oassets -= this.nodepoints[this.opponentPos].fee * this.yEnergy  * this.allenergy;
                // this.area = Vue.i18n.translate(this.nodepoints[this.playerPos].subtitle) + Vue.i18n.translate('area');
                // this.ypay = Vue.i18n.translate('ypay') + this.nodepoints[this.opponentPos].fee * this.yEnergy;
                this.area = Vue.i18n.translate(this.nodepoints[this.opponentPos].subtitle) + Vue.i18n.translate('yarea');
                this.ypay = Vue.i18n.translate('opay') + this.nodepoints[this.opponentPos].fee * this.yEnergy  * this.allenergy;
                this.hintInfo2=this.area;
                this.hintInfo3=this.ypay;
                this.newHint(this.area);
                this.newHint(this.ypay);
              }
            }
            this.isShowInfo = true;
            this.hintInfoBubble = true;
            setTimeout(() => {
            }, 500);
            this.isPlaying = false;
            // console.log('from baidu');
            this.fromPlayer = false;
            this.fromOpponent = true;
            clearInterval(this.timer);
          }
        }
      },
      movechar (step, turn) {
        clearInterval(this.timer);

        this.step = step;
        this.stepTurn = turn;

        if (turn === 1) {
          //this.map.panTo(this.centerArr[this.playerPos * 4]);
          this.newHint(Vue.i18n.translate('dice') + step);
          if(this.yDoubleDice) {
            this.yDoubleDice = false;
            step = step * 2;
            this.step = step;
          }
        }

        if (turn === 2) {
          //this.map.panTo(this.centerArr[this.opponentPos * 4]);
          this.newHint(Vue.i18n.translate('odice') + step);
          if(this.oDoubleDice) {
            this.oDoubleDice = false;
            step = step * 2;
            this.step = step;
          }
        }

        this.count = step * 4;
        this.timer = setInterval(this.move, 200);
      },
      panto(turn) {
        if (turn === 1) {
          setTimeout(() => {
            this.map.panTo(this.centerArr[this.playerPos * 4]);
          }, 300);
        };
        if (turn === 2) {
          setTimeout(() => {
            this.map.panTo(this.centerArr[this.opponentPos * 4]);
          }, 300);
        }
      },
      calculate (BMap, point1, point2, num) {
        let num1 = num * 4;
        let num2 = (num + 1) * 4 - 1;
        let tmp = point2;
        this.internalpoints[num1] = point1;

        // this.internalpoints[num2] = point2;
        let lng1 = parseFloat(this.internalpoints[num1].lng);
        let lat1 = parseFloat(this.internalpoints[num1].lat);
        let lng2 = parseFloat(tmp.lng);
        let lat2 = parseFloat(tmp.lat);
        let lngca = (Math.max(lng1,lng2) - Math.min(lng1,lng2))/2;
        let latca = (Math.max(lat1,lat2) - Math.min(lat1,lat2))/2;
        let lngcenter = Math.min(lng1,lng2) + lngca;
        let latcenter = Math.min(lat1,lat2) + latca;
        let pointcenter = new BMap.Point(lngcenter,latcenter);
        this.internalpoints[num1+2] = pointcenter;

        lng2 = parseFloat(this.internalpoints[num1+2].lng);
        lat2 = parseFloat(this.internalpoints[num1+2].lat);
        lngca = (Math.max(lng1,lng2) - Math.min(lng1,lng2))/2;
        latca = (Math.max(lat1,lat2) - Math.min(lat1,lat2))/2;
        lngcenter = Math.min(lng1,lng2) + lngca;
        latcenter = Math.min(lat1,lat2) + latca;
        pointcenter = new BMap.Point(lngcenter,latcenter);
        this.internalpoints[num1+1] = pointcenter;

        lng1 = parseFloat(this.internalpoints[num1+2].lng);
        lat1 = parseFloat(this.internalpoints[num1+2].lat);
        lng2 = parseFloat(tmp.lng);
        lat2 = parseFloat(tmp.lat);
        lngca = (Math.max(lng1,lng2) - Math.min(lng1,lng2))/2;
        latca = (Math.max(lat1,lat2) - Math.min(lat1,lat2))/2;
        lngcenter = Math.min(lng1,lng2) + lngca;
        latcenter = Math.min(lat1,lat2) + latca;
        pointcenter = new BMap.Point(lngcenter,latcenter);
        this.internalpoints[num1+3] = pointcenter;
      },
      loop () {
        // console.log('loop');
        if (this.yassets < 0) {
          this.overBubble = true;
          this.isShowInfo = true;
          this.bubble = false;
          this.buyBubble = false;
          this.hintBubble = false;
          this.hintInfoBubble = false;
          this.winlose = Vue.i18n.translate('lose');
          return;
        }
        if (this.oassets < 0) {
          this.overBubble = true;
          this.isShowInfo = true;
          this.bubble = false;
          this.buyBubble = false;
          this.hintBubble = false;
          this.hintInfoBubble = false;
          this.winlose = Vue.i18n.translate('win');
          return;
        }

        this.timeStamp = Math.floor(Date.now() / 1000);
        if(this.timeStamp > this.prevStamp + 5) {
          //this.map.zoomAndPan(this.centerArr[this.playerPos * 4].lng , this.centerArr[this.playerPos * 4].lat , this.zoom);
          this.map.panTo(this.centerArr[this.playerPos * 4]);
          this.prevStamp = Math.floor(Date.now() / 1000);
        }

        if(this.isShowInfo) {
           console.log('showinfo');
           return;
         }
         if (!this.isPlaying && this.fromPlayer && !this.isShowInfo) {
           if(this.yRepeatDice) {
             this.turn = 1;
             this.newHint(Vue.i18n.translate('yturn'));
             this.$emit('stopMove', this.turn);
             this.yRepeatDice = false;
             this.map.panTo(this.centerArr[this.playerPos * 4]);
             this.turnHint = false;
             this.ysecondStep = true;
             console.log('yRepeatDice');
             return;
           }
           if (this.ysecondStep ) {
             //this.ysecondStep = false;
             this.turn = 1;
             this.$emit('stopMove', this.turn);
             return;
           }
           this.yRepeatDice = this.yPrevRepeatDice;
          this.yDenyDice = this.yPrevDenyDice;
          this.yPrevRepeatDice = false;
          this.yPrevDenyDice = false;
          this.fromPlayer = false;
          if(this.oDenyDice) {
            this.turn = 1;
            this.oDenyDice = false;
            if (this.yDenyDice) { // add to prevent dead lock
              this.yDenyDice = false;
            }
            this.$emit('stopMove', this.turn);
            this.map.panTo(this.centerArr[this.playerPos * 4]);
            this.newHint(Vue.i18n.translate('yturn'));
            this.turnHint = false;
            return;
          } else {
            this.turn = 2;
            return;
          }
          // console.log('not playing');
        }
        if (!this.isPlaying && this.fromOpponent && !this.isShowInfo) {
          if(this.oRepeatDice) {
            this.turn = 2;
            this.newHint(Vue.i18n.translate('oturn'));
            this.isPlaying = true;
            console.log('oRepeatDice');
            console.log('1111111111111111111111111');
            this.$emit('computerplay', this.turn);
            this.$emit('disable', this.turn);
            this.oRepeatDice = false;
            this.map.panTo(this.centerArr[this.opponentPos * 4]);
            this.turnHint = false;
            return;
          }
          this.oRepeatDice = this.oPrevRepeatDice;
          this.oDenyDice = this.oPrevDenyDice;
          this.oPrevRepeatDice = false;
          this.oPrevDenyDice = false;
          this.fromOpponent = false;
          console.log('from opponent');
          console.log(this.yDenyDice);
          if(this.yDenyDice) {
            this.turn = 2;
            this.newHint(Vue.i18n.translate('oturn'));
            this.isPlaying = true;
            this.$emit('computerplay', this.turn);
            this.$emit('disable', this.turn);
            //if(!this.oRepeatDice) {
              this.yDenyDice = false;
            //}
            if (this.oDenyDice) { // add to prevent dead lock
              this.oDenyDice = false;
            }
            //this.$emit('stopMove', this.turn);
            console.log('deny pallll');
            this.$emit('disable', this.turn);
            this.map.panTo(this.centerArr[this.opponentPos * 4]);
            this.turnHint = false;
            return;
          } else {
            this.turn = 1;
            this.$emit('disable', 1);
            //this.newHint(Vue.i18n.translate('yturn'));
          }
        }

        if (this.turn === 1 && !this.isPlaying && !this.isShowInfo) {
          if (!this.turnHint) {
            this.newHint(Vue.i18n.translate('yturn'));
            this.turnHint = true;
          }
        }
        if (this.turn === 2 && !this.isPlaying && !this.isShowInfo) {
          console.log('opponent play');
          this.isPlaying = true;
          console.log('2222222222222222222222222222');
          this.$emit('computerplay', this.turn);
          this.$emit('disable', this.turn);
          this.map.panTo(this.centerArr[this.opponentPos * 4]);
          this.newHint(Vue.i18n.translate('oturn'));
          this.turnHint = false;
        }
      },
      infoWindowOpen (item) {
        item.show = true;
        // console.log(item)
      },
      infoWindowClose(item) {
        item.show = false;
        // console.log(item)
      },
      lookDetail(item) {
        this.infoWindow.info = item;
        item.show = true;
        this.$nextTick(() => {
          let el = document.querySelector('.BMap_pop');
          // console.log('left: ' + el.style.left);
          // console.log('top: ' + el.style.top);
          if(el.style.left < 0)
            el.style.left = 0;
          if(el.style.top < 0)
            el.style.top = 0;
        });
      },
      hideBubble() {
        setTimeout(() => {
          // this.newHint('Oppo turns! Good luck');
          this.turn = 2;
          // this.bubble = false;
          this.map.panTo(this.centerArr[this.opponentPos * 4]);
        }, 3000);
      },
      hideHintBubble() {
        setTimeout(() => {
          this.hintBubble = false;
          this.isShowInfo = false;
        }, 3000);
      },
      newHint(hint) {
        this.hint1 = this.hint2;
        this.hint2 = this.hint3;
        this.hint3 = this.hint4;
        this.hint4 = hint;
      },
      buy() {
        this.buyed = true;
        this.buyBubble = false;
        this.isShowInfo = false;
        this.hintInfo2 = Vue.i18n.translate('ybuy')+Vue.i18n.translate(this.nodepoints[this.playerPos].subtitle);
        this.newHint(this.hintInfo2);
        this.yassets -= this.nodepoints[this.playerPos].buy  * this.allenergy;
        this.hintInfo3 = Vue.i18n.translate('ycost') + this.nodepoints[this.playerPos].buy  * this.allenergy;
        this.newHint(this.hintInfo3);
        this.nodepoints[this.playerPos].owner = 1;
        this.nodepoints[this.playerPos].url = this.nodes;
        console.log('buy');
      },
      confirm() {
        this.isShowInfo = false;
        this.hintInfoBubble = false;
      },
      cancel() {
        this.buyed = false;
        this.buyBubble = false;
        this.isShowInfo = false;
        console.log('cancel');
      },
      newAssets(ySsset, oAsset) {
        this.yassets += ySsset;
        this.oassets =+ oAsset;
      },
      ok() {
        this.yAllSteps = 0;
        this.oAllSteps = 0;
        this.hintInfo1 = '';
        this.hintInfo2 = '';
        this.hintInfo3 = '';
        this.nodepoints = [];
        this.nodepoints = this.getNodePoints();
        this.playerPos = 0;
        this.opponentPos = 0;
        this.count = 0;
        this.step = 0;
        this.minSteps = 0;
        this.timer = null;
        this.turn = 1; // 1: player 2: computer
        this.stepTurn = 1;
        this.isPlaying = false;
        this.bubble = false;
        this.buyBubble = false;
        this.hintBubble = false;
        this.overBubble = false;
        this.styleJson = [];
        this.styleJsonNull = [];
        this.title = '';
        this.subtitle = '';
        this.desc1 = '';
        this.desc2 = '';
        this.info = 'This is information';
        this.area = '';
        this.ypay = '';
        this.yassets = coins;
        this.oassets = coins;
        this.yEnergy = 1; // multiply * 2 * 1.5
        this.oEnergy = 1; // donot clear，keep it
        this.allenergy = 1;
        this.yDoubleDice = false; // true player dice number double after false
        this.oDoubleDice = false; // true opponent dice number double after false
        this.yRepeatDice = false; // player play twice  after set false
        this.oRepeatDice = false; // opponent play twice after set false
        this.yDenyDice = false; // player can not play after set false
        this.oDenyDice = false; // opponent can not play after set false
        this.yPrevRepeatDice = false; // player last play twice after set false
        this.oPrevRepeatDice = false; // opponent last play twice after set false
        this.yPrevDenyDice = false; // player last can not play after set false false
        this.oPrevDenyDice = false; // opponent last can not play after false
        this.fromPlayer = false;
        this.fromOpponent = false;
        this.overBubble = false;
        this.isShowInfo = false;
        this.winlose = '';
        this.turnHint = false;
        this.bubble = false;
        this.buyBubble = false;
        this.hintBubble = false;
        this.hintInfoBubble = false;
        this.scrollMap = false;
        this.lookMarker = false;
        this.timeStamp = 0;
        this.prevStamp = 0;
        this.ysecondStep = false;
        this.osecondStep = false;
        this.$emit('disable', this.turn);
      }
    },
    computed: {
      nodepointsCpu() {
        return this.nodepoints;
      }
    },
    created () {
      this.$nextTick(() => {
        setInterval(this.loop, 2000);
        if(this.turn === 1) {
          //this.newHint(Vue.i18n.translate('yturn'));
        } else {
          //this.newHint(Vue.i18n.translate('oturn'));
        }
      });
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/mixin.styl'
  .container
    overflow-y: hidden;
    overflow-x: hidden;
    .map
      width: 100%
      height: 640px
      border-radius: 5px
      overflow-y: hidden;
      overflow-x: hidden;
      >>> .BMap_pop
        border-radius: 10px
      >>> .BMap_bubble_title
        text-align: center
        color: red
        text-size: 16px
      >>> .BMap_bubble_content
        text-align: center
        text-size: 10px
        .right
          text-align: center
        .left
          width: 100px
      img
        max-width: inherit
      >>> .anchorBL
        display: none
      >>> .anchorTR
        display: none
      >>> .BMap_zlHolder
        display: none
    .content-wrapper
      position: absolute
      top: 30%
      left: calc(50% - 135px)
      width: 250px
      // margin: 0 auto
      border-radius: 10px
      padding: 18px
      border: 1px solid rgba(7, 17, 27, 0.8)
      background: rgba(7, 17, 27, 0.8)
      color: #fff
      transition: all 0.7s
      &.fade-transition
        opacity: 1
        background: rgba(7, 17, 27, 0.8)
      &.fade-enter, &.fade-leave
        opacity: 0
        background: rgba(7, 17, 27, 0)
      .avatar
        display: inline-block
        vertical-align: top
        img
          border-radius: 4px
      .content
        overflow: hidden
        text-overflow: ellipsis
        font-size: 14px
        line-height: 16px
        display: inline-block
        margin-left: 5px
        text-align: center
        .title
          font-size: 18px
          font-weight: 700
          line-height: 22px
          width: 145px
          white-space: nowrap
          overflow: hidden
          text-overflow: ellipsis
        .subtitle
          font-size: 14px
          font-weight: 500
          line-height: 20px
          width: 190px
          white-space: nowrap
          overflow: hidden
          text-overflow: ellipsis
        .description1
          font-size: 16px
          font-weight: 400
          line-height: 20px
          width: 145px
          white-space: nowrap
          overflow: hidden
          text-overflow: ellipsis
        .description2
          font-size: 16px
          font-weight: 400
          line-height: 20px
          width: 145px
          white-space: nowrap
          overflow: hidden
          text-overflow: ellipsis
        .info
          font-size: 16px
          font-weight: 400
          line-height: 20px
          width: 145px
          white-space: nowrap
          overflow: hidden
          text-overflow: ellipsis
    .buyinfo-wrapper
      position: absolute
      top: 30%
      left: calc(50% - 135px)
      width: 250px
      // margin: 0 auto
      border-radius: 10px
      padding: 18px
      border: 1px solid rgba(7, 17, 27, 0.8)
      background: rgba(7, 17, 27, 0.8)
      text-align: center
      color: #fff
      transition: all 0.7s
      &.fade-transition
        opacity: 1
        background: rgba(7, 17, 27, 0.8)
      &.fade-enter, &.fade-leave
        opacity: 0
        background: rgba(7, 17, 27, 0)
      .content
        overflow: hidden
        text-overflow: ellipsis
        display: inline-block
        margin-left: 5px
        font-size: 14px
        line-height: 14px
        text-align: center
        .title
          font-size: 14px
          font-weight: 700
          line-height: 24px
          width: 240px
          white-space: nowrap
          overflow: hidden
          text-overflow: ellipsis
        .subtitle
          font-size: 10px
          font-weight: 500
          line-height: 20px
          width: 240px
          white-space: nowrap
          overflow: hidden
          text-overflow: ellipsis
        .description1
          font-size: 10px
          font-weight: 400
          line-height: 20px
          width: 240px
          white-space: nowrap
          overflow: hidden
          text-overflow: ellipsis
        .inner
          display: inline-block
          margin-top: 6px
          .buy
            display: inline-block
            margin-right: 40px
            background: rgba(7, 17, 27, 0.9)
            padding: 3px 6px
            border: 1px solid rgba(7, 17, 27, 1)
            border-radius: 3px
          .cancel
            display: inline-block
            padding: 3px 6px
            background: rgba(7, 17, 27, 0.9)
            border-radius: 3px
    .hintinfo-wrapper
      position: absolute
      top: 30%
      left: calc(50% - 135px)
      width: 250px
      // margin: 0 auto
      border-radius: 10px
      padding: 18px
      border: 1px solid rgba(7, 17, 27, 0.8)
      background: rgba(7, 17, 27, 0.8)
      text-align: center
      color: #fff
      transition: all 0.7s
      &.fade-transition
        opacity: 1
        background: rgba(7, 17, 27, 0.8)
      &.fade-enter, &.fade-leave
        opacity: 0
        background: rgba(7, 17, 27, 0)
      .content
        overflow: hidden
        text-overflow: ellipsis
        display: inline-block
        margin-left: 5px
        font-size: 14px
        line-height: 14px
        text-align: center
        .title
          font-size: 14px
          font-weight: 700
          line-height: 24px
          width: 240px
          white-space: nowrap
          overflow: hidden
          text-overflow: ellipsis
        .subtitle
          font-size: 10px
          font-weight: 500
          line-height: 20px
          width: 240px
          white-space: nowrap
          overflow: hidden
          text-overflow: ellipsis
        .description1
          font-size: 10px
          font-weight: 400
          line-height: 20px
          width: 240px
          white-space: nowrap
          overflow: hidden
          text-overflow: ellipsis
        .description2
          font-size: 10px
          font-weight: 400
          line-height: 20px
          width: 240px
          white-space: nowrap
          overflow: hidden
          text-overflow: ellipsis
        .inner
          display: inline-block
          margin-top: 6px
          .buy
            display: inline-block
            //margin-right: 40px
            background: rgba(7, 17, 27, 0.9)
            padding: 3px 6px
            border: 1px solid rgba(7, 17, 27, 1)
            border-radius: 3px
    .hint-wrapper
      position: absolute
      top: 30%
      left: calc(50% - 135px)
      width: 250px
      // margin: 0 auto
      border-radius: 10px
      padding: 18px
      border: 1px solid rgba(7, 17, 27, 0.8)
      background: rgba(7, 17, 27, 0.8)
      text-align: center
      color: #fff
      transition: all 0.7s
      &.fade-transition
        opacity: 1
        background: rgba(7, 17, 27, 0.8)
      &.fade-enter, &.fade-leave
        opacity: 0
        background: rgba(7, 17, 27, 0)
      .content
        overflow: hidden
        text-overflow: ellipsis
        display: inline-block
        margin-left: 5px
        font-size: 14px
        line-height: 14px
        text-align: center
        .title
          font-size: 14px
          font-weight: 700
          line-height: 24px
          width: 240px
          white-space: nowrap
          overflow: hidden
          text-overflow: ellipsis
        .subtitle
          font-size: 10px
          font-weight: 500
          line-height: 20px
          width: 240px
          white-space: nowrap
          overflow: hidden
          text-overflow: ellipsis
        .description1
          font-size: 10px
          font-weight: 400
          line-height: 20px
          width: 240px
          white-space: nowrap
          overflow: hidden
          text-overflow: ellipsis
    .over-wrapper
      position: absolute
      top: 30%
      left: calc(50% - 135px)
      width: 250px
      // margin: 0 auto
      border-radius: 10px
      padding: 18px
      border: 1px solid rgba(7, 17, 27, 0.8)
      background: rgba(7, 17, 27, 0.8)
      text-align: center
      color: #fff
      transition: all 0.7s
      &.fade-transition
        opacity: 1
        background: rgba(7, 17, 27, 0.8)
      &.fade-enter, &.fade-leave
        opacity: 0
        background: rgba(7, 17, 27, 0)
      .content
        overflow: hidden
        text-overflow: ellipsis
        display: inline-block
        margin-left: 5px
        font-size: 14px
        line-height: 14px
        text-align: center
        .title
          font-size: 14px
          font-weight: 700
          line-height: 24px
          width: 240px
          white-space: nowrap
          overflow: hidden
          text-overflow: ellipsis
        .subtitle
          font-size: 10px
          font-weight: 500
          line-height: 20px
          width: 240px
          white-space: nowrap
          overflow: hidden
          text-overflow: ellipsis
        .OK
          display: inline-block
          margin-top: 6px
          background: rgba(7, 17, 27, 0.9)
          padding: 3px 6px
          border: 1px solid rgba(7, 17, 27, 1)
          border-radius: 3px
    .infowindow
      position: fixed
      overflow: hidden
      width: 99.5%
      height: 82px
      display: flex
      left: 0
      right: 0px
      bottom: 0px
      margin: 0 0px 0 0px
      padding: 0px 0
      color: #fff
      border: 1px solid rgba(7, 17, 27, 0.9)
      background: rgba(7, 17, 27, 0.9)
      border-radius: 10px
      font-size: 14px
      line-height: 20px
      .left
        flex: 0 0 105px
        width: 105px
        margin: 0 10px
        // padding: 0 5px
        border: 1px solid rgba(230, 245, 220, 0.8)
        border-radius: 10px
        .left1
          border-bottom: 1px solid rgba(230, 245, 220, 0.8)
          text-align: center
        .left2
          border-bottom: 1px solid rgba(230, 245, 220, 0.8)
          text-align: center
          font-weight: 700
          color: rgb(230, 240, 0)
        .left3
          border-bottom: 1px solid rgba(230, 245, 220, 0.8)
          text-align: center
        .left4
          text-align: center
          font-weight: 700
          color: rgb(230, 240, 0)
      .right
        flex: 1
        //padding: 0 5px
        border: 1px solid rgba(230, 245, 220, 0.8)
        border-radius: 10px
        .right1
          //border-bottom: 1px solid rgba(230, 245, 220, 0.8)
          padding-left: 5px
        .right2
          //border-bottom: 1px solid rgba(230, 245, 220, 0.8)
          padding-left: 5px
        .right3
          //border-bottom: 1px solid rgba(230, 245, 220, 0.8)
          padding-left: 5px
        .right4
          padding-left: 5px
          color: rgba(240, 20, 20, 0.95)
    .background
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: -1
      filter: blur(20px)
</style>
