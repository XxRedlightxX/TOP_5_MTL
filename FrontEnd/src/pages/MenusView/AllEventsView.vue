<template>
    <div id="allEventView">
        <h1> All Event View</h1>
        <ListcategorieEvent></ListcategorieEvent>
        <ListEvent></ListEvent>
        <AlListEvent></AlListEvent>
    </div>
</template>

<script setup>
     import ListcategorieEvent from "../../components/EventComponents/ListOfEventsComponents/EventFilterComponent.vue"
     import ListEvent from "../../components/EventComponents/ListOfEventsComponents/EventListComponent.vue"
     import AlListEvent from "../../components/EventComponents/ListOfEventsComponents/AllEventsComponent.vue"
</script>

<style src="../../styles/MenusViewStyles/AllEventViewStyle.scss"></style>
