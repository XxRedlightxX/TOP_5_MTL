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
    import PageDetail from "../../components/EventComponents/SingleEventComponent.vue"
     import PageDescription from "../../components/EventComponents/EventOverview.vue"
     import PageCommentaire from "../../components/EventComponents/EventCommentComponent.vue"
      import PageMap from "../../components/EventComponents/EventMapComponent.vue"
</script>


<style src="../../styles/EventsStyles/EventView.scss"></style>