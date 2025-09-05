<template>
  <div id="carousellComponent">
    <CarousellGrandEcrant />
    <CarousellPhone />
  </div>
</template>

<script setup>
  import CarousellGrandEcrant from './CarousellGrandEcrant.vue';
  import CarousellPhone from './CarousellPhone.vue';
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