<template>
  <div id="map"></div>
</template>

<script>
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import "ol/ol.css";

export default {
  name: "UserMapLocation",
  components: {},
  props: {
    longitude: Number,
    latitude: Number
  },
  mounted() {
    new Map({
      view: new View({
        center: [this.longitude, this.latitude],
        zoom: 4
      }),
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      target: "map"
    });
  }
};
</script>

<style scoped>
div#map {
  width: 100%;
  height: 300px;
}
</style>
