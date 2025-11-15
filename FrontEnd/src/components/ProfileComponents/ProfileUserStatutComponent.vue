<template>
      <div id="myModal" class="modal" style="" @click.self="pop">
         <div class="modal-content" @click.self="pop">
            <div class="event-create-form">
                <span class="close" @click="pop">&times;</span>
                <div id="profileUserStatut">
                    <ul class="sub-menu">
                        <li @click="showStatus(0)"  ref="Followers"   :class="{ active: selectedItem === 0 }">Followers</li>
                        <li  @click="showStatus(1)" ref="Followings"  :class="{ active: selectedItem === 1 }">Followings</li>
                        <li @click="showStatus(2)" ref="Favorites"   :class="{ active: selectedItem === 2 }">{{  actualLang ? 'Favorites' : 'Vos Favoris' }}</li>
                    </ul>
                    
                    <div class="listUser">
                        <ProfileUserFollowers :-is-show-followers="IsShowFollowers" :list-event="followers"/>
                        <ProfileUserFollowings @delete-following="handleFollowingUser" :-is-show-followings="IsShowFollowings" :list-event="followings"/>
                        <ProfileUserFavoriteEvents @favorite-event="handleFavoriteEvent" :-is-show-favorites="IsShowFavorites" :list-favorites-events="favoriteEvents" />
                    </div>
                </div>
            </div>
            
              
        </div>
    </div>

</template>


<script setup>
    import storageManager from "@/JS/LocalStaorageManager";
    import { ref, onMounted, onUnmounted, defineProps, defineEmits, watch } from "vue";
    import ProfileUserFollowers from "./ProfileGestionComponents/ProfileUserFollowersComponent.vue";
    import ProfileUserFollowings from "./ProfileGestionComponents/ProfileUserFollowingsComponent.vue";
    import ProfileUserFavoriteEvents from "./ProfileGestionComponents/ProfileUserFavoriteEventsComponent.vue";
    import { useFriendStore } from "@/stores/Friend";
    import { useActivityStore } from "@/stores/activity";
    
    let selectedItem = 0;
    let followers = ref([]);
    let followings = ref([]);
    let favoriteEvents = ref([]);
    const {getListUserFollowers} = useFriendStore();
    const { getListFavoritesActivities} =useActivityStore();

    let IsShowFollowers = ref(true);
    let IsShowFollowings = ref(false);
    let IsShowFavorites = ref(false);

    onMounted(async() => {
        followers.value = await getListUserFollowers('followers');
        
    });


    const handleFollowingUser = async (pData) => {
        if (pData.type === 'deleted') {
            // Remove the deleted user from the local array
            followings.value = followings.value.filter(user => user.id !== pData.userId);
        } else if (pData.type === 'refetch') {
            // Refetch the entire list if needed
            followings.value = await getListUserFollowers('followings');
        }
}

    const handleFavoriteEvent = async (eventData) => {
        if (eventData.type === 'deleted') {
            // Remove the deleted event from the local array
            favoriteEvents.value = favoriteEvents.value.filter(event => event.id !== eventData.eventId);
        
        } else {
            // Fallback: refetch the entire list
            favoriteEvents.value = (await getListFavoritesActivities()).favoris;
        }
    }

  

    
    const showStatus =  async (userInput) => {
        switch (userInput) {
            case 0:
                selectedItem = userInput;
                IsShowFollowings.value = false;
                IsShowFavorites.value = false;
                followers =await getListUserFollowers('followers');
                IsShowFollowers.value = !IsShowFollowers.value;
                break;
            case 1:
                selectedItem = userInput;
                IsShowFollowers.value = false;
                IsShowFavorites.value = false;
                followings.value = await getListUserFollowers('followings')
                IsShowFollowings.value = !IsShowFollowings.value;
                break;
             case 2:
                selectedItem = userInput;
                IsShowFollowers.value = false;
                IsShowFollowings.value = false;
               favoriteEvents.value = (await getListFavoritesActivities()).favoris
                IsShowFavorites.value = !IsShowFavorites.value;
                break;
            
            default:
                selectedItem = 0;
                IsShowFollowers.value = true;
                IsShowFollowings.value = false;
                IsShowFavorites.value = false;
        }
    }

    const props = defineProps({
        user: Object,
        isOpen : Boolean
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

     onMounted(async () => {
        listCategories.value =await activitiesStore.getCategories();
        console.log(listCategories)
     
     });



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

    // Définir les événements émis par ce composant
    const emit = defineEmits(['pop']);

    // Fonction pour émettre l'événement "pop"
    const pop = () => {
        emit('pop');
    };

</script>


<style src="../../styles/ProfilesStyles/ProfileUserStatutComponentStyle.scss"></style>