<template>
    <div id="singleNewEventComponent">
        <img :src="props.event.image" alt="#">
        <p>{{ props.event.title }}</p>
    </div>
</template>

<script setup>
    import { defineProps} from 'vue';

    // Define props
    const props = defineProps({
        event: Object
    });
</script>

<style src="../../../styles/HomesStyles/NewEventComponentStyle/SingleNewEventComponentStyle.scss"></style>