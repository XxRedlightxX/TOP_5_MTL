<template>
    <div id="homeView">
        <Carousel/>
        <div class="homeContent">
            <IntroText/>
            <NewEvent/><!---->
            <Contact/>
        </div>
    </div>
</template>

<script setup>
    import Carousel from "../../components/HomeComponents/CarouselComponent.vue"
    import IntroText from "../../components/HomeComponents/IntroTextComponent.vue"
    import NewEvent from "../../components/HomeComponents/NewEventComponent.vue"
    //import NewEventTest from "../../components/HomeComponents/NewEventComponents/testSlider.vue"
    import Contact from "../../components/HomeComponents/ContactComponent.vue"
</script>

<style src="../../styles/MenusViewStyles/HomeViewStyle.scss"></style>