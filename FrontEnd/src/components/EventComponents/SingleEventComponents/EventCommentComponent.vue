<template>
  <div id="EventComment">

    
    <h1> {{actualLang ? 'Comments' : "Commentaires"}}</h1>
    <Loading  v-if="isLoading"/>
    <div class="comments-list" v-if="props.comments && props.comments.length && !isLoading">
      <div class="comments"  v-for="comment2 in  props.comments"
       :key=" comment2.id">
        <div class="glas">
          <div class="section">
            <img :src="getAvatarUrl(comment2.user?.image_data)" :alt="`Image of ${comment2.name}`">
            <div class="comment">
              <p>{{ comment2.user?.name  }}</p>
              <p>{{ formatDateComment(comment2.date) }}{{   comment2.user?.date}}</p>
            </div>
            
          </div>
          <div class="commen" >
            <p>{{ comment2.contenu }}</p>
            <Ratings :rating="comment2.etoiles" :Rate="false"/>
          </div>
        </div>
        
      </div>
       
    </div>
    
     <div v-else>{{actualLang ? 'No comments' : "Aucun commentaires"}}</div>

   

  </div>
</template>

<script setup >
import Ratings from "../../RatingComponent.vue";
import storageManager from "@/JS/LocalStaorageManager"
import { ref, onMounted , onBeforeUnmount, computed  } from 'vue';
import { getAvatarUrl } from "@/JS/GlobalFunctions";
import { useUserStore } from '@/stores/user';
import { formatDateComment } from "@/JS/GlobalFunctions";
import Loading from "@/components/LoadingComponent.vue";
import { useActivityStore } from "@/stores/activity";
import { isPlainObject } from "vuetify/lib/util/helpers.mjs";

const activitiesStore = useActivityStore()
const isLoading = computed(() => activitiesStore.isLoading);


const props = defineProps({
  comments: {
    type: Array,
    
  }
});

/*const avis = computed(() => {
  return props.activity.avis;
});

if (avis.value) {
  console.log(avis.value +"sss")
} else {
  console.log("Not Working")
}*/







const actualLang = ref(storageManager.getLang());
if (actualLang.value == null) {
  storageManager.setLang(true);
  actualLang.value = storageManager.getLang();
}

;


const handleLangChange = (event) => {
  actualLang.value = JSON.parse(event.detail.storage);
};

onMounted(() => {
  window.addEventListener('lang-changed', handleLangChange);
});

onBeforeUnmount(() => {
  window.removeEventListener('lang-changed', handleLangChange);
});
</script>





<style src="../../../styles/EventsStyles/SingleEventsStyles/EventComments.scss"> </style>