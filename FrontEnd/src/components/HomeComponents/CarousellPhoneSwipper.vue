<template>
    <swiper
        :spaceBetween="0"
        :pagination="{
        clickable: true,
        }"
        :modules="modules"
        :autoplay="{ delay: 5000, disableOnInteraction: false }"
        class="mySwiper"
        id="carousellPhoneSwiper"
    >
        <swiper-slide>
            <img :src="imgUrl1" alt="#">
        </swiper-slide>
        <swiper-slide>
            <img :src="imgUrl2" alt="#">
        </swiper-slide>
        <swiper-slide>
            <img :src="imgUrl3" alt="#">
        </swiper-slide>
        <swiper-slide>
            <img :src="imgUrl4" alt="#">
        </swiper-slide>
    </swiper>
</template>

<script setup>
    // Import Swiper Vue.js components
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import 'swiper/css'; // Import Swiper styles
    import 'swiper/css/pagination';
    import { Pagination, Autoplay } from 'swiper/modules'; // Import required modules

    const imgUrl1 = "https://picsum.photos/1894/800";
    const imgUrl2 = "https://picsum.photos/1894/796";
    const imgUrl3 = "https://picsum.photos/1894/805";
    const imgUrl4 = "https://picsum.photos/1894/790";
    const modules = [Pagination, Autoplay];
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