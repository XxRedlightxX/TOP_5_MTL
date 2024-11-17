<template>
    <div id="eventView">
        <div class="viewContent">
            <PageDetail></PageDetail>
            
            <div class="suite">
                <div class="sub">
                    <PageDescription/>
                    <CommentSelf/>
                </div>
                <PageCommentaire/>
            </div>
        </div>
        <PageMap></PageMap>
    </div>
</template>

<script setup>
    import PageDetail from "../../components/EventComponents/SingleEventComponents/SingleEventComponent.vue"
     import PageDescription from "../../components/EventComponents/SingleEventComponents/EventOverview.vue"
     import PageCommentaire from "../../components/EventComponents/SingleEventComponents/EventCommentComponent.vue"
      import PageMap from "../../components/EventComponents/SingleEventComponents/EventMapComponent.vue"
    import CommentSelf from "../../components/EventComponents/SingleEventComponents/EventCommentSelfComponent.vue"
</script>


<style src="../../styles/EventsStyles/SingleEventsStyles/EventView.scss"></style>