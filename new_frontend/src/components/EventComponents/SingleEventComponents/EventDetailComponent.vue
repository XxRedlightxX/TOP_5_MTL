<template>
  <div id="eventDetail">
    <div class="place-overview">
      <header class="header">
        <h1 class="header__title">{{props.activityTitle}}</h1>
      </header>

      <section class="overview">
        <div class="overview__image">
          <img alt="Mont Saint-Michel" :src="props.activityImg" />
        </div>
        <div class="overview__details">
          <h3 class="overview__description">{{props.activityDesc}}</h3>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, ref, defineProps } from 'vue';

  const props = defineProps({
    activityTitle: String,
    activityDesc: String,
    activityImg: String
  });
</script>

<style src="../../../styles/ComponentsStyles/EventStyles/SingleEventStyle/EventDetailStyle.scss"></style>
<style src="../../../styles/ComponentsStyles/EventStyles/SingleEventStyle/EventDetailStyleColor.scss"></style>