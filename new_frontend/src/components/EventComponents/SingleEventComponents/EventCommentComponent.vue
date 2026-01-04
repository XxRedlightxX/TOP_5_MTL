<template>
  <div v-if="props.event.avis.length > 0" id="EventComment">
    <h1> {{actualLang ? 'Comments' : "Commentaires"}}</h1>

    <div class="comments-list">
      <div :key="comment.id" class="comments" v-for="(comment, index) in props.event.avis">
        <div class="glas">
          <div class="section">
            <img :alt="`Image of ${comment.user.name}`" :src="comment.user.image_data">
            <div class="comment">
              <p>{{ comment.user.name  }}</p>
              <!-- <p>{{ formatDate(comment2.date) }}</p> -->
              <p>12h 00 a 16h 30</p>
            </div>
          </div>
          <div class="commen">
            <p>{{ comment.contenu }}</p>
            <Ratings :rating="comment.etoiles" :Rate="false"/>
          </div>
        </div>
      </div>
    </div>

  </div>
  <div v-else id="EventComment">
    <div class="noComment">
      <h1>{{actualLang ? 'No comments for now' : "Auncun commentaires pour l'instant"}}</h1>
    </div>
  </div>
</template>

<script setup>
  import Ratings from "../../StaticComponents/RatingComponent.vue"
  import { ref, defineProps  } from 'vue'
  import Setup from "@/JS/Setup"

  const props = defineProps({
    event: Object,
  })

  /*const avis = computed(() => {
  return props.activity.avis;
});

if (avis.value) {
  console.log(avis.value +"sss")
} else {
  console.log("Not Working")
}*/

  // const formatDate = (dateString, actualLang) => {
  //   const safeString = dateString.replace(" ", "T")
  //   const date = new Date(safeString)
  //   const now = new Date()

  //   const diffMs = now - date
  //   const diffSec = Math.round(diffMs / 1000)
  //   const diffMin = Math.round(diffSec / 60)
  //   const diffHours = Math.round(diffMin / 60)
  //   const diffDays = Math.round(diffHours / 24)

  //   if (diffDays >= 1) {
  //     return actualLang 
  //       ? `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
  //       : `il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`
  //   } else if (diffHours >= 1) {
  //     return actualLang
  //       ? `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
  //       : `il y a ${diffHours} heure${diffHours > 1 ? 's' : ''}`
  //   } else if (diffMin >= 1) {
  //     return actualLang
  //       ? `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`
  //       : `il y a ${diffMin} minute${diffMin > 1 ? 's' : ''}`
  //   } else {
  //     return actualLang ? 'just now' : 'à l’instant'
  //   }
  // }

  // const persons = ref([
  //   { id: 1, name: 'Alice', image: "https://picsum.photos/289/425" },
  //   { id: 2, name: 'Bob', image: "https://picsum.photos/286/428" },
  //   { id: 3, name: 'Michelle', image: "https://picsum.photos/287/428" },
  //   { id: 4, name: 'Nick', image: "https://picsum.photos/288/428" },
  // ])

  // const comments = ref([
  //   { id: 1, personId: 1, text: 'Très bel endroit pour se retrouver dans les journées chaudes de l\'été.', rating: 3 },
  //   { id: 2, personId: 2, text: 'It was cool to look at and had interesting attractions. Would recommend and is worth the visit. It was very pretty and well kept, something for everyone. But, DO. NOT. GO. ON. THE. FERRIS. WHEEL.', rating: 4 },
  //   { id: 3, personId: 3, text: 'Très bel endroit pour se retrouver dans les journées chaudes de l\'été.', rating: 1 },
  //   { id: 4, personId: 4, text: 'Très bel endroit pour se retrouver dans les journées chaudes de l\'été.', rating: 5 },
  // ]);

  // const getCommentsForPerson = (personId) => {
  //   return comments.value.filter(comment => comment.personId === personId)
  // };

  const actualLang = Setup.languageSetup();
</script>

<style src="../../../styles/ComponentsStyles/EventStyles/SingleEventStyle/EventCommentStyle.scss"> </style>
<style src="../../../styles/ComponentsStyles/EventStyles/SingleEventStyle/EventCommentStyleColor.scss"> </style>