<template>
  <div id="carousellComponent">
    <CarousellGrandEcrant />
    <CarousellPhone />
  </div>
</template>

<script setup>
  //import defaultImage from 'https://picsum.photos/1895/795'
  import { onMounted, ref } from 'vue'
  import LocalStorageManager from '@/JS/LocalStorageManager'
  import { useActivityStore } from '@/stores/activity'
  import CarousellGrandEcrant from './CarousellGrandEcrant.vue'
  import CarousellPhone from './CarousellPhone.vue'

  // get event BD
  const activitiesStore = useActivityStore()
  let hightRatedActivities = ref([])
  const tempHightRatedActivities = ref([])
  const descriptionText = 'Description not found'

  onMounted(async () => {
    tempHightRatedActivities.value = await activitiesStore.getHigherRateEvent();

    console.log('data : ' + tempHightRatedActivities.activities)
    if (tempHightRatedActivities.value != null) {
      hightRatedActivities.value = tempHightRatedActivities.value.activities.map(activity => ({
        id: activity.id,
        image: activity.image_data || defaultImage,
        title: activity.titre,
        desc: activity.description || descriptionText,
        rating: activity.nombre_likes || 2,
        lieu: activity.lieu,
        date: activity.date,
      }))
    }
    console.log('events : ' + hightRatedActivities.value)
  })

  // set event mememoire
  LocalStorageManager.setHightEvents(hightRatedActivities.value);
  console.log('events : ' + hightRatedActivities)
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
