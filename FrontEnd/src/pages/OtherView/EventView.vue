<template>
    <div id="eventView">
        <div class="viewContent" v-if="activity">
           <PageDetail :activityTitle="activity.titre"
            :activityDesc="activity.description" />
            
            <div class="suite">
                <div class="sub">
                    <PageDescription :host-name="activity.creator.name"
                     :place="activity.lieu" />
                    <CommentSelf :activity-id="activity.id"/>
                </div>
                <PageCommentaire :comments="activity?.avis"  />
                
               
            </div>
        </div>
        <div v-for="comment in activity?.avis" :key="comment.id">
  <strong>{{ comment.user.name }}</strong> — {{ comment.contenu }} ({{ comment.etoiles }}★)
</div>
        <PageMap></PageMap>
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


    const activity = ref(null);
     const route = useRoute();
   

    const {getActivityById} = useActivityStore();

     onMounted (async ()  =>
        activity.value = await getActivityById(route.params.id)
        
    );

   
    

</script>

<style src="../../styles/EventsStyles/SingleEventsStyles/EventView.scss"></style>