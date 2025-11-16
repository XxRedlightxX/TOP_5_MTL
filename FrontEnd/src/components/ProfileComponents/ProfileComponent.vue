<template>
    <div id="profileComponent">
        
        <!-- If current user is viewing his own profile -->
        <div class="top" v-show="himself">
            <ProfileHead :himself="himself" :user="organisator" />
            <ProfileOther :user="organisator" />
        </div>

        <!-- If viewing someone ELSE -->
        <div class="top" v-show="!himself">
            <ProfileHead :himself="false" :user="creatorUser" />
            <ProfileOther :user="creatorUser" />
        </div>

        <!-- Organizer list for himself -->
        <ProfileList
            v-if="authStore.user.type_utilisateur === 'organisateur' && himself"
            :himself="himself"
            :user="organisator"
        />

        <!-- Organizer list for other user -->
        <div v-if="!himself && creatorUser && creatorUser.activites">
            <ProfileList
                :himself="false"
                :user="creatorUser.activites"
            />
        </div>

    </div>
</template>
<script setup>
    import storageManager from "@/JS/LocalStaorageManager";
    import { ref, onMounted, onUnmounted,watch, defineProps} from "vue";
    import ProfileHead from "./ProfileHeaderComponent.vue";
    import ProfileOther from "./ProfileOtherComponent.vue"
    import ProfileList from "./ProfileListEventComponent.vue"
    import { useAuthStore } from "@/stores/auth";
    import { useActivityStore } from "@/stores/activity";
    import { storeToRefs } from "pinia";
    
    const listEvent = ref([]);
    let actualLang = ref(storageManager.getLang());
    let isLogged = ref(storageManager.getLogin());
    let actualMode = ref(storageManager.getMode());
    let theOrganisator = ref(null);

    const props = defineProps({
        himself: Boolean,
        creatorUser : Object,
    });
    
   
    const authStore = useAuthStore();
    const { user } = storeToRefs(authStore); 
    const ActivityStore = useActivityStore();
  
  
    const organisator = ref({
        avatar: "",
        username: "",
        name: "",
        fisrtName: "", 
        email: "",
        num: null,
        description: "No description yetee",
        listEvent: []
    });
 
    
 
   watch(() => authStore.user, (newUser) => {
    if (newUser) {
        const events = newUser?.activites?.map((act) => ({
            id: act.id,
            image: act.image_data,
            titre: act.titre,
            description: act.description || "Aucune description",
            lieu: act.lieu,
            rating: 3
        })) || [];

        listEvent.value = events;
        
        organisator.value = {
            avatar: newUser?.image_data
                ? `${import.meta.env.VITE_API_BASE_URL}${newUser.image_data}`
                : "/src/assets/UnknowUser.jpg",
            username: newUser?.username || "Utilisateur inconnu",
            name: newUser?.name,
            fisrtName: "Dede",
            email: newUser?.email || "email inconnu",
            num: newUser?.num_tel || 5143239697  ,
            description:  newUser?.description ||  "No description yet",
            listEvent: events
        };
    }
}, { immediate: true });

    onMounted(async () => {
        listEvent.value = await ActivityStore.getUserActivities();
    });
    

    /*if (props.himself){
        organisator.value = storageManager.getLogUser();
    }
    else {
        theOrganisator.value= storageManager.getOrganisator();
    }*/
    
    const Logout = () => {
        
        storageManager.setLogin(false);
        isLogged.value = storageManager.getLogin();
    }

    if (actualLang.value === null) {
        storageManager.setLang(true);
        actualLang.value = storageManager.getLang();
    }

    if (isLogged.value === null) {
        Logout();
    }

    if (theOrganisator.value === null) {
        console.log("yesss  ")
        theOrganisator.value = organisator;
    }
    if (actualMode.value === null) {
        storageManager.setMode(true);
        actualMode.value = storageManager.getMode();
    }
    // Function to handle mode change event
    const handleLangChange = (event) => {
        actualLang.value = JSON.parse(event.detail.storage);
    };
        // Function to handle mode change event
    const handleLoginChange = (event) => {
        isLogged.value = JSON.parse(event.detail.storage);
    };
    const handleOrganisatorChange = (event) => {
        theOrganisator.value = JSON.parse(event.detail.storage);
    };
    const handleModeChange = (event) => {
        actualMode.value = JSON.parse(event.detail.storage);
    };
    // Add event listener for mode changes
    onMounted(() => {
      
        window.addEventListener('lang-changed', handleLangChange);
        window.addEventListener('login-changed', handleLoginChange);
        window.addEventListener('organisator-changed', handleOrganisatorChange);
        window.addEventListener('mode-changed', handleModeChange);
    });
    
    // Remove event listener when component is unmounted
    onUnmounted(() => {
        window.removeEventListener('lang-changed', handleLangChange);
        window.removeEventListener('login-changed', handleLoginChange);
        window.removeEventListener('organisator-changed', handleOrganisatorChange);
        window.removeEventListener('mode-changed', handleModeChange);
    });

    console.log('mode : ', theOrganisator.value);
</script>

<style src="../../styles/ProfilesStyles/ProfileComponentStyle.scss"></style>