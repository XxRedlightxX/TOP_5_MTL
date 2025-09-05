<template>
  <div id="profileOtherComponent">
    <Logo :size="2" />
  </div>
</template>

<script setup>
  import Logo from "../LogoComponent/LogoComponent.vue"

</script>

<style lang="scss">
    #profileOtherComponent {
        width: 100%;
        height: 100%;
        padding: 9% 0%;
        position: relative;

        .medium {
            top: 0;
            left: 27%;
        }
    }
    @media screen and (min-width: 1025.1px) {
        #profileOtherComponent {
            display: block;
        }
    }
    @media screen and (max-width: 1025px) {
        #profileOtherComponent {
            display: none;
        }
    }
    .light {
        #profileOtherComponent {

            // h1 {
            //     color: var(--graphite08);
            // }
        }
    }

    .dark {
        #profileOtherComponent {

            // h1 {
            //     color: var(--light-trans-text);
            // }
        }
    }
</style>