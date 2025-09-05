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
  import { computed, ref } from 'vue'

  const address = ref('la ronde, Montreal');//ref("333 Rue de la Commune O, Montréal, QC H2Y 2E2")

  // URL construite avec l’adresse
  const mapUrl = computed(() => {
    return `https://maps.google.com/maps?q=${encodeURIComponent(address.value)}&z=15&output=embed`
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
