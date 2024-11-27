<template>
    <div id="profileListEventComponent">
      <div id="myModal" class="modal" style="display:none">

    <!-- Modal content -->
      <div class="modal-content">
        
        <div class="event-create-form">
  <h2>Create Event</h2>
  <span class="close" @click="pop">&times;</span>
  <form>
   
    <div class="form-group">
      <label for="event-name">Event Name</label>
      <input type="text" id="event-name" placeholder="Enter event name" required>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="event-date">Date</label>
        <input type="date" id="event-date" required>
      </div>

      <div class="form-group">
        <label for="event-time">Time</label>
        <input type="time" id="event-time" required>
      </div>

      <div class="form-group">
        <label for="event-duration">Duration (hours)</label>
        <input type="number" id="event-duration" placeholder="e.g., 2" min="1" required>
      </div>
    </div>

    <div class="form-group">
      <label for="event-location">Location</label>
      <input type="text" id="event-location" placeholder="Enter location" required>
    </div>

    <div class="form-group">
      <label for="event-picture">Upload Picture</label>
      <input type="file" id="event-picture" accept="image/*">
    </div>

    <div class="form-group">
      <label for="event-hosts">Co-hosts</label>
      <input type="text" id="event-hosts" placeholder="Add other hosts (comma-separated)">
      <div class="form-group_images">
        <img src="../../assets/bob.jpg"> <img src="../../assets/bob.jpg" alt=""> <img src="../../assets/bob.jpg"> <img src="../../assets/bob.jpg" alt="">
    </div>
    </div>
   
    <div class="form-actions">
      <button type="submit" class="btn-submit">Create Event</button>
      <button type="reset" class="btn-cancel">Cancel</button>
    </div>
  </form>
</div>


      </div>

    </div>
      <div class="head">
        <h4 v-if="props.himself">{{  actualLang ? 'List of event you add' : 'Les evenements que vous avez ajoute' }}</h4>
        <h4 v-else>{{  actualLang ? 'List of event the organisator publish' : 'Les evenements que l\'organisateur a publier' }}</h4>
       
        <div @click="pop" class="router"  v-show="props.himself">
          
            <v-icon icon="mdi-plus-box-multiple" class="icon" :title="actualLang ? 'Add an Event' : 'Ajouter un evenement'"/>
        </div>

      </div>
  
      <div class="body">
        <ProfileSingleEvent v-for="(item, index) in props.user.listEvent" :key="index" :event="item"  :himself="props.himself"/>
      </div>
    
    </div>
  </template>
  
  <script setup>
  import storageManager from "@/JS/LocalStaorageManager";
  import { ref, onMounted, onUnmounted, defineProps } from "vue";
  import ProfileSingleEvent from "./ProfileSingleEventComponent.vue";

  const props = defineProps({
        himself: Boolean, // Boolean type prop
        user: Object
    });

  
  let actualLang = ref(storageManager.getLang());
  let isLogged = ref(storageManager.getLogin());
  
  const Logout = () => {
    storageManager.setLogin(false);
    isLogged.value = storageManager.getLogin();
  };
  
  if (actualLang.value === null) {
    storageManager.setLang(true);
    actualLang.value = storageManager.getLang();
  }
  
  if (isLogged.value === null) {
    Logout();
  }
  
  // Function to handle mode change event
  const handleLangChange = (event) => {
    actualLang.value = JSON.parse(event.detail.storage);
  };
  
  // Function to handle mode change event
  const handleLoginChange = (event) => {
    isLogged.value = JSON.parse(event.detail.storage);
  };
  

  
  // Add event listener for mode changes
  onMounted(() => {
    window.addEventListener('lang-changed', handleLangChange);
    window.addEventListener('login-changed', handleLoginChange);
  });
  
  // Remove event listener when component is unmounted
  onUnmounted(() => {
    window.removeEventListener('lang-changed', handleLangChange);
    window.removeEventListener('login-changed', handleLoginChange);
  });


  var ouvert = true
  function pop() {
    const overlay = document.getElementById('myModal');
   
   
   
      if(ouvert) {
        overlay.style.display = 'block';
        ouvert= false;
        console.log(ouvert);
      } else if(ouvert=== false) {
        overlay.style.display = 'none';
        ouvert = true;
        console.log(ouvert);
      }
  
}
  
  </script>
  

<style src="../../styles/ProfilesStyles/profileListEventComponentStyle.scss"></style>