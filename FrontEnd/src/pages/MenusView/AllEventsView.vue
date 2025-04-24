<template>
    <div id="allEventView">
        <ListcategorieEvent></ListcategorieEvent>
        <div>
            <h3>Up coming events</h3>
            <UpComingEvent/>
        </div>
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
