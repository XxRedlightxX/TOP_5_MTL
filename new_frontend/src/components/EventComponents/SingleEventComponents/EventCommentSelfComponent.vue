<template>
  <div id="eventCommentSelfComponent">
    <div class="content">
      <form action="#" method="post">
        <v-textarea :label="actualLang ? 'Type your Message' : 'Entrez votre message'"></v-textarea>
        <div class="reste">
          <Ratings  :Rate="true" />
          <waterButton :text="actualLang ? 'Send' : 'Envoyer'" :type="true" @click="sendComment" />

        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
  import { ref, reactive, defineProps } from "vue";
  import Setup from "@/JS/Setup";
  import Ratings from "../../StaticComponents/RatingComponent.vue";
  //import { useActivityStore } from "@/stores/activity";

  import waterButton from "../../StaticComponents/WaterButtonComponent.vue"

  //const {addCommentToEvent} = useActivityStore();

  // const formCommentUser = reactive({
  //     contenu : "",
  //     etoiles : null,
  // });

  const props = defineProps({
    activityId: Number,
  });
  // const sendComment = async () => {
  //     try {
  //         await addCommentToEvent(formCommentUser, props.activityId);

  //     } catch (error) {
  //         console.error('Failed to add comment:', error);
  //     }
  // };

  let actualLang = Setup.languageSetup();
</script>

<style src="../../../styles//ComponentsStyles/EventStyles/SingleEventStyle/EventCommentSelfStyle.scss"></style>