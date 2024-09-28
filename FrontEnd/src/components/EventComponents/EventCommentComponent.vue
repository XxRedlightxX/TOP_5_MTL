<template>
   
    <div id="EventComment">
    
      <h1>Comments</h1>

  

  <div class="comments-list">
    <div class="comments" v-for="personne in persons">
        <div class="section">
            <img :src="personne.imag">
            <div   class="comment">
                <p>{{ personne.name }} </p>
                <p>20 days ago</p>
            </div>
        </div>
      
      <div class="commen"  v-for="comment in getCommentsForPerson(personne.id)" :key="comment.id"><p> {{ comment.text }}</p>

         <v-rating
            hover
            :length="5"
            :size="20"
            :model-value="3"
            active-color="primary"
          />
        </div>

        
    </div>

    <!-- Delimiteur-->
    

   
        </div>


   

    </div>


</template>

<script >

export default {
  data() {
    return {
      persons: [
        { id: 1, name: 'Alice', imag : "/src/assets/HomeCarousel/profil.jpeg" },
        { id: 2, name: 'Bob', imag : "/src/assets/bob.jpg" }
      ],
      comments: [
        { id: 1, personId: 1, text: 'Très bel endroit pour se retrouver dans les journées chaudes de lété.' },
        { id: 2, personId: 2, text: 'It was cool to look at and had interesting attractions. Would recommend and is worth the visit. It was very pretty and well kept, something for everyone. But, DO. NOT. GO. ON. THE. FERRIS. WHEEL. ' },
       
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