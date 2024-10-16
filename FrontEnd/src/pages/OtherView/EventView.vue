<template>
    <div id="eventView">

        <PageDetail></PageDetail>
        <div class="sub">    
            <PageDescription></PageDescription>
            <PageCommentaire></PageCommentaire>
        </div>
        <PageMap></PageMap>
    </div>
</template>

<script setup>
    import PageDetail from "../../components/EventComponents/SingleEventComponents/SingleEventComponent.vue"
     import PageDescription from "../../components/EventComponents/SingleEventComponents/EventOverview.vue"
     import PageCommentaire from "../../components/EventComponents/SingleEventComponents/EventCommentComponent.vue"
      import PageMap from "../../components/EventComponents/SingleEventComponents/EventMapComponent.vue"
</script>


<style src="../../styles/EventsStyles/SingleEventsStyles/EventView.scss"></style>