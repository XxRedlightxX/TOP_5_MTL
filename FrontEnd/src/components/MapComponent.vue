<template>
      <p v-if="coords">📍 Coordinates: {{ coords.lat }}, {{ coords.lng }}</p>
    <p v-if="address">🏠 Address: {{ address }}</p>
  <div id="map" ref="mapContainer" style="height: 300px; width: 100%; border-radius: 8px;"></div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";

const mapContainer = ref(null);
const map = ref(null);
const coords = ref(null);
const emit = defineEmits(['event-coords']);

onMounted(async () => {
  

  map.value = L.map(mapContainer.value).setView([45.5019, -73.5674], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map.value);

  const provider = new OpenStreetMapProvider();
  const searchControl = new GeoSearchControl({
    provider,
    style: "bar",
    autoComplete: true,
    autoClose: true,
    keepResult: true,
    updateMap: true,
  });
  map.value.addControl(searchControl);

  map.value.on("geosearch/showlocation", (result) => {
    coords.value = {
      lat: result.location.y,
      lng: result.location.x,
    };
    console.log("Selected:", coords.value);
    emit("event-coords",coords.value);

  });

  L.marker([45.5019, -73.5674]).addTo(map.value).bindPopup("Hello Montréal!");
});

// 🧩 Important: fix rendering when modal opens
const handleResize = () => {
  if (map.value) map.value.invalidateSize();
};


// Rafraichie la map lorsque que le containr de la map est visible
const observeVisibility = () => {
  if (!mapContainer.value) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && map.value) {
        setTimeout(() => {
          map.value.invalidateSize(true);
        }, 100);
      }
    });
  });

  observer.observe(mapContainer.value);
};


onMounted(() => {
  observeVisibility();
});


</script>
