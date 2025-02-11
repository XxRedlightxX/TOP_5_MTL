<template>
    <div id="allEventView">
        <ListcategorieEvent></ListcategorieEvent>
        <!-- <ListEvent></ListEvent> -->
        <UpComingEvent/>
        <AlListEvent></AlListEvent>
    </div>
</template>

<script setup>
     import ListcategorieEvent from "../../components/EventComponents/ListOfEventsComponents/EventFilterComponent.vue"
     import ListEvent from "../../components/EventComponents/ListOfEventsComponents/EventListComponent.vue"
     import UpComingEvent from '../../components/EventComponents/ListOfEventsComponents/UpComingEventComponent.vue'
     import AlListEvent from "../../components/EventComponents/ListOfEventsComponents/AllEventsComponent.vue"
</script>

<style src="../../styles/MenusViewStyles/AllEventViewStyle.scss"></style>
