<template>
    <div id="newEventComponent">
        <div class="card-item swiper-slide" v-for="(item, index) in newEvent" :key="index">
            <SingleNewEvent :newEvent="item"/>
        </div>

    </div>
</template>

<script setup>
    import SingleNewEvent from "./SingleNewEventComponent.vue"
    const text = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel nemo laborum ipsum aspernatur mollitia minima quo voluptates repudiandae eum, possimus neque, sapiente nesciunt dolor pariatur veritatis reprehenderit omnis, voluptatum eaque."

    const newEvent = [
        {image : "/src/assets/HomeCarousel/Mont-royal.jpg", title: "Mont-Royal", desc: text},
        {image : "/src/assets/HomeCarousel/Vieux-port.jpg", title: "Vieux-Port", desc: text},
        {image : "/src/assets/HomeCarousel/LaRonde.jpg", title: "Laronde", desc: text},
        {image : "/src/assets/HomeCarousel/Jardin-botanique.jpg", title: "Jardin Botanique", desc: text},
    ]

</script>

<style src="../../../styles/HomesStyles/NewEventComponentStyle/NewEventComponentStyle.scss"></style>