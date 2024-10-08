<template>
    <div id="allEventView">
        <h1> All Event View</h1>
        <ListcategorieEvent></ListcategorieEvent>
        <ListEvent></ListEvent>
    </div>
</template>

<script setup>
     import ListcategorieEvent from "../../components/EventComponents/EventFilterComponent.vue"
     import ListEvent from "../../components/EventComponents/EventListComponent.vue"
</script>

<style src="../../styles/MenusViewStyles/AllEventViewStyle.scss"></style>
