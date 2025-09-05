<template>
  <div id="homeView">
    <CarousellComponent />
    <div class="homeContent">
      <IntroText />
      <NewEvent />
      <Contact />
    </div>
  </div>
</template>

<script setup>
  //import { onBeforeRouteEnter } from 'vue-router';
  import CarousellComponent from '@/components/HomeComponents/CarousellComponents/CarousellComponent.vue';
  import Contact from '@/components/HomeComponents/ContactComponent.vue';
  import IntroText from '@/components/HomeComponents/IntroTextComponent.vue';
  import NewEvent from '@/components/HomeComponents/NewEventComponent.vue';

  // onBeforeRouteEnter((to, from, next) => {
  //   if (!sessionStorage.getItem("reloaded")) {
  //     sessionStorage.setItem("reloaded", "true");
  //     window.location.reload();
  //   } else {
  //     next();
  //   }
  // });
</script>

<style lang="scss">
  #homeView{
    margin-top: -64px;
    .homeContent {
      width: 100%;
      #introTextComponent {
        padding: 0px;
        padding-bottom: -50%;
      }
    }
  }
  .light{
    background: linear-gradient(to bottom, #efefef 70%, #ccc 85%);
    .homeContent {
      background: linear-gradient(to bottom, #efefef, #ccc);
    }
  }

  .dark {
    background: linear-gradient(to bottom, #cbcbcb 50%, rgb(29, 30, 24) 85%);
    .homeContent {
      background: linear-gradient(to bottom, #ccc, rgb(29, 30, 24));
    }
  }
</style>