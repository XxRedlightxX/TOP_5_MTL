<template>
  <div id="EventMap">
    <iframe
      :src="mapSrc"
      style="border:0; width:100%; height:350px; border-radius:8px;"
      allowfullscreen=""
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade">
    </iframe>
   
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { defineProps } from 'vue';

const props = defineProps({
  lat: {
    type: String,
    required: true,
  },
  lng: {
    type: String,
    required: true,
  },
  zoom: {
    type: Number,
    default: 15,
  },
});

// Example URL: https://www.google.com/maps?q=45.51246,-73.55106&z=15&output=embed
const mapSrc = computed(() => {
  return `https://www.google.com/maps?q=${props.lat},${props.lng}&z=${props.zoom}&output=embed`;
});
</script>

<style src="../../../styles/EventsStyles/SingleEventsStyles/EventMapComponent.scss"></style>
