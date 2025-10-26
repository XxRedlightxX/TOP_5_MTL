<template>
      <div id="myModal" class="modal" style="" @click.self="pop">
         <div class="modal-content" @click.self="pop">
            <div class="event-create-form">
                <span class="close" @click="pop">&times;</span>
                <div id="profileUserStatut">
                    <ul class="sub-menu">
                        <li @click="showStatus(0)" ref="Followers">Followers</li>
                        <li  @click="showStatus(1)" ref="Followings">Followings</li>
                        <li @click="showStatus(2)" ref="Favorites">{{  actualLang ? 'Favorites' : 'Vos Favoris' }}</li>
                    </ul>
                    
                    <div class="listUser">
                        <ProfileUserFollowers :-is-show-followers="IsShowFollowers" :list-event="followersOrFollowings"/>
                        <ProfileUserFollowings :-is-show-followings="IsShowFollowings" :list-event="followersOrFollowings"/>
                        <ProfileUserFavoriteEvents :-is-show-favorites="IsShowFavorites" :list-favorites-events="favoriteEvents.favoris" />
                    </div>
                </div>
            </div>
            
              
        </div>
    </div>

</template>


<script setup>
    import storageManager from "@/JS/LocalStaorageManager";
    import { ref, onMounted, onUnmounted, defineProps, defineEmits } from "vue";
    import ProfileUserFollowers from "./ProfileGestionComponents/ProfileUserFollowersComponent.vue";
    import ProfileUserFollowings from "./ProfileGestionComponents/ProfileUserFollowingsComponent.vue";
    import ProfileUserFavoriteEvents from "./ProfileGestionComponents/ProfileUserFavoriteEventsComponent.vue";
    import { useFriendStore } from "@/stores/Friend";
    import { useActivityStore } from "@/stores/activity";


    let followersOrFollowings = ref([]);
    let favoriteEvents = ref([]);
    const {getListUserFollowers} = useFriendStore();
    const { getListFavoritesActivities} =useActivityStore();

    let IsShowFollowers = ref(false);
    let IsShowFollowings = ref(false);
    let IsShowFavorites = ref(false);

    onMounted(async() => {
        followersOrFollowings.value = await getListUserFollowers('followers');
    })

    
    const showStatus =  async (userInput) => {
        switch (userInput) {
            case 0:
                IsShowFollowings.value = false;
                IsShowFavorites.value = false;
                followersOrFollowings =await getListUserFollowers('followers');
                IsShowFollowers.value = !IsShowFollowers.value;
                break;
            case 1:
                IsShowFollowers.value = false;
                IsShowFavorites.value = false;
                followersOrFollowings = await getListUserFollowers('followings');
                IsShowFollowings.value = !IsShowFollowings.value;
                break;
             case 2:
                IsShowFollowers.value = false;
                IsShowFollowings.value = false;
                favoriteEvents =await getListFavoritesActivities();
                IsShowFavorites.value = !IsShowFavorites.value;
                break;
            
            default:
                followersOrFollowings =await getListUserFollowers('followers');
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