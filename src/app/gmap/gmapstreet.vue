<template>
  <div>
  <GmapMap ref="mapRef"
    :center="{lat:-37.817304, lng:144.964564}"
    :zoom="14"
    map-type-id="terrain"
    style="width: 500px; height: 500px"
  >
  </GmapMap>
  <gmap-street-view-panorama id="pano"
      :position="{lat: positions[pos].lat, lng: positions[pos].lng}"
      :pov="{ heading: -10, pitch: 10}"
      :motionTracking="false"
  ></gmap-street-view-panorama>
  </div>
</template>

<script>
  export default {
    // "{lat: -37.817304, lng: 144.964664}"
    name: 'gmap',
    data () {
      return {
        map: {},
        pos: 10,
        positions: [
          {label:'State Library of Victoria',lat: -37.809614, lng: 144.965522},
          {label:'Melbourne Zoo',lat: -37.7844448,lng: 144.951155},
          {label:'National Gallery Of Victoria',lat: -37.822501,lng: 144.969325},
          {label:'Old Gaol Melbourne',lat: -37.807696,lng: 144.965317},
          {label:'Flinder Street Railway Station',lat: -37.817576,  lng:  144.967341},
          {label:'Rod Laver Arena',lat:-37.8222549, lng:144.9797763},
          {label:'Melbourne Museum',lat: -37.8038825,lng: 144.9715813},
          {label:'St Paul’s Cathedral',lat: -37.8175268,lng: 144.9674523},
          {label:'Melbourne Aquarium',lat: -37.8209952,lng: 144.9579414},
          {label:'Crown Melbourne',lat: -37.8242877,lng: 144.9566494},
          {label:'University of Melbourne',lat: -37.7993406,lng: 144.9612954},
        ]
      }
    },
    mounted () {
      this.$refs.mapRef.$mapPromise.then((map) => {
        this.map = map
        console.log('google map:' + map)
      })
    }
  }
</script>

<style scoped>
  #pano {
    margin: 10px auto;
    left: 2vw;
    width: 95vw;
    height: 95vw;
  }
</style>
