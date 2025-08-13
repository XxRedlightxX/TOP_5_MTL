<template>
  <div id="EventComment">

    
    <h1> {{actualLang ? 'Comments' : "Commentaires"}}</h1>

    <div class="comments-list">
      <div class="comments" v-for="comment2 in  props.comments" :key=" comment2.id">
        <div class="glas">
          <div class="section">
            <img :src="user?.avatar" :alt="`Image of ${comment2.name}`">
            <div class="comment">
              <p>{{ comment2.user?.name  }}</p>
              <p>{{ formatDate(comment2.date) }}</p>
            </div>
          </div>
          <div class="commen" >
            <p>{{ comment2.contenu }}</p>
            <Ratings :rating="comment2.etoiles" :Rate="false"/>
          </div>
        </div>
      </div>
    </div>

   

  </div>
</template>

<script setup >
import Ratings from "../../RatingComponent.vue";
import storageManager from "@/JS/LocalStaorageManager"
import { ref, onMounted , onBeforeUnmount, computed  } from 'vue';


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

const persons = ref([
  { id: 1, name: 'Alice', image: "/src/assets/HomeCarousel/profil.jpeg" },
  { id: 2, name: 'Bob', image: "/src/assets/bob.jpg" },
  { id: 3, name: 'Michelle', image: "/src/assets/HomeCarousel/profil.jpeg" },
  { id: 4, name: 'Nick', image: "/src/assets/bob.jpg" }
]);

const comments = ref([
  { id: 1, personId: 1, text: 'Très bel endroit pour se retrouver dans les journées chaudes de l\'été.', rating: 3 },
  { id: 2, personId: 2, text: 'It was cool to look at and had interesting attractions. Would recommend and is worth the visit. It was very pretty and well kept, something for everyone. But, DO. NOT. GO. ON. THE. FERRIS. WHEEL.', rating: 4 },
  { id: 3, personId: 3, text: 'Très bel endroit pour se retrouver dans les journées chaudes de l\'été.', rating: 1 },
  { id: 4, personId: 4, text: 'Très bel endroit pour se retrouver dans les journées chaudes de l\'été.', rating: 5 }
]);

const getCommentsForPerson = (personId) => {
  return comments.value.filter(comment => comment.personId === personId);
};

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