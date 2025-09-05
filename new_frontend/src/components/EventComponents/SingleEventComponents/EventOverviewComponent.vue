<template>
  <div id="EventOverview">
    <h1 class="h1"> Informations</h1>

    <div class="info">
      <div class="lol">
        <p>{{ actualLang ? 'Hosted by ': 'Mise en Ligne par ' }}{{props.hostName}} </p>
      </div>

      <div class="ratings">
        <Ratings :Rate="false" :rating="props.Rating" />
      </div>
      <h3><strong>{{ actualLang ? 'Location : ': 'Emplacement : ' }}</strong> {{ props.place }}</h3>
      <h3><strong>{{ actualLang ? 'Open from : ': 'Ouvert de : ' }}</strong> 9h - 19h, {{ actualLang ? 'everydays': 'tous les jours' }}</h3>
    </div>
  </div>

</template>

<script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import Ratings from "../../StaticComponents/RatingComponent.vue"
  import Setup from '@/JS/Setup';

  const props = defineProps ({
    hostName: String,
    place: String,
    Rating: Number,

  });
  let actualLang = Setup.languageSetup();
</script>

<style src="../../../styles/ComponentsStyles/EventStyles/SingleEventStyle/EventOverviewStyle.scss"> </style>