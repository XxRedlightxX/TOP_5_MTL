<template>
  <div v-if="hightRatedActivities != null" id="carousellComponent">
    <CarousellGrandEcrant :events="hightRatedActivities" />
    <CarousellPhone :events="hightRatedActivities" />
  </div>
</template>

<script setup>
  //import defaultImage from 'https://picsum.photos/1895/795'
  import { onMounted, ref } from 'vue'
  import SetupEvent from '@/JS/SetupEvents'

  import CarousellGrandEcrant from './CarousellGrandEcrant.vue'
  import CarousellPhone from './CarousellPhone.vue'

  const hightRatedActivities = ref(null);

  onMounted(async () => {
    hightRatedActivities.value = await SetupEvent.higherRateEventsSetup();
    console.log('events : ', hightRatedActivities.value);
  });

</script>

<style lang="scss">
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
