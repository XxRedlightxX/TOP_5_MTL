<template>
    <div id="eventCommentSelfComponent">
        <div class="content">
            <form action="#" method="post" >
                <v-textarea :label="actualLang ? 'Type your Message' : 'Entrez votre message'"
                v-model = "formCommentUser.contenu"></v-textarea>
                <div class="reste">
                    <Ratings  :Rate="true" 
                    :rating="formCommentUser.etoiles"
                    v-model = "formCommentUser.etoiles"
                   
                    />
                    <waterButton :text="actualLang ? 'Send' : 'Envoyer'" :type="true" @click="sendComment" />
                    
                </div>
            </form>
        </div>
    </div>
</template>


<script setup>
    import storageManager from "@/JS/LocalStaorageManager"
    import { ref, onMounted, onUnmounted, reactive,defineProps } from "vue";
    import Ratings from "../../RatingComponent.vue";
    import waterButton from "../../WaterButtonComponent.vue"
    import { useActivityStore } from "@/stores/activity";

    const {addCommentToEvent} = useActivityStore();


    const formCommentUser = reactive({
        contenu : "",
        etoiles : null,
    });

    

    
    const props = defineProps({
        activityId: Number,
    });
    const sendComment = async () => {
        try {
            await addCommentToEvent(formCommentUser, props.activityId);
           
        } catch (error) {
            console.error('Failed to add comment:', error);
        }
    };

    

    let actualLang = ref(storageManager.getLang());

    if (actualLang.value === null) {
        storageManager.setLang(true);
        actualLang.value = storageManager.getLang();
    }

    // Function to handle mode change event
    const handleLangChange = (event) => {
        actualLang.value = JSON.parse(event.detail.storage);
    };
    // Add event listener for mode changes
    onMounted(() => {
        window.addEventListener('lang-changed', handleLangChange);
    });

    // Remove event listener when component is unmounted
    onUnmounted(() => {
        window.removeEventListener('lang-changed', handleLangChange);
    });
    
</script>

<style src="../../../styles/EventsStyles/SingleEventsStyles/EventCommentSelfStyle.scss"></style>