<template>
    <div id="profileComponent" class="glass">
        <div class="top">
            <ProfileHead :himself="props.himself" :user="theOrganisator"></ProfileHead>
            <ProfileOther v-show="props.himself" :user="theOrganisator"></ProfileOther>
        </div>
        <ProfileList :himself="props.himself" :user="theOrganisator"></ProfileList>
    </div>
  </template>
  
<script setup>
    import storageManager from "@/JS/LocalStaorageManager";
    import { ref, onMounted, onUnmounted, defineProps} from "vue";
    import ProfileHead from "./ProfileHeaderComponent.vue";
    import ProfileOther from "./ProfileOtherComponent.vue"
    import ProfileList from "./ProfileListEventComponent.vue"

    const props = defineProps({
        himself: Boolean, // Boolean type prop
    });

    const text = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel nemo laborum ipsum aspernatur mollitia minima quo voluptates repudiandae eum, possimus neque, sapiente nesciunt dolor pariatur veritatis reprehenderit omnis, voluptatum eaque.";
    const organisator = {
        avatar: "/src/assets/p1.jpg",
        username: "Debrazer",
        name: "Wakanda",
        fisrtName: "Dede",
        email: "dedeTheBest@gmail.com",
        num: 1122222222,
        desc: text,
        listEvent: [
            { image: "/src/assets/HomeCarousel/Mont-royal.jpg", title: "Mont-Royal", desc: text, rating: 1 },
            { image: "/src/assets/HomeCarousel/Vieux-port.jpg", title: "Vieux-Port", desc: text, rating: 3 },
            { image: "/src/assets/HomeCarousel/LaRonde.jpg", title: "Laronde", desc: text, rating: 5 },
            { image: "/src/assets/HomeCarousel/Jardin-botanique.jpg", title: "Jardin Botanique", desc: text, rating: 4 },
            { image: "/src/assets/HomeCarousel/Vieux-port.jpg", title: "Vieux-Port", desc: text, rating: 3 }
        ]
    };

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