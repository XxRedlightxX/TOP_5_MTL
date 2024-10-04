<template>
  <div id="EventComment">
    <h1>Comments</h1>

    <div class="comments-list">

      <div class="comments" v-for="(personne, index) in persons" :key="index">

          <div class="section">
              <img :src="personne.imag">
              <div   class="comment">
                  <p>{{ personne.name }} </p>
                  <p>20 days ago</p>
              </div>
          </div>
        
          <div class="commen"  v-for="comment in getCommentsForPerson(personne.id)" :key="comment.id">
            <p> {{ comment.text }}</p>
            <v-rating
              readonly
              hover
              :length="5"
              :size="20"
              :model-value="comment.rating"
              active-color="primary"
            />
          </div> 
      </div>
    </div>

    <div class="myComment">
      <h1>Commenter soi-meme</h1>
    </div>
  </div>
</template>

<script >

export default {
  data() {
    return {
      persons: [
        { id: 1, name: 'Alice', imag : "/src/assets/HomeCarousel/profil.jpeg" },
        { id: 2, name: 'Bob', imag : "/src/assets/bob.jpg" },
        { id: 3, name: 'Michelle', imag : "/src/assets/HomeCarousel/profil.jpeg" },
        { id: 4, name: 'Nick', imag : "/src/assets/bob.jpg" },
      ],
      comments: [
        { id: 1, personId: 1, text: 'Très bel endroit pour se retrouver dans les journées chaudes de lété.', rating: 3 },
        { id: 2, personId: 2, text: 'It was cool to look at and had interesting attractions. Would recommend and is worth the visit. It was very pretty and well kept, something for everyone. But, DO. NOT. GO. ON. THE. FERRIS. WHEEL. ', rating: 4 },
        { id: 3, personId: 3, text: 'Très bel endroit pour se retrouver dans les journées chaudes de lété.', rating: 1 },
        { id: 4, personId: 4, text: 'Très bel endroit pour se retrouver dans les journées chaudes de lété.', rating: 5 },
       
      ]
    };
  },
  methods: {
    getCommentsForPerson(personId) {
      return this.comments.filter(comment => comment.personId === personId);
    }
  }
};
</script>




<style src="../../styles/EventsStyles/EventComments.scss"> </style>