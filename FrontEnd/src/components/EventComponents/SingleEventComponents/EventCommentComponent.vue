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

const formatDate = (dateString, actualLang) => {
  const safeString = dateString.replace(" ", "T");
  const date = new Date(safeString);
  const now = new Date();

  const diffMs = now - date;
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHours = Math.round(diffMin / 60);
  const diffDays = Math.round(diffHours / 24);

  if (diffDays >= 1) {
    return actualLang 
      ? `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
      : `il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
  } else if (diffHours >= 1) {
    return actualLang
      ? `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
      : `il y a ${diffHours} heure${diffHours > 1 ? 's' : ''}`;
  } else if (diffMin >= 1) {
    return actualLang
      ? `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`
      : `il y a ${diffMin} minute${diffMin > 1 ? 's' : ''}`;
  } else {
    return actualLang ? 'just now' : 'à l’instant';
  }
};





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