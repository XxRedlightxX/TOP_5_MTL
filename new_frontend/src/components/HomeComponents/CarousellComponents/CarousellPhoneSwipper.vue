<template>
  <swiper
    v-if="props.events.length > 0"
    id="carousellPhoneSwiper"
    :autoplay="{ delay: 5000, disableOnInteraction: false }"
    class="mySwiper"
    :modules="modules"
    :pagination="{ clickable: true }"
    :space-between="0"
    @slide-change="onPhoneEventSwiped"
  >
    <swiper-slide v-for="(item, index) in props.events" :key="index">
      <img alt="event image" :src="item.image">
    </swiper-slide>
  </swiper>
</template>

<script setup>
  import { Autoplay, Pagination } from 'swiper/modules'
  import { Swiper, SwiperSlide } from 'swiper/vue'
  import { defineEmits, defineProps } from 'vue'
  import 'swiper/css'
  import 'swiper/css/pagination'

  const modules = [Pagination, Autoplay]

  const props = defineProps({
    events: {
      type: Array,
      default: () => [],
    },
  })

  const emit = defineEmits(['phoneEventSwiped'])

  // ✅ Correction : récupérer l'index actif depuis l'objet swiper
  const onPhoneEventSwiped = swiper => {
    const currentIndex = swiper.activeIndex
    emit('phoneEventSwiped', currentIndex)
  }
</script>

<style lang="scss">
  #carousellPhoneSwiper {
   // border: 2px solid blue;
    .swiper-slide {
        //border: 2px solid green;
        width: 40%;
        img {
            height: 100%;
        }
    }
  }
.light {
    #carousellPhoneSwiper {
        .swiper-pagination-bullet-active {
            background-color: var(--graphite)
        }
    }
}
.dark {
    #carousellPhoneSwiper {
        .swiper-pagination-bullet-active {
            background-color: var(--light);
        }
    }
}
</style>
