<template>
    <div id="profileComponent">

        <div class="top">
            
            <ProfileHead :himself="props.himself" :user="organisator"></ProfileHead>
            <ProfileOther v-show="props.himself" :user="theOrganisator"></ProfileOther>
        </div>
        <ProfileList :himself="props.himself" :user="theOrganisator"></ProfileList>
    </div>
  </template>
  
<script setup>
    import storageManager from "@/JS/LocalStaorageManager";
    import { ref,computed, onMounted, onUnmounted, defineProps} from "vue";
    import ProfileHead from "./ProfileHeaderComponent.vue";
    import ProfileOther from "./ProfileOtherComponent.vue"
    import ProfileList from "./ProfileListEventComponent.vue"
    import { useAuthStore } from "@/stores/auth";
    import { useActivityStore } from "@/stores/activity";
    const test = ref(null);

    const props = defineProps({
        himself: Boolean, // Boolean type prop
    });
    
   
    const authStore = useAuthStore();
    const ActivityStore = useActivityStore();
    onMounted(async () => {
       test.value = await ActivityStore.getUserActivities();
    });

    console.log(test.value+ "ddssdsf");
 

 
    const organisator = computed(() => {
    const user = authStore.user;
         

  const listEvent = user?.activites?.map((act) => ({
    id: act.id,
    image: "/src/assets/HomeCarousel/Mont-royal.jpg", 
    title: act.titre,
    desc: act.description || "Aucune description",
    lieu: act.lieu,
    rating: 3 
  })) || [];

  return {
    avatar: user?.image_data
      ? `${import.meta.env.VITE_API_BASE_URL}${user.image_data}`  
      : "/src/assets/p1.jpg",
    username: user?.name || "Utilisateur inconnu",
    name: "Wakanda",
    fisrtName: "Dede",
    email: user?.email || "email inconnu",
    num: 1122222222,
    desc: "No description yet",
    listEvent
  };
})
    let actualLang = ref(storageManager.getLang());
    let isLogged = ref(storageManager.getLogin());
    let actualMode = ref(storageManager.getMode());
    let theOrganisator = ref(null);

    if (props.himself){
        theOrganisator.value = storageManager.getLogUser();
    }
    else {
        theOrganisator= ref(storageManager.getOrganisator());
    }
    
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