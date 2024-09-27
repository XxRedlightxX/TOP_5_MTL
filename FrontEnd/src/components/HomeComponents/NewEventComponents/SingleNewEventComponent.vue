<template>
    <div id="singleNewEventComponent">
        <img :src="props.newEvent.image" alt="User Image" class="user-image">
        <h2 class="user-name">{{ props.newEvent.title }}</h2>
    </div>
</template>

<script setup>
    import { defineProps} from 'vue';

    // Define props
    const props = defineProps({
        newEvent: Object
    });
    //const props = defineProps('newEvent');
    console.log(props.newEvent)
</script>

<style src="../../../styles/HomesStyles/NewEventComponentStyle/SingleNewEventComponentStyle.scss"></style>