<template>
    <div id="eventCommentSelfComponent">
        <div class="content">
            <form action="#" method="post">
                <v-textarea :label="actualLang ? 'Type your Message' : 'Entrez votre message'"></v-textarea>
                <div class="reste">
                    <Ratings :rating="0" :Rate="true"/>
                    <waterButton :text="actualLang ? 'Send' : 'Envoyer'" :type="true"/>
                </div>
            </form>
        </div>
    </div>
</template>


<script setup>
    import storageManager from "@/JS/LocalStaorageManager"
    import { ref, onMounted, onUnmounted} from "vue";
    import Ratings from "../../RatingComponent.vue";
    import waterButton from "../../WaterButtonComponent.vue"

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