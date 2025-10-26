<template>
    <div id="eventView">
        
        <div class="viewContent" v-if="activity">
           <PageDetail :activityTitle="activity.titre"
            :activityDesc="activity.description" :activity-image="activity.image_data"  />
            
            <div class="suite">
                <div class="sub">
                    <PageDescription :host-name="activity.creator.name"
                    :place="activity.lieu" :-rating=activity.nombre_likes 
                    :start-date="activity.date_debut"
                    :end-date="activity.date_fin"/>
                    <CommentSelf :activity-id="activity.id"
                    @comment-added="handleCommentAdded"/>
                </div>
                <PageCommentaire :comments="activity?.avis"  />
                
        
            </div>
        </div>
     
        <PageMap :lat="activity?.latitude" :lng="activity?.longitude"></PageMap>
       
    </div> 
</template>

<script setup>
    import { onMounted, ref, defineProps } from 'vue';
    import PageDetail from "../../components/EventComponents/SingleEventComponents/SingleEventComponent.vue"
    import PageDescription from "../../components/EventComponents/SingleEventComponents/EventOverview.vue"
    import PageCommentaire from "../../components/EventComponents/SingleEventComponents/EventCommentComponent.vue"
    import PageMap from "../../components/EventComponents/SingleEventComponents/EventMapComponent.vue"
    import CommentSelf from "../../components/EventComponents/SingleEventComponents/EventCommentSelfComponent.vue"
    import { useActivityStore } from '@/stores/activity';
    import { useRoute } from 'vue-router';
    import MapComponent from '@/components/MapComponent.vue';


    const activity = ref(null);
    const route = useRoute();
    const { getActivityById } = useActivityStore();
     
    onMounted(async () => {
        await fetchActivity();
    });

    const fetchActivity = async () => {
        activity.value = await getActivityById(route.params.id);
    };

    const handleCommentAdded = async (result) => {
        if (result) {
            await fetchActivity();
        }
    };
   
    

</script>

<style src="../../styles/EventsStyles/SingleEventsStyles/EventView.scss"></style>

