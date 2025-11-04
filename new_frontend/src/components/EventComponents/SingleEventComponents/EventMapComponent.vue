<template>
  <div id="EventMap">
    <iframe
      allowfullscreen=""
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      :src="mapUrl">
    </iframe>
  </div>
</template>

<script setup>
  import { computed, ref, defineProps  } from 'vue'

  const address = ref('la ronde, Montreal');//ref("333 Rue de la Commune O, Montréal, QC H2Y 2E2")

  const props = defineProps ({
    map: Object,
  });
  // URL construite avec l’adresse
  const mapUrl = computed(() => {
    return `https://maps.google.com/maps?q=${encodeURIComponent(props.map)}&z=15&output=embed`
  })
</script>

<style lang="scss">
    #EventMap {
        iframe {
            width: 100%;
            height: 400px;
        }
    }
</style>
