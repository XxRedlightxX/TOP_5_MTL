<template>
  <div v-if="hightRatedActivities != null" id="carousellComponent">
    <CarousellGrandEcrant :events="hightRatedActivities" />
    <CarousellPhone :events="hightRatedActivities" />
  </div>
  <div v-else id="carousellComponent">
    <CarousellGrandEcrant :events="fakeData" />
    <CarousellPhone :events="fakeData" />
    <LoadingComponent :size="200" />
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import SetupEvent from '@/JS/SetupEvents'
  import AsyncData from '@/JS/AsyncData'

  import CarousellGrandEcrant from './CarousellGrandEcrant.vue'
  import CarousellPhone from './CarousellPhone.vue'
  import LoadingComponent from '@/components/StaticComponents/LoadingComponent.vue'

  const hightRatedActivities = ref(null);
  let fakeData = AsyncData.getEvents(4)

  onMounted(async () => {
    hightRatedActivities.value = await SetupEvent.higherRateEventsSetup();
    //console.log('events : ', hightRatedActivities);
  });

</script>

<style lang="scss">
    #carousellComponent {
        position: relative;
    }
    @media screen and (min-width: 1025.1px) {
        #carousellComponent {
            #carouselGrand {
                display: block;
            }
            #carousellPhoneComponent {
                display: none;
            }
        }
    }
    @media screen and (max-width: 1025px) {
        #carousellComponent {
            #carouselGrand {
                display: none;
            }
            #carousellPhoneComponent {
                display: block;
            }
        }
    }
</style>
