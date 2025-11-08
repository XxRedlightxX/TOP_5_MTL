<template>
  <div id="EventOverview">
    <h1 class="h1"> Informations</h1>

    <div class="info">
      <div class="lol">
        <p>{{ actualLang ? 'Hosted by ': 'Mise en Ligne par ' }}Didier </p>
      </div>

      <div class="ratings">
        <Ratings :Rate="false" :rating="props.event.rating" />
      </div>
      <h3><strong>{{ actualLang ? 'Location : ': 'Emplacement : ' }}</strong> {{ props.event.lieu }}</h3>
      <h3><strong>{{ actualLang ? 'Open from : ': 'Ouvert de : ' }}</strong>{{ heureDebut + " - " + heureFin }}</h3>
    </div>
  </div>

</template>

<script setup>
  import { defineProps } from 'vue';
  import Ratings from "../../StaticComponents/RatingComponent.vue"
  import Setup from '@/JS/Setup';

  const props = defineProps ({
    event: Object,

  });
  let dateDebut = new Date(props.event.date_debut);
  let heuresDebut = dateDebut.getHours().toString().padStart(2, '0');
  let minutesDebut = dateDebut.getMinutes().toString().padStart(2, '0');
  let heureDebut = `${heuresDebut}:${minutesDebut}`;

  let dateFin = new Date(props.event.date_fin);
  let heuresFin = dateDebut.getHours().toString().padStart(2, '0');
  let minutesFin = dateDebut.getMinutes().toString().padStart(2, '0');
  let heureFin = `${heuresFin}:${minutesFin}`;


  let actualLang = Setup.languageSetup();
</script>

<style src="../../../styles/ComponentsStyles/EventStyles/SingleEventStyle/EventOverviewStyle.scss"> </style>