<template>
  <div id="EventComment">
    <h1> {{actualLang ? 'Comments' : "Commentaires"}}</h1>

    <div class="comments-list">
      <div class="comments" v-for="(personne, index) in persons" :key="personne.id">
        <div class="glas">
          <div class="section">
            <img :src="personne.image" :alt="`Image of ${personne.name}`">
            <div class="comment">
              <p>{{ personne.name }}</p>
              <p>{{actualLang ? '20 days ago' : "Il y'a 20 jours"}}</p>
            </div>
          </div>
          <div class="commen" v-for="comment in getCommentsForPerson(personne.id)" :key="comment.id">
            <p>{{ comment.text }}</p>
            <Ratings :rating="comment.rating" :Rate="false"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Ratings from "../../RatingComponent.vue";
import storageManager from "@/JS/LocalStaorageManager"
import { ref } from 'vue';

export default {
  
  data() {
    let actualLang = ref(storageManager.getLang());

    if (actualLang.value == null) {
      storageManager.setLang(true);
      actualLang.value = storageManager.getLang();
    }
    return {
      actualLang,
      persons: [
        { id: 1, name: 'Alice', image: "https://picsum.photos/id/64/200/300" },
        { id: 2, name: 'Bob', image: "https://picsum.photos/id/375/200/300" },
        { id: 3, name: 'Michelle', image: "https://picsum.photos/id/65/200/300" },
        { id: 4, name: 'Nick', image: "https://picsum.photos/id/237/200/300" },
      ],
      comments: [
        { id: 1, personId: 1, text: 'Très bel endroit pour se retrouver dans les journées chaudes de l’été.', rating: 3 },
        { id: 2, personId: 2, text: 'It was cool to look at and had interesting attractions. Would recommend and is worth the visit. It was very pretty and well kept, something for everyone. But, DO. NOT. GO. ON. THE. FERRIS. WHEEL.', rating: 4 },
        { id: 3, personId: 3, text: 'Très bel endroit pour se retrouver dans les journées chaudes de l’été.', rating: 1 },
        { id: 4, personId: 4, text: 'Très bel endroit pour se retrouver dans les journées chaudes de l’été.', rating: 5 },
      ]
    };
  },    
  components: {
    Ratings,
  },
  methods: {
    getCommentsForPerson(personId) {
      return this.comments.filter(comment => comment.personId === personId);
    },
    handleLangChange(event) {
      this.actualLang= JSON.parse(event.detail.storage); // Assigne la nouvelle valeur du mode
    }
  },
  mounted() {
    window.addEventListener('lang-changed', this.handleLangChange);
  },
  beforeUnmount() {
    window.removeEventListener('lang-changed', this.handleLangChange);
  },
};
</script>





<style src="../../../styles/EventsStyles/SingleEventsStyles/EventComments.scss"> </style>