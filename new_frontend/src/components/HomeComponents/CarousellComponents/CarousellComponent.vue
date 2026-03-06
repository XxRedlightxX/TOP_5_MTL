<template>
  <div v-if="hightRatedActivities.length > 0" id="carousellComponent">
    <CarousellGrandEcrant :events="hightRatedActivities"/>
    <CarousellPhone :events="hightRatedActivities" />
  </div>
  <div v-else id="carousellComponent">
    <CarousellGrandEcrant :events="fakeData" :fake="false" />
    <CarousellPhone :events="fakeData" :fake="false"/>
    <LoadingComponent :size="200" />
  </div>
</template>

<script setup>
  import { onMounted, watch, ref } from 'vue'
  import SetupEvent from '@/JS/SetupEvents'
  import AsyncData from '@/JS/AsyncData'
  import LocalStorageManager from '@/JS/LocalStorageManager'

  import CarousellGrandEcrant from './CarousellGrandEcrant.vue'
  import CarousellPhone from './CarousellPhone.vue'
  import LoadingComponent from '@/components/StaticComponents/LoadingComponent.vue'

  let hightRatedActivities = ref([]);
  let fakeData = AsyncData.getEvents(4)

  const handleModeChange = (event) => {
    let mode = LocalStorageManager.getMode();
    console.log('mode changed to ' + mode)
    SetupEvent.actualEventModeManagerGeneric(LocalStorageManager.getHightRateEvents, hightRatedActivities)
  };

  onMounted(async () => {
    const reactiveList = await SetupEvent.higherRateEventsSetup();
    hightRatedActivities.value = reactiveList.value;
    window.addEventListener('mode-changed', handleModeChange);
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
